export interface BusinessDetails {
  businessName: string;
  businessAddress: string;
  taxId?: string;
  phoneNumber: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "vendor" | "coach";
  businessDetails?: BusinessDetails;
  createdAt: Date;
  updatedAt: Date;
}
