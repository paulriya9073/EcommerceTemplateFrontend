import axios from "axios"

export const createProduct=(formData)=>async(dispatch)=>{
    try {
      dispatch({
        type:"CreateProductRequest"
      })

      const {data}=await axios.post(
        "/api/v1/admin/newproduct",
    formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      dispatch({
        type:"CreateProductSuccess",
        payload:data.message
      })
      
    } catch (error) {
      dispatch({
        type:"CreateProductFailure",
        payload:error.response.data.message
      })
      
    }
  }

  export const LoadAdminAllProducts=()=>async(dispatch)=>{
    try {
      dispatch({
        type:"LoadAllAdminProductsRequest"
      })

      const {data}=await axios.get(
        "/api/v1/admin/products",
    
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      dispatch({
        type:"LoadAllAdminProductsSuccess",
        payload:{ products: data.products , totalNumberOfProducts: data.totalNumberOfProducts}
      })
      
    } catch (error) {
      dispatch({
        type:"LoadAllAdminProductsFailure",
        payload:error.response.data.message
      })
      
    }
  }

  export const LoadAllProducts=()=>async(dispatch)=>{
    try {
      dispatch({
        type:"LoadAllProductsRequest"
      })

      const {data}=await axios.get(
        "api/v1/allproducts",
    
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      dispatch({
        type:"LoadAllProductsSuccess",
        payload:{ products: data.products ,
                  productCount: data.productCount,
                  // productPerPage:data.productPerPage,
                  filteredProductsCount:data.filteredProductsCount}
      })
      
    } catch (error) {
      dispatch({
        type:"LoadAllProductsFailure",
        payload:error.response.data.message
      })
      
    }
  }

  export const LoadSingleProduct=(id)=>async(dispatch)=>{
    try {
      dispatch({
        type:"LoadSingleProductRequest"
      })

      const {data}=await axios.get(
        `/api/v1/product/${id}`,
        
    
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      dispatch({
        type:"LoadSingleProductSuccess",
        payload:data.product
      })
      
    } catch (error) {
      dispatch({
        type:"LoadSingleProductFailure",
        payload:error.response.data.message
      })
      
    }
  }

  export const updateProduct=(id,formData)=>async(dispatch)=>{
    try {
      dispatch({
        type:"UpdateProductRequest"
      })

      const {data}=await axios.put(
        `/api/v1/admin/product/${id}`,
    formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      dispatch({
        type:"UpdateProductSuccess",
        payload:data.message
      })
      
    } catch (error) {
      dispatch({
        type:"UpdateProductFailure",
        payload:error.response.data.message
      })
      
    }
  }

  export const deleteProduct=(id)=>async(dispatch)=>{
    try {
      dispatch({
        type:"DeleteProductRequest"
      })

      const {data}=await axios.delete(
        `/api/v1/admin/product/${id}`,
        
    
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      dispatch({
        type:"DeleteProductSuccess",
        payload:data.product
      })
      
    } catch (error) {
      dispatch({
        type:"DeleteProductFailure",
        payload:error.response.data.message
      })
      
    }
  }

  export const SearchProducts = (queryParams = {}) => async (dispatch) => {
    try {
      dispatch({ type: 'SearchProductsRequest' });
  
      const queryString = new URLSearchParams(queryParams).toString();
      const { data } = await axios.get(`/api/v1/allproducts?${queryString}`);
  
      dispatch({
        type: 'SearchProductsSuccess',
        payload: {
          products: data.products,
          productCount: data.productCount,
          // productPerPage: data.productPerPage,
          filteredProductsCount: data.filteredProductsCount,
        },
      });
    } catch (error) {
      dispatch({
        type: 'SearchProductsFailure',
        payload: error.response.data.message,
      });
    }
  };
  