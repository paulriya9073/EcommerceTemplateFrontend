import { createReducer } from "@reduxjs/toolkit"

const initialState={}

export const addressReducer=createReducer(
    initialState,(builder)=>{
        builder
        .addCase("CreateAddressRequest", (state) => {
            state.loading = true
        })
        .addCase("CreateAddressSuccess", (state, action) => {
            state.loading = false
            state.message = action.payload
        })
        .addCase("CreateAddressFailure", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("LoadAddressRequest", (state) => {
            state.loading = true
        })
        .addCase("LoadAddressSuccess", (state, action) => {
            state.loading = false
            state.address = action.payload
        })
        .addCase("LoadAddressFailure", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("LoadSingleAddressRequest", (state) => {
            state.loading = true
        })
        .addCase("LoadSingleAddressSuccess", (state, action) => {
            state.loading = false
            state.address = action.payload
        })
        .addCase("LoadSingleAddressFailure", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("UpdateAddressRequest", (state) => {
            state.loading = true
        })
        .addCase("UpdateAddressSuccess", (state, action) => {
            state.loading = false
            state.message = action.payload
        })
        .addCase("UpdateAddressFailure", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("DeleteAddressRequest", (state) => {
            state.loading = true
        })
        .addCase("DeleteAddressSuccess", (state, action) => {
            state.loading = false
            state.message = action.payload
        })
        .addCase("DeleteAddressFailure", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("clearErrors",(state) => {
            state.error = null;
          })
      
    }
)