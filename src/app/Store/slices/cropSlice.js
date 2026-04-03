// import ProductDetail from "@/app/Dashboard/addCrop/ProductDetail";
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
  
//     data: {
//       product: {
//         cropName: "",
//         variety: "",
//         grade: "",
//         harvestDate: "",
//       },
//       pricing: {
//         quantity: null,
//         unit: "",
//         pricePerKg: null,
//         totalBasePrice: null,
//         purchaseType: "",
//         minimumOrderQuantity: null,
//         moqPricePerKg: null,
//         minimumBidIncrement: null,
//         auctionEndTime: "",
//         saleType: "",
//       },
//       location: {
//         state: "",
//         district: "",
//         packagingType: "",
//         storageType: "",
//         pickupMethod: "",
//       },
//       description: "",
//     },
//     imageFiles: [],
//     certificateFile: [],
//   };


// const cropSlice = createSlice({
//   name: "crop",
//   initialState,
//   reducers: {
//     setCropData: (state, action) => {
//       const payload = action.payload || {};
//       const { imageFiles, certificateFile, ...dataPayload } = payload;

//       state.data.product = {
//         ...state.data.product,
//         ...dataPayload,
//       };
//         state.data.pricing = {
//         ...state.data.pricing,
//         ...dataPayload,
//       };
//         state.data.location = {
//         ...state.data.location,
//         ...dataPayload,
//       };
//         state.data.description = {...state.data.description,...dataPayload};



//       if (imageFiles !== undefined) {
//         state.imageFiles = imageFiles;
//       }

//       if (certificateFile !== undefined) {
//         state.certificateFile = certificateFile;
//       }
//     },
//     resetCrop: (state) => {
//       state.cropData = { ...initialState.cropData };
//     },
//     // addCrop: (state, action) => {
//     //   state.items.push(action.payload);
//     // },
//   },
// });

// export const { setCropData, resetCrop } = cropSlice.actions;
// export default cropSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
    data: {
      product: {
        cropId:"",
        variety: "",
        grade:"",
        harvestDate: "",
      },
      pricing: {
        quantity: null,
        unitId: "",
        pricePerKg: null,
        totalBasePrice: null,
        purchaseType: "",
        minimumOrderQuantity: null,
        moqPricePerKg: null,
        minimumBidIncrement: null,
        auctionEndTime: "",
        saleType: "",
      },
      location: {
        stateId: "",
        districtId: "",
        packagingId: "",
        storageId: "",
        pickupMethod: "",
      },
      description: "",
    },
    imageFiles: [],
    certificateFile: [],
  }


const cropSlice = createSlice({
  name: "crop",
  initialState,
  reducers: {
    setCropData: (state, action) => {
      const payload = action.payload || {};
      const { imageFiles, certificateFile, ...dataPayload } = payload;

      const productKeys = ["cropId", "variety", "grade", "harvestDate"];
      const pricingKeys = [
        "quantity",
        "unitId",
        "pricePerKg",
        "totalBasePrice",
        "purchaseType",
        "minimumOrderQuantity",
        "moqPricePerKg",
        "minimumBidIncrement",
        "auctionEndTime",
        "saleType",
      ];
      const locationKeys = [
        "stateId",
        "districtId",
        "packagingId",
        "storageId",
        "pickupMethod",
      ];

      Object.entries(dataPayload).forEach(([key, value]) => {
        if (productKeys.includes(key)) {
          state.data.product[key] = value;
          return;
        }

        if (pricingKeys.includes(key)) {
          state.data.pricing[key] = value;
          return;
        }

        if (locationKeys.includes(key)) {
          state.data.location[key] = value;
          return;
        }

        if (key === "description") {
          state.data.description = value;
        }
      });



      if (imageFiles !== undefined) {
        state.imageFiles = imageFiles;
      }

      if (certificateFile !== undefined) {
        state.certificateFile = certificateFile;
      }
    },
    resetCrop: (state) => {
      state.data = { ...initialState.data };
      state.imageFiles = [];
      state.certificateFile = [];
    },
    // addCrop: (state, action) => {
    //   state.items.push(action.payload);
    // },
  },
});

export const { setCropData, resetCrop } = cropSlice.actions;
export default cropSlice.reducer;
