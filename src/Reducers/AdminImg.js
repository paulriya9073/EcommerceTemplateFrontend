import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    adminImages: [],
    sliderImage: [],
    adminImage: null,
    error: null,
  };

export const adminImgReducer=createReducer(
    initialState,(builder)=>{
        builder
        .addCase('CreateSliderImgRequest',(state)=>{
            state.loading=true
        })
        .addCase('CreateSliderImgSuccess',(state,action)=>{
            state.loading=false
            state.sliderImage=action.payload
        })
        .addCase('CreateSliderImgFailure',(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase('UploadLogoRequest',(state)=>{
            state.loading=true
        })
        .addCase('UploadLogoSuccess',(state,action)=>{
            state.loading=false
            state.adminImage=action.payload
        })
        .addCase('UploadLogoFailure',(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase('LoadAdminImgRequest',(state)=>{
            state.loading=true
        })
        .addCase('LoadAdminImgSuccess',(state,action)=>{
            state.loading=false
            state.adminImages=action.payload
        })
        .addCase('LoadAdminImgFailure',(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase('DeleteAdminImgRequest',(state)=>{
            state.loading=true
        })
        .addCase('DeleteAdminImgSuccess',(state,action)=>{
            state.loading=false
            state.message=action.payload
        })
        .addCase('DeleteAdminImgFailure',(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
    })