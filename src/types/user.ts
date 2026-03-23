// User-related type definitions
export interface UserData {
  name: string;
  phone: string;
  address: string;
  mbti?: string;
  testResults?: TestResults;
  personalityType?: string;
  shirtDesign?: ShirtDesign;
  paymentInfo?: PaymentInfo;
  appointmentDate?: string;
  selectedOtherPatches?: string[];
  // Supports selecting multiple products (shirt/cap/passport case/lanyard).
  selectedItems?: SelectedItem[];
  selectedItem?: SelectedItem; // For shirt (or cap if only cap selected)
  selectedHat?: SelectedItem; // For cap (only used in bundle mode)
  isBundle?: boolean; // True if user selected both shirt and cap
  deliveryType?: "pickup" | "delivery";
  selectedPatches?: Array<{ patchId: string; quantity: number }>;
}

export interface SelectedItem {
  type: "shirt" | "cap" | "passport_case" | "lanyard";
  index?: number;
  color?: string;
  size?: string;
  price?: number; // Price in thousands (e.g., 150 = 150k)
  hatType?: "hat" | "bucket_hat"; // For caps: "hat" = baseball cap, "bucket_hat" = bucket hat
}

export interface TestResults {
  green: number;
  purple: number;
  yellow: number;
  blue: number;
}

export interface ShirtDesign {
  template: string;
  position?: string;
}

export interface PaymentInfo {
  method: string;
  amount: number;
  image?: File;
  imageUrl?: string;
}
