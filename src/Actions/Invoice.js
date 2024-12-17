import axios from "axios";

export const CreateInvoice=(id)=>async (dispatch)=>{

    try {
        dispatch({
          type:"CreateInvoiceRequest"
        })
  
        const {data}=await axios.post(
          `/api/v1/invoice/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
  
        dispatch({
          type:"CreateInvoiceSuccess",
          payload:data.invoice
        })
        
      } catch (error) {
        dispatch({
          type:"CreateInvoiceFailure",
          payload:error.response.data.message
        })
        
      }
}

export const LoadInvoice=(id)=>async (dispatch)=>{

  try {
      dispatch({
        type:"LoadInvoiceRequest"
      })

      const {data}=await axios.get(
        `/api/v1/invoice/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      dispatch({
        type:"LoadInvoiceSuccess",
        payload:data.singleInvoice
      })
      
    } catch (error) {
      dispatch({
        type:"LoadInvoiceFailure",
        payload:error.response.data.message
      })
      
    }
}