import { z } from "zod";

// STEP 1: Product Details - only product fields
export const step1Schema = z.object({
//   cropId: z.string().min(1, "Crop name is required"),
  variety: z.string().trim().min(1, "Variety is required"),
  grade: z.string().min(1, "Grade is required"),
  harvestDate: z.string().min(1, "Harvest date is required"),
});

// STEP 2: Quantity & Pricing - only pricing fields
export const step2Schema = z.object({
  quantity: z.coerce.number().min(1, "Quantity is required"),
  unitId: z.string().min(1, "Unit is required"),
  pricePerKg: z.coerce.number().min(0, "Price per unit is required"),
  totalBasePrice: z.coerce.number().min(0, "Total base price is required"),
  saleType: z.string().min(1, "Sale type is required"),
  purchaseType: z.string().min(1, "Purchase type is required"),
});

// STEP 3: Purchase Type (Fixed sale only)
export const step3Schema = z.object({
  minimumOrderQuantity: z.coerce.number().min(0, "Minimum order quantity is required"),
  moqPricePerKg: z.coerce.number().min(0, "Minimum order price per unit is required"),
  minimumBidIncrement: z.coerce.number().min(0, "Minimum bid increment is required"),
  auctionEndTime: z.string().min(1, "Auction end time is required"),
});

// STEP 4: Quality & Location
export const step4Schema = z.object({
  stateId: z.string().min(1, "State is required"),
  districtId: z.string().min(1, "District is required"),
  packagingId: z.string().min(1, "Packaging type is required"),
  storageId: z.string().min(1, "Storage type is required"),
  pickupMethod: z.string().min(1, "Pickup method is required"),
});
