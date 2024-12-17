import { createReducer } from "@reduxjs/toolkit";

const initialState={}

export const productReducer=createReducer(
    initialState,(builder)=>{
        builder
        .addCase("CreateProductRequest", (state) => {
            state.loading = true
        })
        .addCase("CreateProductSuccess", (state, action) => {
            state.loading = false
            state.message = action.payload
        })
        .addCase("CreateProductFailure", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("LoadAllAdminProductsRequest", (state) => {
            state.loading = true
        })
        .addCase("LoadAllAdminProductsSuccess", (state, action) => {
            state.loading = false
            state.products= action.payload.products
            state.totalNumberOfProducts=action.payload.totalNumberOfProducts
        })
        .addCase("LoadAllAdminProductsFailure", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("LoadAllProductsRequest", (state) => {
            state.loading = true
        })
        .addCase("LoadAllProductsSuccess", (state, action) => {
            state.loading = false
            state.products= action.payload.products
            state.productCount=action.payload.productCount
            state.filteredProductsCount=action.payload.filteredProductsCount
        })
        .addCase("LoadAllProductsFailure", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("LoadSingleProductRequest", (state) => {
            state.loading = true
        })
        .addCase("LoadSingleProductSuccess", (state, action) => {
            state.loading = false
            state.product= action.payload
           
        })
        .addCase("LoadSingleProductFailure", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("DeleteProductRequest", (state) => {
            state.loading = true
        })
        .addCase("DeleteProductSuccess", (state, action) => {
            state.loading = false
            state.message = action.payload
        })
        .addCase("DeleteProductFailure", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("SearchProductsRequest", (state) => {
            state.loading = true
        })
        .addCase("SearchProductsSuccess", (state, action) => {
            state.loading = false
            state.products= action.payload.products
            state.productCount=action.payload.productCount
            state.filteredProductsCount=action.payload.filteredProductsCount
        })
        .addCase("SearchProductsFailure", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("clearErrors",(state) => {
            state.error = null;
          })

    }
)