import axios from "axios"

export const createEditReview=(id,comment,rating)=>async(dispatch)=>{
    try {
        dispatch({
          type:"CreateReviewRequest"
        })
  
        const {data}=await axios.put(
          `/api/v1/review/${id}`,
          {comment,rating},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
  
        dispatch({
          type:"CreateReivewSuccess",
          payload:data.message
        })
        
      } catch (error) {
        dispatch({
          type:"CreateReivewFailure",
          payload:error.response.data.message
        })
        
      }

}

export const LoadAllReviewsOfProduct=()=>async(dispatch)=>{
  try {
      dispatch({
        type:"LoadAllReviewsRequest"
      })

      const {data}=await axios.get(
        `/api/v1/allreviews`,
    
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      dispatch({
        type:"LoadAllReviewsSuccess",
        payload:data.Reviews
      })
      
    } catch (error) {
      dispatch({
        type:"LoadAllReviewsFailure",
        payload:error.response.data.message
      })
      
    }

}

export const deleteReview=(id)=>async(dispatch)=>{
  try {
      dispatch({
        type:"DeleteReviewRequest"
      })

      const {data}=await axios.delete(
        `/api/v1/delete/review/${id}`,
      
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      dispatch({
        type:"DeleteReivewSuccess",
        payload:data.message
      })
      
    } catch (error) {
      dispatch({
        type:"DeleteReivewFailure",
        payload:error.response.data.message
      })
      
    }

}