// API service for handling Google Drive and Sheets operations
import type { CompleteOrderData, OrderResult } from "../types";
import { logError } from "../utils/errorHandler";
import { config } from "../config/env";

export class ApiService {
  static async processOrder(
    orderData: CompleteOrderData
  ): Promise<OrderResult> {
    try {
      const sheetsId = config.get("googleSheetsId");
      let apiBaseUrl = config.get("apiBaseUrl");

      // Runtime check: if API URL is localhost but we're not on localhost, use current origin
      if (apiBaseUrl.includes("localhost") && !window.location.hostname.includes("localhost")) {
        apiBaseUrl = `${window.location.origin}/api`;
        console.log("Production detected, using API URL:", apiBaseUrl);
      }

      console.log("Processing order with data:", {
        ...orderData,
        paymentImage: orderData.paymentImage.name,
        apiBaseUrl: apiBaseUrl,
      });

      const hasGoogleConfig = sheetsId;

      if (!hasGoogleConfig) {
        logError(
          "Google APIs not configured, using fallback mode",
          "ApiService.processOrder"
        );
        return this.processOrderFallback(orderData);
      }

      // Convert image to base64
      console.log("Converting image to base64...", {
        fileName: orderData.paymentImage.name,
        fileType: orderData.paymentImage.type,
        fileSize: orderData.paymentImage.size
      });

      const imageBase64 = await this.fileToBase64(orderData.paymentImage);

      console.log("Image converted to base64, length:", imageBase64.length);
      console.log("Base64 preview:", imageBase64.substring(0, 50) + "...");

      // Use backend server to process the complete order
      const payload = {
        name: orderData.name,
        phone: orderData.phone,
        address: orderData.address,
        personalityType: orderData.personalityType,
        itemType: orderData.itemType,
        color: orderData.color,
        size: orderData.size || "",
        template: orderData.template,
        position: orderData.position || "",
        price: orderData.price,
        orderSummary: orderData.orderSummary,
        paymentImage: imageBase64,
        selectedPatches: orderData.selectedPatches || [],
        selectedItems: orderData.selectedItems || [],
        selectedHat: orderData.selectedHat, // Include hat data
      };

      console.log("Sending payload to API:", {
        ...payload,
        paymentImage: payload.paymentImage.substring(0, 50) + "..."
      });

      const response = await fetch(`${apiBaseUrl}/process-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = "Failed to process order";
        const contentType = response.headers.get("content-type");
        
        try {
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorData.message || errorMessage;
            if (errorData.details) {
              errorMessage += `: ${errorData.details}`;
            }
          } else {
            // If response is not JSON, try to get text
            const errorText = await response.text();
            if (errorText) {
              // Try to parse as JSON if it looks like JSON
              try {
                const parsed = JSON.parse(errorText);
                errorMessage = parsed.error || parsed.message || errorText;
              } catch {
                errorMessage = errorText;
              }
            } else {
              errorMessage = `Server error: ${response.status} ${response.statusText}`;
            }
          }
        } catch (e) {
          // If all parsing fails, use status-based message
          errorMessage = `Server error: ${response.status} ${response.statusText || "Unknown error"}`;
          if (response.status === 400) {
            errorMessage = "Bad request: Please check all required fields are filled correctly.";
          } else if (response.status === 500) {
            errorMessage = "Server error: Please try again later.";
          } else if (response.status === 404) {
            errorMessage = "API endpoint not found. Please contact support.";
          }
        }
        
        logError(
          `Backend server error (${response.status}): ${errorMessage}`,
          "ApiService.processOrder"
        );
        
        return {
          success: false,
          error: errorMessage,
        };
      }

      const result = await response.json();

      return {
        success: true,
        paymentImageUrl: result.webViewLink,
        rowNumber: result.rowNumber,
      };
    } catch (error) {
      logError(error, "ApiService.processOrder");
      
      // Check if it's a network error
      if (error instanceof TypeError && error.message.includes("fetch")) {
        return {
          success: false,
          error: "Network error: Unable to connect to server. Please check your internet connection and try again.",
        };
      }
      
      // Check if it's a timeout or other fetch error
      if (error instanceof Error) {
        return {
          success: false,
          error: `Request failed: ${error.message}`,
        };
      }
      
      return {
        success: false,
        error: "An unexpected error occurred while processing your order. Please try again.",
      };
    }
  }

  // Helper method to convert File to base64
  private static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  // Fallback method that works without Google APIs
  private static async processOrderFallback(
    orderData: CompleteOrderData
  ): Promise<OrderResult> {
    try {
      // Create a local data URL for the image
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = () => {
          const imageDataUrl = reader.result as string;

          // Log the order data to console (for development)
          console.log("Order Data (Fallback Mode):", {
            name: orderData.name,
            phone: orderData.phone,
            address: orderData.address,
            personalityType: orderData.personalityType,
            template: orderData.template,
            position: orderData.position,
            timestamp: new Date().toISOString(),
            imageDataUrl: imageDataUrl.substring(0, 100) + "...", // Truncate for logging
          });

          resolve({
            success: true,
            paymentImageUrl: imageDataUrl,
            rowNumber: Date.now(), // Use timestamp as row number
          });
        };
        reader.readAsDataURL(orderData.paymentImage);
      });
    } catch (error) {
      console.error("Fallback processing error:", error);
      return {
        success: false,
        error: "Failed to process order in fallback mode",
      };
    }
  }
}
