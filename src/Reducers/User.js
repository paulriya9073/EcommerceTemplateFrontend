import { createReducer } from "@reduxjs/toolkit"

const initialState={
    user: null, 
    loading: false,
    error: null,
    users:null
  
}

export const userReducer=createReducer
(initialState,(builder)=>{
    builder
    .addCase("RegisterRequest", (state) => {
        state.loading = true
    })
    .addCase("RegisterSuccess", (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    })
    .addCase("RegisterFailure", (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    })
    
    .addCase("LoadUserRequest", (state) => {
        state.loading = true
    })
    .addCase("LoadUserSuccess", (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    })
    .addCase("LoadUserFailure", (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    })
    .addCase("LoginRequest", (state) => {
        state.loading = true
    })
    .addCase("LoginSuccess", (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    })
    .addCase("LoginFailure", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
    .addCase("LogoutUserRequest", (state) => {
        state.loading = true
    })
    .addCase("LogoutUserSuccess", (state, action) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = true
    })
    .addCase("LogoutUserFailure", (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    })
    .addCase("UpdateProfileRequest", (state) => {
        state.loading = true
    })
    .addCase("UpdateProfileSuccess", (state, action) => {
        state.loading = false
        state.message = action.payload
    })
    .addCase("UpdateProfileFailure", (state, action) => {
        state.loading = false
        state.error = action.payload
    })

    .addCase("UpdatePasswordRequest", (state) => {
        state.loading = true
    })
    .addCase("UpdatePasswordSuccess", (state, action) => {
        state.loading = false
        state.message = action.payload
    })
    .addCase("UpdatePasswordFailure", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("ForgetPasswordRequest", (state) => {
        state.loading = true
    })
    .addCase("ForgetPasswordSuccess", (state, action) => {
        state.loading = false
        state.message = action.payload
    })
    .addCase("ForgetPasswordFailure", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("ResetPasswordRequest", (state) => {
        state.loading = true
    })
    .addCase("ResetPasswordSuccess", (state, action) => {
        state.loading = false
        state.message = action.payload
    })
    .addCase("ResetPasswordFailure", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("LoadAllUserRequest", (state) => {
        state.loading = true
    })
    .addCase("LoadAllUserSuccess", (state, action) => {
        state.loading = false
        state.users = action.payload.users
        state.numberOfUsers=action.payload.numberOfUsers
        state.isAuthenticated = true
    })
    .addCase("LoadAllUserFailure", (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    })
    .addCase("LoadSingleUserRequest", (state) => {
        state.loading = true
    })
    .addCase("LoadSingleUserSuccess", (state, action) => {
        state.loading = false
        state.singleUser = action.payload
    })
    .addCase("LoadSingleUserFailure", (state, action) => {
        state.loading = false
        state.error = action.payload
    })

    .addCase("UpdateUserRoleRequest", (state) => {
        state.loading = true
    })
    .addCase("UpdateUserRoleSuccess", (state, action) => {
        state.loading = false
        state.message = action.payload
    })
    .addCase("UpdateUserRoleFailure", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("DeleteUserRequest", (state) => {
        state.loading = true
    })
    .addCase("DeleteUserSuccess", (state, action) => {
        state.loading = false
        state.message = action.payload
    })
    .addCase("DeleteUserFailure", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("DeleteUserAdminRequest", (state) => {
        state.loading = true
    })
    .addCase("DeleteUserAdminSuccess", (state, action) => {
        state.loading = false
        state.message = action.payload
    })
    .addCase("DeleteUserAdminFailure", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("clearErrors", (state) => {
        state.error = null;
    })
    

})