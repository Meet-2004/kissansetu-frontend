import { createSlice } from "@reduxjs/toolkit";

// let userId=localStorage.getItem("persist:auth") ? JSON.parse(localStorage.getItem("persist:auth")).id : null;


const intialState = {
    data:{
     informations:{
    userId: null,
    fullName: "",
    profilePhotoUrl:"",
    mobileNumber: "",
    email: "",
    dateOfBirth: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
    farmSize: "",
    primaryCrops: "",
    farmLocation: "",
    yearsOfExperience: "",
        },
        
    images:[]
    },
}

const profileReducer=createSlice({
    name:"profile",
    initialState:intialState,
    reducers:{
        setProfileData:(state,action)=>{
            const payload = action.payload || {};
            
            // Map field names from form to state structure
            const fieldMap = {
                name: 'fullName',
                phone: 'mobileNumber',
                email: 'email',
                bank: 'bankName',
                account: 'accountNumber',
                ifsc: 'ifscCode',
                upi: 'upiId',
                farmSize: 'farmSize',
                crops: 'primaryCrops',
                location: 'farmLocation',
                experience: 'yearsOfExperience',
                profilePhotoUrl: 'profilePhotoUrl',
                dateOfBirth: 'dateOfBirth',
            };
            
            // Handle both flat payloads and nested payloads
            if (payload.informations) {
                // Nested payload from API
                Object.assign(state.data.informations, payload.informations);
            } else {
                // Flat payload from form inputs
                Object.keys(payload).forEach(key => {
                    const stateKey = fieldMap[key] || key;
                    if (stateKey in state.data.informations) {
                        state.data.informations[stateKey] = payload[key];
                    }
                });
            }
        },
        resetProfile:(state)=>{
            state={...intialState}
        }

    }
})
export const {setProfileData,resetProfile}=profileReducer.actions;
export default profileReducer.reducer;