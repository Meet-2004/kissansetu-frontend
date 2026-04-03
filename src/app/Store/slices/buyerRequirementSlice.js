import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {
    cropId: "",
    variety: "",
    grade: "",
    quantityRequired: "",
    unitId: "",
    minPrice: "",
    maxPrice: "",
    stateId: "",
    districtId: "",
    deliveryAddress: "",
    deadline: "",
    urgency: "",
    additionalNotes: "",
  },
};

const buyerRequirementSlice = createSlice({
  name: "requirements",
  initialState,
  reducers: {
    setBuyerRequirements: (state, action) => {
      Object.assign(state.form, action.payload);
    },

    resetForm: (state) => {
      state.form = initialState.form;
    },
  },
});
export const { setBuyerRequirements, resetForm } = buyerRequirementSlice.actions;
export default buyerRequirementSlice.reducer;