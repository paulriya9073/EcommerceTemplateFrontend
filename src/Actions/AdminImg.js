import axios from "axios";

export const CreateSliderImg = (formData) => async (dispatch) => {
    try {
      dispatch({
        type: "CreateSliderImgRequest",
      });
  
      const { data } = await axios.post(
        "/api/v1/admin/upload/sliderimage",
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
  
      dispatch({
        type: "CreateSliderImgSuccess",
        payload: data.sliderImage,
      });
    } catch (error) {
      dispatch({
        type: "CreateSliderImgFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const UploadLogo = (formData) => async (dispatch) => {
    try {
      dispatch({
        type: "UploadLogoRequest",
      });
  
      const { data } = await axios.post(
        "/api/v1/admin/upload/logo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
  
      dispatch({
        type: "UploadLogoSuccess",
        payload: data.adminImage,
      });
    } catch (error) {
      dispatch({
        type: "UploadLogoFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const LoadAdminImages = () => async (dispatch) => {
    try {
      dispatch({
        type: "LoadAdminImgRequest",
      });
  
      const { data } = await axios.get(
        "/api/v1/images",
       
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      dispatch({
        type: "LoadAdminImgSuccess",
        payload: data.adminImages,
      });

      
    } catch (error) {
      dispatch({
        type: "LoadAdminImgFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const DeleteAdminImages = (publicId) => async (dispatch) => {
    try {
      dispatch({
        type: "DeleteAdminImgRequest",
      });
  
      const { data } = await axios.delete(
        `/api/v1/admin/image/delete`,
        {
          data: { public_id: publicId }, 
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      dispatch({
        type: "DeleteAdminImgSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "DeleteAdminImgFailure",
        payload: error.response.data.message,
      });
    }
  };
  
  