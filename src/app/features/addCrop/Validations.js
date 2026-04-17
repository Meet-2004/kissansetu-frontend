import { z } from "zod";
// STEP 1: Product Details - only product fields

export const step1Schema = z.object({
  cropId: z.int("Crop name is required").min(1, "Crop name is required"),
  variety: z.string().trim().min(1, "Variety is required"),
  grade: z.string().min(1, "Grade is required"),
  harvestDate: z.string().min(1, "Harvest date is required"),
});

// STEP 2: Quantity & Pricing - only pricing fields
export const step2Schema = z.object({
  quantity: z.coerce.number().min(1, "Quantity is required"),
  unitId: z.int("Unit is Required").min(1, "Unit is required"),
  pricePerKg: z.string( "Price per unit is required").min(1, "Price per unit is required"),
  // totalBasePrice: z.string().min(0, "Total base price is requ`ired"),
  // saleType: z.string().min(1, "Sale type is required"),
   minimumBidIncrement: z.string("Minimum bid increment is required").min(1, "Minimum bid increment is required"),
  purchaseType: z.string("Purchase type is required").min(1, "Purchase type is required"),
  auctionEndTime:z.string("Auction end time is required").min(1,"Auction end time is required"),
});

// STEP 3: Purchase Type (Fixed sale on
// ly)
export const step3Schema = z.object({
  minimumOrderQuantity: z.string("Minimum order quantity is required").min(1, "Minimum order quantity is required"),
  moqPricePerKg:  z.string("Minimum order price per unit is required").min(1, "Minimum order price per unit is required"),



});

// STEP 4: Quality & Location
export const step4Schema = z.object({
  stateId: z.int("State is required").min(1, "State is required"),
  districtId: z.int( "District is required").min(1, "District is required"),
  packagingId: z.int("Packaging type is required").min(1, "Packaging type is required"),
  storageId: z.int("Storage type is required").min(1, "Storage type is required"),
  pickupMethod: z.string("Pickup method is required").min(1, "Pickup method is required"),
});
