import axios from "axios"


export const createAddress=(name,phone,address,city,state,pincode,country)=>async(dispatch)=>{
    try {
      dispatch({
        type:"CreateAddressRequest"
      })

      const {data}=await axios.post(
        "/api/v1/newaddress",
        {name,phone,address,city,state,pincode,country},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      dispatch({
        type:"CreateAddressSuccess",
        payload:data.message
      })
      
    } catch (error) {
      dispatch({
        type:"CreateAddressFailure",
        payload:error.response.data.message
      })
      
    }
  }

  export const loadAddresses=()=>async(dispatch)=>{
    try {
      dispatch({
        type:"LoadAddressRequest"
      })

      const {data}=await axios.get(
        "/api/v1/addresses",
        
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      dispatch({
        type:"LoadAddressSuccess",
        payload:data.address
      })
      
    } catch (error) {
      dispatch({
        type:"LoadAddressFailure",
        payload:error.response.data.message
      })
      
    }
  }

  export const loadSingleAddresses=(id)=>async(dispatch)=>{
    try {
      dispatch({
        type:"LoadSingleAddressRequest"
      })
      

      const {data}=await axios.get(
        `/api/v1/address/${id} `,
        
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      dispatch({
        type:"LoadSingleAddressSuccess",
        payload:data.address
      })
      
    } catch (error) {
      dispatch({
        type:"LoadSingleAddressFailure",
        payload:error.response.data.message
      })
      
    }
  }

  export const updateSingleAddress=(id,name,phone,address,city,state,pincode,country)=>async(dispatch)=>{
    try {
      dispatch({
        type:"UpdateAddressRequest"
      })

      const {data}=await axios.put(
        `/api/v1/address/${id}`,
        {id,name,phone,address,city,state,pincode,country},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      dispatch({
        type:"UpdateAddressSuccess",
        payload:data.message
      })
      
    } catch (error) {
      dispatch({
        type:"UpdateAddressFailure",
        payload:error.response.data.message
      })
      
    }
  }

  export const deleteAddresses=(id)=>async(dispatch)=>{
    try {
      dispatch({
        type:"DeleteAddressRequest"
      })
      

      const {data}=await axios.delete(
        `/api/v1/address/${id} `,
        
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      dispatch({
        type:"DeleteAddressSuccess",
        payload:data.message
      })
      
    } catch (error) {
      dispatch({
        type:"DeleteAddressFailure",
        payload:error.response.data.message
      })
      
    }
  }

  