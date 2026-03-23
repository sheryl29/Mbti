// Vercel serverless function for processing orders
import { google } from "googleapis";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialize Google APIs
// Fix private key format - Vercel might escape the newlines
let privateKey = process.env.GOOGLE_PRIVATE_KEY || "";

// Remove quotes if they exist
if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
  privateKey = privateKey.slice(1, -1);
}

// Replace escaped newlines with actual newlines
privateKey = privateKey.replace(/\\n/g, "\n");

console.log("Private key setup:", {
  hasKey: !!privateKey,
  keyLength: privateKey.length,
  startsWithBegin: privateKey.startsWith("-----BEGIN"),
  endsWithEnd: privateKey.trim().endsWith("-----END PRIVATE KEY-----"),
});

const GOOGLE_CREDENTIALS = {
  type: "service_account",
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: privateKey,
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(
    process.env.GOOGLE_CLIENT_EMAIL || ""
  )}`,
};

const auth = new google.auth.GoogleAuth({
  credentials: GOOGLE_CREDENTIALS,
  scopes: [
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

const sheets = google.sheets({ version: "v4", auth });

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle OPTIONS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Received process-order request");
    const { 
      name, 
      phone, 
      address, 
      personalityType, 
      itemType,
      color,
      size,
      template, 
      position, 
      price,
      orderSummary,
      paymentImage,
      selectedPatches,
      selectedHat, // Hat data for bundle orders
      selectedItems,
    } = req.body;

    // Validate required fields
    if (!name || !phone || !address || !personalityType) {
      console.error("Missing required fields:", {
        name: !!name,
        phone: !!phone,
        address: !!address,
        personalityType: !!personalityType
      });
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!paymentImage) {
      console.error("No payment image provided");
      return res.status(400).json({ error: "No payment image provided" });
    }

    // Step 1: Upload image to Cloudinary
    console.log("Uploading image to Cloudinary...");
    console.log("Cloudinary config:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY ? "***" : "missing",
      api_secret: process.env.CLOUDINARY_API_SECRET ? "***" : "missing",
    });
    console.log("Payment image preview:", paymentImage.substring(0, 100) + "...");
    console.log("Payment image length:", paymentImage.length);

    // Validate base64 format
    if (!paymentImage.startsWith('data:image/')) {
      console.error("Invalid image format - not a data URL");
      return res.status(400).json({
        error: "Invalid image format",
        details: "Image must be a base64 data URL starting with 'data:image/'"
      });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(paymentImage, {
      folder: "mbti-payments",
      public_id: `payment_${Date.now()}`,
      resource_type: "auto",
    });

    console.log("Image uploaded successfully to Cloudinary:", cloudinaryResponse.public_id);

    // Step 2: Save data to Google Sheets
    console.log("Saving to Google Sheets...");
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID || "1Zvq4LzomnEwRCS_qOyMPGhzeKglHTXAWwmdJoFdNzqg";
    console.log("Spreadsheet ID:", spreadsheetId);

    const normalizedItemType = (itemType || "").toLowerCase();
    const normalizedSummary = (orderSummary || "").toLowerCase();

    const hasShirt =
      normalizedItemType.includes("shirt") || normalizedSummary.includes("shirt");
    const hasCap =
      normalizedItemType.includes("cap") || normalizedSummary.includes("cap");
    const hasPassport = normalizedSummary.includes("passport");
    const hasLanyard = normalizedSummary.includes("lanyard");

    const shirtTypeColor = hasShirt
      ? `${itemType || "shirt"}${color ? ` / ${color}` : ""}`
      : "";
    const capColor = hasCap
      ? selectedHat?.color || (normalizedItemType.includes("cap") ? color || "" : "")
      : "";
    const lanyardItem = Array.isArray(selectedItems)
      ? selectedItems.find((item) => item?.type === "lanyard")
      : undefined;
    const summaryLanyardMatch = (orderSummary || "").match(
      /CARD HOLDER\s*&\s*LANYARD\s+([A-Za-z]+)/i
    );
    const lanyardColor =
      lanyardItem?.color ||
      (selectedHat?.type === "lanyard" ? selectedHat.color || "" : "") ||
      summaryLanyardMatch?.[1]?.toLowerCase() ||
      "";

    const patchesString =
      selectedPatches && Array.isArray(selectedPatches) && selectedPatches.length > 0
        ? selectedPatches.map((patch) => `${patch.patchId}:${patch.quantity}`).join(", ")
        : "";

    // Prepare complete order data for Google Sheets
    // Columns (A:S): time, name, phone num, adress/Pickup, personality type,
    // shirt, shirt type/color, size, template, position, cap, cap color,
    // passport, landyard, landyard color, patches, order summary, price, payment url
    const values = [
      [
        new Date().toISOString(),
        name || "",
        phone || "",
        address || "",
        personalityType || "",
        hasShirt ? "YES" : "",
        shirtTypeColor,
        hasShirt ? size || "" : "",
        template || "",
        position || "",
        hasCap ? "YES" : "",
        capColor,
        hasPassport ? "YES" : "",
        hasLanyard ? "YES" : "",
        lanyardColor,
        patchesString,
        orderSummary || "",
        price || 0,
        cloudinaryResponse.secure_url || "",
      ],
    ];

    const sheetsResponse = await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      // Use explicit row anchors for maximum A1 notation compatibility.
      range: "'User Data'!A1:S1",
      valueInputOption: "RAW",
      requestBody: {
        values: values,
      },
    });

    console.log("Data saved successfully to Google Sheets");

    return res.status(200).json({
      success: true,
      fileId: cloudinaryResponse.public_id,
      webViewLink: cloudinaryResponse.secure_url,
      rowNumber: sheetsResponse.data.updates?.updatedRows || 1,
    });
  } catch (error) {
    console.error("Error processing order:");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    return res.status(500).json({
      error: "Failed to process order",
      details: error.message
    });
  }
}
