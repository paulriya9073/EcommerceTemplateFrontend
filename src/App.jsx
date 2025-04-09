
// import './App.css'

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import axios from "axios"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Home from "./Components/Home"
import Signup from "./Components/User/Signup"
import Login from "./Components/User/Login"

import { loadUser } from "./Actions/User"

import ForgetPassword from "./Components/User/ForgetPassword"
import ResetPassword from "./Components/User/ResetPassword"
import ProductDetails from "./Components/Layouts/ProductDetails"
import Cart from "./Components/Layouts/Cart"
import Shipping from "./Components/Checkout/Shipping"
import ConfirmOrder from "./Components/Checkout/ConfirmOrder"
import OrderDetails from "./Components/User/OrderDetails"
import ShippingStatus from "./Components/Admin/ShippingStatus"
import SearchResults from "./Components/SearchResults"
import Invoice from "./Components/Invoice"
import UserDashborad from "./Components/User/Dashboard"
import AdminDashboard from "./Components/Admin/AdminDashboard"


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
 
 <Route path="/signup" element={<Signup/>}/>
 <Route path="/login" element={<Login/>}/>
 <Route path="/forget/password" element={<ForgetPassword/>}/>
 <Route path="/reset/password/:token"  element={<ResetPassword/>}/>

 <Route path="/search" element={<SearchResults/>} />
 <Route path='/cart' element={<Cart/>}/>
 <Route path='/product/:id' element={<ProductDetails/>}/>

{/* User routes */}
 <Route path='/account/dashboard' element={<UserDashborad/>}/>
 <Route path='/account/myorders/:id' element={<OrderDetails/>}/>

{/* admin routes */}
<Route path="/admin/dashboard" element={<AdminDashboard/>}/>
<Route path="/admin/order-details/:id" element={<ShippingStatus/>}/>

 <Route path="/checkout/shipping" element={<Shipping/>}/>
 <Route path="/checkout/confirmorder" element={<ConfirmOrder/>}/>
 <Route path="/invoice/:id" element={<Invoice/>}/>

 </Routes>

 </BrowserRouter>
    </>
  )
}

export default App
