import { createReducer } from "@reduxjs/toolkit"

const initialstate={}

export const orderReducer=createReducer(
    initialstate,(builder)=>{
        builder
        .addCase("ShippingAddressRequest",(state)=>{
            state.loading=true
        })
        .addCase("ShippingAddressSuccess", (state, action) => {
            state.loading = false
            state.shippingAddress=action.payload
            state.message = action.payload
        })
        .addCase("ShippingAddressFailure", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("SingleOrderPlacedRequest",(state)=>{
            state.loading=true
        })
        .addCase("SingleOrderPlacedSuccess",(state,action)=>{
            state.loading=false
            state.singleProduct=action.payload
            state.quantity=action.payload
        })
        .addCase("SingleOrderPlacedFailure", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("LoadAllMyOrdersRequest",(state)=>{
            state.loading=true
        })
        .addCase("LoadAllMyOrdersSuccess",(state,action)=>{
            state.loading=false
            state.myOrders=action.payload
        })
        .addCase("LoadAllMyOrdersFailure", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("LoadSingleOrderRequest",(state)=>{
            state.loading=true
        })
        .addCase("LoadSingleOrderSuccess",(state,action)=>{
            state.loading=false
            state.order=action.payload
        })
        .addCase("LoadSingleOrderFailure", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("LoadAllOrdersRequest",(state)=>{
            state.loading=true
        })
        .addCase("LoadAllOrdersSuccess",(state,action)=>{
            state.loading=false
            state.orders=action.payload
            state.totalAmountOfAllOrders=action.payload
            state.totalNoOfOrders=action.payload
        })
        .addCase("LoadAllOrdersFailure", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("UpdateShippingStatusRequest",(state)=>{
            state.loading=true
        })
        .addCase("UpdateShippingStatusSuccess",(state,action)=>{
            state.loading=false
            state.order=action.payload
        })
        .addCase("UpdateShippingStatusFailure", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("DeleteOrderRequest",(state)=>{
            state.loading=true
        })
        .addCase("DeleteOrderSuccess",(state,action)=>{
            state.loading=false
            state.message=action.payload
        })
        .addCase("DeleteOrderFailure", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("CancelOrderRequest",(state)=>{
            state.loading=true
        })
        .addCase("CancelOrderSuccess",(state,action)=>{
            state.loading=false
            state.message=action.payload
        })
        .addCase("CancelOrderFailure", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("clearErrors",(state) => {
            state.error = null;
          })
    }
)