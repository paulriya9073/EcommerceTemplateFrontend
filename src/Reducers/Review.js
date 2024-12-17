import { createReducer } from "@reduxjs/toolkit"

const initialState={}

export const reviewReducer=createReducer(
    initialState,(builder)=>{
        builder
        .addCase('CreateReviewRequest',(state)=>{
            state.loading=true
        })
        .addCase('CreateReviewSuccess',(state,action)=>{
            state.loading=false
            state.message=action.payload
        })
        .addCase('CreateReviewFailure',(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase('LoadAllReviewsRequest',(state)=>{
            state.loading=true
        })
        .addCase('LoadAllReviewsSuccess',(state,action)=>{
            state.loading=false
            state.Reviews=action.payload
        })
        .addCase('LoadAllReviewsFailure',(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase('DeleteReviewrequest',(state)=>{
            state.loading=true
        })
        .addCase('DeleteReviewSuccess',(state,action)=>{
            state.loading=false;
            state.message=action.payload
        })
        .addCase('DeleteReviewFailure',(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase("clearErrors",(state) => {
            state.error = null;
          })

    }
)