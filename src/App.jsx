
// import './App.css'

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import axios from "axios"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Home from "./Components/Home"
import Signup from "./Components/User/Signup"
import Login from "./Components/User/Login"

import { loadUser } from "./Actions/User"
import MyProfile from "./Components/User/MyProfile"
import UpdatePassword from "./Components/User/UpdatePassword"
import ForgetPassword from "./Components/User/ForgetPassword"
import ResetPassword from "./Components/User/ResetPassword"
import SavedAddresses from "./Components/Address/SavedAddresses"
import NewAddress from "./Components/Address/NewAddress"

import UpdateAddress from "./Components/Address/UpdateAddress"
import Dashboard from "./Components/Admin/Dashboard"
import AllUsers from "./Components/Admin/AllUsers"
import UpdateUserRole from "./Components/Admin/UpdateUserRole"
import AllProducts from "./Components/Admin/AllProducts"


import UpdateAdminPassword from "./Components/Admin/UpdateAdminPassword"
import CreateProduct from "./Components/Admin/CreateProduct"
import UpdateProduct from "./Components/Admin/UpdateProduct"
import AdminProfile from "./Components/Admin/AdminProfile"
import ProductDetails from "./Components/Layouts/ProductDetails"
import Cart from "./Components/Layouts/Cart"
import Shipping from "./Components/Checkout/Shipping"
import ConfirmOrder from "./Components/Checkout/ConfirmOrder"
import PieChart from "./Components/Admin/PieChart"
import MyOrders from "./Components/User/MyOrders"
import OrderDetails from "./Components/User/OrderDetails"
import AllOrders from "./Components/Admin/AllOrders"
import ShippingStatus from "./Components/Admin/ShippingStatus"
import AllReviews from "./Components/Admin/AllReviews"
import BarChart from "./Components/Admin/BarChart"
import LineChart from "./Components/Admin/LineChart"
import SearchResults from "./Components/SearchResults"
import ChangeLayout from "./Components/Admin/ChangeLayout"
import Invoice from "./Components/Invoice"
import GSTCalculator from "./Components/Admin/GstCalculator"
import BasePriceCalculator from "./Components/Admin/BasePriceCal"




function App() {

  const dispatch=useDispatch()

  const {isAuthenticated}=useSelector((state)=>state.user)


useEffect(()=>{
  dispatch(loadUser())
  // dispatch({type:"clearErrors"})
},[dispatch])

  return (
    <>
 <BrowserRouter>
 <Routes>
 <Route path="/" element={<Home/>}/>
 <Route path="/search" element={<SearchResults/>} />

 <Route path="/signup" element={<Signup/>}/>
 <Route path="/login" element={<Login/>}/>

 <Route path="/account/me" element={isAuthenticated?<MyProfile/>:<Home/>}/>
 <Route path="/account/update/password" element={isAuthenticated? <UpdatePassword/>:null}/>
 <Route path="/account/forget/password" element={<ForgetPassword/>}/>
 <Route path="/account/reset/password/:token"  element={<ResetPassword/>}/>
 <Route path="/account/addresses" element={<SavedAddresses/>}/>
 <Route path="/account/newaddress" element={<NewAddress/>}/>
 <Route path="/account/address/:id" element={<UpdateAddress/>}/>
 <Route path="/account/myorders" element={<MyOrders/>}/>
 <Route path='/account/myorders/:id' element={<OrderDetails/>}/>

 <Route path="/admin/dashboard" element={<Dashboard/>}/>
 <Route path="/admin/dashboard/layout" element={<ChangeLayout/>}/>
 <Route path="/admin/dashboard/myprofile" element={<AdminProfile/>}/>
 <Route path="/admin/dashboard/update/password" element={<UpdateAdminPassword/>}/>
 <Route path="/admin/dashboard/users" element={<AllUsers/>}/>
 <Route path="/admin/dashboard/products" element={<AllProducts/>}/>
 <Route path="/admin/dashboard/orders" element={<AllOrders/>}/>
 <Route path="/admin/dashboard/reviews" element={<AllReviews/>}/>
 <Route path="/admin/dashboard/gst" element={<GSTCalculator/>}/>
 <Route path="/admin/dashboard/baseprice" element={<BasePriceCalculator/>}/>
 <Route path="/admin/update/userrole/:id" element={<UpdateUserRole/>}/>
 <Route path='/admin/newproduct' element={<CreateProduct/>}/>
 <Route path='/admin/product/:id' element={<UpdateProduct/>}/>
<Route path="/admin/dashboard/bars/piechart" element={<PieChart/>}/>
<Route path="/admin/dashboard/bars/barchart" element={<BarChart/>}/>
<Route path="/admin/dashboard/bars/linechart" element={<LineChart/>}/>
<Route path="/admin/order-details/:id" element={<ShippingStatus/>}/>

 <Route path='/product/:id' element={<ProductDetails/>}/>
 <Route path='/cart' element={<Cart/>}/>

 <Route path="/checkout/shipping" element={<Shipping/>}/>
 <Route path="/checkout/confirmorder" element={<ConfirmOrder/>}/>

 <Route path="/invoice/:id" element={<Invoice/>}/>

 </Routes>

 </BrowserRouter>
    </>
  )
}

export default App
