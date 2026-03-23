import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";
import { ApiService } from "../services/apiService";
import type { CompleteOrderData, SelectedItem } from "../types";

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useFlow();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pricing constants
  const PRICES = {
    tshirt: 129,
    ringtee: 139,
    bucketHat: 80,
    cap: 87,
    passportCase: 99,
    lanyard: 75,
    patch: 12,
  };

  // Determine shirt type based on color
  // Premium colors (nolly, wolly, tilly, velly) = Ringer Tee
  // Regular colors (navy, black, white, grey) = T-shirt
  const getShirtType = (color: string): "tshirt" | "ringtee" => {
    const premiumColors = ["nolly", "wolly", "tilly", "velly"];
    return premiumColors.includes(color) ? "ringtee" : "tshirt";
  };

  const getActiveSelectedItems = (): SelectedItem[] => {
    if (userData.selectedItems && userData.selectedItems.length > 0) {
      return userData.selectedItems;
    }

    // Legacy support: old flow stored only one item + optional selectedHat.
    return [userData.selectedItem, userData.selectedHat].filter(
      Boolean
    ) as SelectedItem[];
  };

  const getItemBasePrice = (item: SelectedItem): number => {
    if (item.type === "shirt") {
      return getShirtType(item.color || "") === "ringtee"
        ? PRICES.ringtee
        : PRICES.tshirt;
    }
    if (item.type === "cap") {
      return item.hatType === "bucket_hat" ? PRICES.bucketHat : PRICES.cap;
    }
    if (item.type === "passport_case") return item.price ?? PRICES.passportCase;
    if (item.type === "lanyard") return item.price ?? PRICES.lanyard;
    return 0;
  };

  // Calculate item details and prices (base prices, before any deals)
  const getOrderDetails = () => {
    const details: Array<{ name: string; price: number }> = [];
    const selectedItems = getActiveSelectedItems();

    for (const item of selectedItems) {
      if (item.type === "shirt") {
        const shirtType = getShirtType(item.color || "");
        const shirtName = shirtType === "ringtee" ? "RINGER TEE" : "T-SHIRT";
        details.push({ name: shirtName, price: getItemBasePrice(item) });
      } else if (item.type === "cap") {
        const hatName = item.hatType === "bucket_hat" ? "BUCKET HAT" : "CAP";
        details.push({ name: hatName, price: getItemBasePrice(item) });
      } else if (item.type === "passport_case") {
        details.push({ name: "PASSPORT CASE", price: getItemBasePrice(item) });
      } else if (item.type === "lanyard") {
        details.push({ name: "CARD HOLDER & LANYARD", price: getItemBasePrice(item) });
      }
    }

    const totalPatches = getTotalPatchCount();
    if (totalPatches > 0) {
      details.push({
        name: `ADD ON PATCH (${totalPatches})`,
        price: totalPatches * PRICES.patch,
      });
    }

    return details;
  };

  const getTotalPatchCount = () => {
    return (userData.selectedPatches || []).reduce(
      (sum, patch) => sum + patch.quantity,
      0
    );
  };

  const getPatchDealDiscount = () => {
    const count = getTotalPatchCount();
    if (count === 2) return 2; // 24 -> 22
    if (count === 3) return 6; // 36 -> 30
    return 0;
  };

  const getBundleDealDiscount = () => {
    const selectedItems = getActiveSelectedItems();
    const byType: Partial<Record<SelectedItem["type"], SelectedItem>> = {};
    for (const item of selectedItems) byType[item.type] = item;

    const shirt = byType.shirt;
    const cap = byType.cap;
    const passport = byType.passport_case;
    const lanyard = byType.lanyard;

    const candidates: Array<{ name: string; discount: number }> = [];

    if (cap && lanyard) {
      const base = getItemBasePrice(cap) + getItemBasePrice(lanyard);
      candidates.push({
        name: "STARTER PACK",
        discount: Math.max(0, base - 138),
      });
    }

    if (passport && lanyard) {
      const base = getItemBasePrice(passport) + getItemBasePrice(lanyard);
      candidates.push({
        name: "TRAVEL BUDDY PACK",
        discount: Math.max(0, base - 148),
      });
    }

    if (shirt && cap) {
      const shirtType = getShirtType(shirt.color || "");
      const base = getItemBasePrice(shirt) + getItemBasePrice(cap);
      candidates.push({
        name: "DAILY FIT PACK",
        discount: Math.max(0, base - (shirtType === "ringtee" ? 193 : 184)),
      });
    }

    if (shirt && passport) {
      const shirtType = getShirtType(shirt.color || "");
      const base = getItemBasePrice(shirt) + getItemBasePrice(passport);
      candidates.push({
        name: "TAKEOFF PACK",
        discount: Math.max(0, base - (shirtType === "ringtee" ? 203 : 194)),
      });
    }

    if (shirt && lanyard) {
      const shirtType = getShirtType(shirt.color || "");
      const base = getItemBasePrice(shirt) + getItemBasePrice(lanyard);
      candidates.push({
        name: "MAIN CHARACTER PACK",
        discount: Math.max(0, base - (shirtType === "ringtee" ? 256 : 248)),
      });
    }

    if (candidates.length === 0) return null;
    return candidates.reduce((best, curr) =>
      curr.discount > best.discount ? curr : best
    );
  };

  // Calculate total price
  const calculateTotal = () => {
    const details = getOrderDetails();
    const subtotal = details.reduce((sum, item) => sum + item.price, 0);
    const bundleDiscount = getBundleDealDiscount()?.discount ?? 0;
    const patchDealDiscount = getPatchDealDiscount();
    return subtotal - bundleDiscount - patchDealDiscount;
  };

  // Format order summary (for API)
  const getOrderSummary = () => {
    const selectedItems = getActiveSelectedItems();
    const summaries: string[] = [];

    const colorLabels: { [key: string]: string } = {
      nolly: "Nolly",
      wolly: "Wolly",
      tilly: "Tilly",
      velly: "Velly",
      navy: "Navy",
      black: "Black",
      white: "White",
      grey: "Grey",
      beige: "Beige",
    };

    const templateLabels: { [key: string]: string } = {
      middle: "Middle",
      chest: "Chest",
      sleeve: "Sleeve",
    };

    const positionLabels: { [key: string]: string } = {
      left: "Left",
      right: "Right",
      middle: "Middle",
    };

    // Preserve a stable ordering in the summary.
    const typeOrder: Array<SelectedItem["type"]> = [
      "shirt",
      "cap",
      "passport_case",
      "lanyard",
    ];

    for (const type of typeOrder) {
      const item = selectedItems.find((i) => i.type === type);
      if (!item) continue;

      if (item.type === "shirt") {
        const color = colorLabels[item.color || ""] || item.color || "";
        const size = item.size?.toUpperCase() || "";
        const template =
          templateLabels[userData.shirtDesign?.template || ""] || "";
        const position =
          positionLabels[userData.shirtDesign?.position || ""] || "";

        const shirtType = getShirtType(item.color || "");
        const shirtName = shirtType === "ringtee" ? "Ringer Tee" : "T-shirt";
        let summary = `${shirtName} ${color}`;
        if (size) summary += ` ${size}`;

        if (template && position) {
          if (template === position && template === "Middle") {
            summary += ` ${template}`;
          } else {
            summary += ` ${template} ${position}`;
          }
        } else if (template) {
          summary += ` ${template}`;
        }

        summaries.push(summary);
      } else if (item.type === "cap") {
        const color = colorLabels[item.color || ""] || item.color || "";
        const hatName = item.hatType === "bucket_hat" ? "Bucket Hat" : "Cap";
        summaries.push(`${hatName} ${color}`);
      } else if (item.type === "passport_case") {
        const color = item.color ? item.color.toUpperCase() : "";
        summaries.push(`PASSPORT CASE${color ? ` ${color}` : ""}`);
      } else if (item.type === "lanyard") {
        const color = item.color ? item.color.toUpperCase() : "";
        summaries.push(
          `CARD HOLDER & LANYARD${color ? ` ${color}` : ""}`
        );
      }
    }

    return summaries.join(" + ");
  };

  const handleNext = async () => {
    // Validate required fields
    if (!uploadedImage) {
      alert("Please upload a payment image");
      return;
    }

    if (!userData.personalityType) {
      alert("Personality type is missing. Please complete the quiz first.");
      return;
    }

    if (!userData.name) {
      alert("Name is missing. Please enter your name.");
      return;
    }

    if (!userData.phone) {
      alert("Phone number is missing. Please enter your phone number.");
      return;
    }

    // Ensure address is set (for pickup orders, it should be "PICK UP")
    const address = userData.address || (userData.deliveryType === "pickup" ? "PICK UP" : "");
    if (!address) {
      alert("Address is missing. Please enter your address or select pickup.");
      return;
    }

    setIsProcessing(true);

      try {
        setProcessingStatus("Preparing order data...");

        // Prepare order data
        const selectedItems =
          userData.selectedItems && userData.selectedItems.length > 0
            ? userData.selectedItems
            : ([userData.selectedItem, userData.selectedHat].filter(
                Boolean
              ) as SelectedItem[]);

        const hasShirt = selectedItems.some((i) => i.type === "shirt");
        const shirtItem = selectedItems.find((i) => i.type === "shirt");
        const primaryItem = hasShirt ? shirtItem : selectedItems[0];

        const template = hasShirt
          ? userData.shirtDesign?.template || "middle"
          : primaryItem?.type || "cap";
        const position = hasShirt ? userData.shirtDesign?.position : undefined;

        // Get order summary
        const orderSummary = getOrderSummary();
        const itemPrice = calculateTotal();

        // Determine primary item type and color (shirt takes precedence).
        const itemType = hasShirt
          ? "shirt"
          : primaryItem?.type === "cap"
          ? "cap"
          : primaryItem?.type || "shirt";
        const color = primaryItem?.color || "";

        const capItem = selectedItems.find((i) => i.type === "cap");

        const orderData: CompleteOrderData = {
          name: userData.name,
          phone: userData.phone,
          address: address,
          personalityType: userData.personalityType || "",
          itemType: itemType,
          color: color,
          size: hasShirt ? shirtItem?.size || undefined : undefined,
          template: template,
          position: position,
          price: itemPrice,
          orderSummary: orderSummary,
          paymentImage: uploadedImage,
          selectedPatches: userData.selectedPatches || [],
          selectedItems,
          selectedHat: capItem
            ? {
                type: "cap",
                hatType: capItem.hatType,
                color: capItem.color,
                price: capItem.price,
              }
            : undefined,
        };

        setProcessingStatus("Processing order...");

        // Process order (upload to Google Drive and save to Google Sheets)
        const result = await ApiService.processOrder(orderData);

        if (result.success) {
          setProcessingStatus("Order processed successfully!");

          // Update user data with the results
          const finalPrice = calculateTotal();
          updateUserData({
            paymentInfo: {
              method: "image_upload",
              amount: finalPrice,
              image: uploadedImage,
              imageUrl: result.paymentImageUrl,
            },
          });

          // Navigate to 48.jpg page after a short delay
          setTimeout(() => {
            navigate("/48.jpg");
          }, 1000);
        } else {
          setProcessingStatus(`Error: ${result.error}`);
          alert(`Error processing order: ${result.error}`);
        }
      } catch (error) {
        console.error("Error processing order:", error);
        
        let errorMessage = "An error occurred while processing your order. Please try again.";
        
        if (error instanceof Error) {
          errorMessage = error.message || errorMessage;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
        
        setProcessingStatus(`Error: ${errorMessage}`);
        alert(`Error: ${errorMessage}\n\nPlease check your connection and try again.`);
      } finally {
        setIsProcessing(false);
      }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="payment-template">
      {/* Header */}
      <div className="payment-header">
        <div className="payment-title">PAYMENT HERE</div>
        <div className="payment-account">BCA 7772760003 Olivia Christy Gunawan</div>
        <div className="payment-note">NOTE TRANSFER: NAME_QUABUDZ</div>
      </div>

      {/* Details Section */}
      {(userData.selectedItems && userData.selectedItems.length > 0) ||
      userData.selectedItem ? (
        <div className="payment-details-section">
          <div className="payment-details-title">DETAILS</div>
          <div className="payment-details-list">
            {getOrderDetails().map((detail, index) => (
              <div key={index} className="payment-details-item">
                <span className="payment-details-name">{detail.name}</span>
                <span className="payment-details-price">{detail.price}K</span>
              </div>
            ))}

            {(() => {
              const bundleDeal = getBundleDealDiscount();
              return bundleDeal && bundleDeal.discount > 0 ? (
                <div className="payment-details-item payment-details-discount">
                  <span className="payment-details-name">{bundleDeal.name}</span>
                  <span className="payment-details-price">-{bundleDeal.discount}K</span>
                </div>
              ) : null;
            })()}

            {getPatchDealDiscount() > 0 && (
              <div className="payment-details-item payment-details-discount">
                <span className="payment-details-name">PATCH DEAL</span>
                <span className="payment-details-price">-{getPatchDealDiscount()}K</span>
              </div>
            )}
          </div>
          <div className="payment-details-divider"></div>
          <div className="payment-details-total">
            <span className="payment-details-total-label">TOTAL</span>
            <span className="payment-details-total-price">{calculateTotal()}K</span>
          </div>
        </div>
      ) : null}

      {/* Upload Section */}
      <div className="upload-section">
        <div className="upload-box" onClick={handleUploadClick}>
          {imagePreview ? (
            <div className="image-preview">
              <img src={imagePreview} alt="Uploaded payment" />
              <div className="upload-overlay">
                <div className="upload-text">UPLOAD IMAGE</div>
                <div className="upload-line"></div>
              </div>
            </div>
          ) : (
            <div className="upload-placeholder">
              <div className="upload-text">UPLOAD IMAGE</div>
              <div className="upload-line"></div>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
      </div>

      {/* Processing Status */}
      {processingStatus && (
        <div className={`processing-status ${processingStatus.toLowerCase().includes("error") ? "error" : ""}`}>
          {processingStatus}
        </div>
      )}

      {/* NEXT Button */}
      <button
        className="payment-next-button"
        onClick={handleNext}
        disabled={!uploadedImage || isProcessing}
      >
        {isProcessing ? "PROCESSING..." : "NEXT"}
      </button>
    </div>
  );
};

export default Payment;
