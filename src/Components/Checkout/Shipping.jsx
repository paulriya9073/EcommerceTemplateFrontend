import React, { useState } from 'react'
import Navbar from '../Layouts/Navbar'
import Footer from '../Layouts/Footer'
import CheckOutSteps from './CheckOutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { GetShippingAddress } from '../../Actions/Order'




const Shipping = () => {

  const {user}=useSelector((state)=>state.user)

  const dispatch=useDispatch()
  const navigate=useNavigate()

 

  const [selectAddress,setSelectAddress]=useState(null)

  const handleSelectAddres=(addressId)=>{
    setSelectAddress(addressId)
    dispatch(GetShippingAddress(addressId))
    
  }
  

  return (
    <>
    <Navbar/>
    <div className='w-full h-full bg-blue-50'>
        <div id='progress' className='w-full h-20 py-6 md:py-10' >
       <CheckOutSteps activeStep={0}/>
        </div>
        <div className='h-full w-full flex justify-center' >

        <div className='h-full w-[90vw] p-8 flex flex-col gap-3'>
        {
                                                user && user.username && user.addresses.map((add, index) => (
                                                    <div key={index} 
                                                    onClick={()=>handleSelectAddres(add._id)}
                                                    className={`w-full 
                                                    h-auto bg-white flex flex-col p-4 rounded-md shadow-xl ${selectAddress===add._id ? 'border-2 border-blue-500' : ''} `}>

                                                        <div className='flex flex-col md:gap-2 p-2'>
                                                            <h1 className='text-[1.1rem] md:text-2xl pb-1'>{add.name}</h1>
                                                            <p className='text-[1rem] md:text-xl'>{add.address}
                                                                <br />
                                                                {add.city}
                                                                <br />
                                                                {add.state}-{add.pincode}
                                                                <br />
                                                                {add.country} </p>
                                                            <h1 className='text-[1.1rem] md:text-2xl pt-1'>{add.phone}</h1>
                                                        </div>
                                                        <div className='w-full flex justify-end gap-2 p-2'>
                                                            <Link to={`/account/address/${add._id}`} 
                                                            state={{fromCheckout:true}}
                                                            className=' bg-blue-100 text-blue-500 hover:bg-blue-300 transition-colors duration-300 rounded w-12 text-center'><i className="ri-pencil-line text-xl md:text-2xl"></i></Link>
                                                            
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <div className='h-full bg-white border-2 rounded-md shadow-xl'>
                                            <Link to="/account/newaddress" state={{fromCheckout:true}}   className='w-full h-22 md:h-44 flex flex-col justify-center items-center md:gap-2 p-2'>
                        <h1 className='text-[1rem] md:text-xl '>Add New Address</h1>
                        <i className="ri-add-circle-line text-2xl md:text-5xl"></i>

                    </Link>
                                            </div>

                                            <Link to='/checkout/confirmorder' className='flex justify-center'>
                                            <button
                                            
                                             className='w-full md:w-96 h-14 rounded-full md:rounded-md text-xl md:text-2xl bg-blue-600 text-white font-semibold shadow-xl hover:bg-blue-700'>Continue</button>
                                            </Link>
        </div>

        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Shipping