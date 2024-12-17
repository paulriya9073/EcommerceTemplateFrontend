import axios from "axios"

export const addToCart=(id,quantity)=>async(dispatch)=>{
    try {
        dispatch({
          type:"AddToCartRequest"
        })
  
        const {data}=await axios.post(
          `/api/v1/cart/add/${id}`,
          {quantity},
          
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
  
        dispatch({
          type:"AddToCartSuccess",
          payload:{message:data.message,cart:data.cart}
        })
        
      } catch (error) {
        dispatch({
          type:"AddToCartFailure",
          payload:error.response.data.message
        })
        
      }
}

export const removeFromCart=(id)=>async(dispatch)=>{
    try {
        dispatch({
          type:"RemoveFromCartRequest"
        })
  
        const {data}=await axios.delete(
          `/api/v1/cart/delete/${id}`,
          
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
  
        dispatch({
          type:"RemoveFromCartSuccess",
          payload:data.message
        })
        
      } catch (error) {
        dispatch({
          type:"RemoveFromCartFailure",
          payload:error.response.data.message
        })
        
      }
}

export const deleteCart=()=>async(dispatch)=>{
  try {
      dispatch({
        type:"DeleteCartRequest"
      })

      const {data}=await axios.delete(
        `/api/v1/cart/delete`,
        
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      dispatch({
        type:"DeleteCartSuccess",
        payload:data.message
      })
      
    } catch (error) {
      dispatch({
        type:"DeleteCartFailure",
        payload:error.response.data.message
      })
      
    }
}
