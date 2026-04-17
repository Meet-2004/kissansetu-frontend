import {z} from "zod";

export const cropDetailSchema=z.object({
     cropId: z.int("Crop name is required").min(1, "Crop name is required"),
      variety: z.string().trim().min(1, "Variety is required"),
      grade: z.string().min(1, "Grade is required"),
})

export const quantityBudgetSchema=z.object({
   quantityRequired: z.coerce.number().min(1, "Quantity is required"),
  unitId: z.int("Unit is Required").min(1, "Unit is required"),
  minPrice: z.string( "Minimum is required").min(1,  "Minimum is required"),
  maxPrice: z.string( "Maximum is required").min(1, "Maximum is required"),
})

export const locationDeadlineSchema=z.object({
  stateId: z.int("State is required").min(1, "State is required"),
  districtId: z.int( "District is required").min(1, "District is required"),
    deliveryAddress: z.string().min(1, "Delivery address is required"),
    deadline: z.string().min(1, "Deadline is required"),
})

// export const additionalInfoSchema=z.object({
//   additionalNotes: z.string().min(1, "Additional notes is required"),
// })