import axios from "axios";

export const registerUser = (username, email, phone, password,gender) => async (dispatch) => {
  try {
    dispatch({
      type: "RegisterRequest"
    })

    const { data } = await axios.post("/api/v1/register", { username, email, phone, password,gender },

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data)
    dispatch({
      type: "RegisterSuccess",
      payload: data.user
    })
  } catch (error) {
    dispatch({
      type: "RegisterFaliure",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest"
    });

    const { data } = await axios.get("/api/v1/myprofile",
      {
        headers: {
          "Content-Type": "application/json",
        },

      }
    );

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user
    })


  } catch (error) {
    dispatch({
      type: "LoadUserFaliure",
      payload: error.response.data.message,
    });

  }
};

export const loginUser = (input, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest"
    });

    const { data } = await axios.post("/api/v1/login ", { email: input, phone: input, password },

      {
        headers: {
          "Content-Type": "application/json",
        },

      }
    );


    dispatch({
      type: "LoginSuccess",
      payload: data.user
    })


  } catch (error) {
    
    dispatch({
      type: "LoginFaliure",
      payload: error.response.data.message
    });
    // In loginUser action
console.log("Error Response:", error.response?.data?.message); // Ensure this logs the error


  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    });

    await axios.get("/api/v1/logout");

    dispatch({
      type: "LogoutUserSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateProfile = (username, email, phone, gender) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateProfileRequest",
    });

    const { data } = await axios.put(
      "/api/v1/update/profile",
      { username, email, phone, gender },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "UpdateProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePassword =(oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdatePasswordRequest",
      });

      const { data } = await axios.put(
        "/api/v1/update/password",
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "UpdatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "UpdatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const forgetPassword =(email) => async (dispatch) => {
    try {
      dispatch({
        type: "ForgetPasswordRequest",
      });

      const { data } = await axios.post(
        "/api/v1/forget/password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "ForgetPasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "PasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const resetPassword =(token, password) => async (dispatch) => {
    try {
      dispatch({
        type: "ResetPasswordRequest",
      });
      console.log(token);
      const { data } = await axios.post(
        `/api/v1/reset/password/${token}`,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "ResetPasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "ResetPasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const loadAllUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadAllUserRequest"
    });

    const { data } = await axios.get("/api/v1/admin/users",
      {
        headers: {
          "Content-Type": "application/json",
        },

      }
    );

    dispatch({
      type: "LoadAllUserSuccess",
      payload: { users: data.users, numberOfUsers: data.numberOfUsers }
    })


  } catch (error) {
    dispatch({
      type: "LoadAllUserFaliure",
      payload: error.response.data.message,
    });

  }
};

export const loadSingleUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSingleUserRequest"
    })


    const { data } = await axios.get(
      `/api/v1/admin/user/${id} `,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    dispatch({
      type: "LoadSingleUserSuccess",
      payload: data.singleUser
    })

  } catch (error) {
    dispatch({
      type: "LoadSingleUserFailure",
      payload: error.response.data.message
    })

  }
}

export const updateUserRole = (id, role) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateUserRoleRequest"
    })


    const { data } = await axios.put(
      `/api/v1/admin/user/${id} `,
      { id, role },

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    dispatch({
      type: "UpdateUserRoleSuccess",
      payload: data.message
    })

  } catch (error) {
    dispatch({
      type: "DeleteUserFailure",
      payload: error.response.data.message
    })

  }
}

export const DeleteUserAccount = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteUserRequest"
    })


    const { data } = await axios.delete(
      `/api/v1/delete/${id} `,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    dispatch({
      type: "DeleteUserSuccess",
      payload: data.message
    })

  } catch (error) {
    dispatch({
      type: "DeleteUserFailure",
      payload: error.response.data.message
    })

  }
}

export const DeleteUserAdmin = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteUserAdminRequest"
    })


    const { data } = await axios.delete(
      `/api/v1//admin/user/${id} `,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    dispatch({
      type: "DeleteUserAdminSuccess",
      payload: data.message
    })

  } catch (error) {
    dispatch({
      type: "DeleteUserAdminFailure",
      payload: error.response.data.message
    })

  }
}


