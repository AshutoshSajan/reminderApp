import axios from "axios";

export function loginMentor(formData, cb) {
  return async dispatch => {
    dispatch({ type: "AUTH_START" });

    try {
      const res = await axios.post("/api/v1/auth/login", formData);
      dispatch({
        type: "AUTH_SUCCESS",
        data: { mentor: res.data.response.mentor }
      });

      if (res.data.response.token) {
        localStorage.setItem("authToken", res.data.response.token);
      }
      cb();
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
}

export function verifyMentor(token) {
  return async dispatch => {
    dispatch({ type: "AUTH_START" });

    try {
      const res = await axios.get("/api/v1/auth/me", {
        headers: {
          authorization: token
        }
      });
      dispatch({
        type: "AUTH_SUCCESS",
        data: { mentor: res.data.mentor }
      });
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
}
