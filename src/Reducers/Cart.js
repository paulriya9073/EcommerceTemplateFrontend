import { createReducer } from "@reduxjs/toolkit"

const initialState={}

export const cartreducer=createReducer(
    initialState,(builder)=>{
        builder
        .addCase('AddToCartRequest',(state)=>{
            state.loading=true
        })
        .addCase('AddToCartSuccess',(state,action)=>{
            state.loading=false
            state.message=action.payload
            state.cart=action.payload
        })
        .addCase('AddToCartFailure',(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase('RemoveFromCartRequest',(state)=>{
            state.loading=true
        })
        .addCase('RemoveFromCartSuccess',(state,action)=>{
            state.loading=false
            state.message=action.payload
        })
        .addCase('RemoveFromCartFailure',(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase('DeleteCartRequest',(state)=>{
            state.loading=true
        })
        .addCase('DeleteCartSuccess',(state,action)=>{
            state.loading=false
            state.message=action.payload
        })
        .addCase('DeleteCartFailure',(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase("clearErrors",(state) => {
            state.error = null;
          })
        
    }
)