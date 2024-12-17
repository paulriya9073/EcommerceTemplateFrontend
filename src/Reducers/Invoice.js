import { createReducer } from "@reduxjs/toolkit"

const initialState={}

export const invoiceReducer=createReducer(initialState,(builder)=>{
    builder
    .addCase('CreateInvoiceRequest',(state)=>{
        state.loading=true
    })
    .addCase('CreateInvoiceSuccess',(state,action)=>{
        state.loading=false
        state.invoice=action.payload
    })
    .addCase('CreateInvoiceFailure',(state,action)=>{
        state.loading=false
        state.error=action.payload
    })
    .addCase('LoadInvoiceRequest',(state)=>{
        state.loading=true
    })
    .addCase('LoadInvoiceSuccess',(state,action)=>{
        state.loading=false
        state.singleInvoice=action.payload
    })
    .addCase('LoadInvoiceFailure',(state,action)=>{
        state.loading=false
        state.error=action.payload
    })


})