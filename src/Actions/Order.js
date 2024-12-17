import axios from "axios";

export const GetShippingAddress=(shippingAddress)=>async(dispatch)=>{
    try {
      dispatch({
        type:"ShippingAddressRequest"
      });

      dispatch({
        type:"ShippingAddressSuccess",
        payload:{ shippingAddress,
                  message:"Shipping address set successfully"}
        
      })
      
    } catch (error) {
      dispatch({
        type:"ShippingAddressFailure",
        payload:error.message
      })
    }
  }

  export const GetSingleOrderPlaced=(singleProduct,quantity)=>async(dispatch)=>{
    try {
      dispatch({
        type:"SingleOrderPlacedRequest"
      });

      dispatch({
        type:"SingleOrderPlacedSuccess",
        payload:{ singleProduct,quantity}
        
      })
      
    } catch (error) {
      dispatch({
        type:"SingleOrderPlacedFailure",
        payload:error.message
      })
    }
  }

  export const LoadAllMyOrders=()=>async(dispatch)=>{
    try {
      dispatch({
        type:"LoadAllMyOrdersRequest"
      });

      const {data}=await axios.get("/api/v1/myorders",
        {
          headers: {
            "Content-Type": "application/json",
          },
      })

      dispatch({
        type:"LoadAllMyOrdersSuccess",
        payload:data.myOrders
        
      })
      
    } catch (error) {
      dispatch({
        type:"LoadAllMyOrdersFailure",
        payload:error.message
      })
    }
  }

  export const LoadSingleOrder=(id)=>async(dispatch)=>{
    try {
      dispatch({
        type:"LoadSingleOrderRequest"
      });

      const {data}=await axios.get(`/api/v1/order/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
      })

      dispatch({
        type:"LoadSingleOrderSuccess",
        payload:data.order
        
      })
      
    } catch (error) {
      dispatch({
        type:"LoadSingleOrderFailure",
        payload:error.message
      })
    }
  }

  export const LoadAllOrders=()=>async(dispatch)=>{
    try {
      dispatch({
        type:"LoadAllOrdersRequest"
      });

      const {data}=await axios.get("/api/v1/admin/orders ",
        {
          headers: {
            "Content-Type": "application/json",
          },
      })

      dispatch({
        type:"LoadAllOrdersSuccess",
        payload:{ orders:data.orders,
                  totalAmountOfAllOrders:data.totalAmountOfAllOrders,
                  totalNoOfOrders:data.totalNoOfOrders}
        
      })
      
    } catch (error) {
      dispatch({
        type:"LoadAllOrdersFailure",
        payload:error.message
      })
    }
  }

  export const UpdateShippingStatus=(id,shippingStatus)=>async(dispatch)=>{
    try {
      dispatch({
        type:"UpdateShippingStatusRequest"
      });

      const {data}=await axios.put(`/api/v1/admin/order/${id}`,
        {shippingStatus},
        {
          headers: {
            "Content-Type": "application/json",
          },
      })

      dispatch({
        type:"UpdateShippingStatusSuccess",
        payload:data.order
        
      })
      
    } catch (error) {
      dispatch({
        type:"UpdateShippingStatusFailure",
        payload:error.message
      })
    }
  }

  export const DeleteOrderAdmin=(id)=>async(dispatch)=>{
    try {
      dispatch({
        type:"DeleteOrderRequest"
      });

      const {data}=await axios.delete(`/api/v1/admin/order/${id}`,
        
        {
          headers: {
            "Content-Type": "application/json",
          },
      })

      dispatch({
        type:"DeleteOrderSuccess",
        payload:data.message
        
      })
      
    } catch (error) {
      dispatch({
        type:"DeleteOrderFailure",
        payload:error.message
      })
    }
  }

  export const CancelOrder=(id)=>async(dispatch)=>{
    try {
      dispatch({
        type:"CancelOrderRequest"
      });

      const {data}=await axios.delete(`/api/v1/order/${id}`,
        
        {
          headers: {
            "Content-Type": "application/json",
          },
      })

      dispatch({
        type:"CancelOrderSuccess",
        payload:data.message
        
      })
      
    } catch (error) {
      dispatch({
        type:"CancelOrderFailure",
        payload:error.message
      })
    }
  }

 

  