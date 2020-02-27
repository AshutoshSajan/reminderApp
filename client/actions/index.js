import axios from "axios";
import action from "../utils/helper";

export function loginMentor(formData, cb) {
  return async dispatch => {
    dispatch({ type: "AUTH_START" });

    try {
      const res = await axios.post("/api/v1/auth/login", formData);

      if (!res.data.success) {
        return dispatch(action("AUTH_ERROR", { error: res.data.message }));
      }

      dispatch(
        action("AUTH_SUCCESS", {
          mentor: res.data.response.mentor
        })
      );

      if (res.data.response.token) {
        localStorage.setItem("authToken", res.data.response.token);
      }
      cb();
    } catch (err) {
      console.log(err, "catch err...");
      dispatch(action("AUTH_ERROR", { error: "Something went wrong." }));
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

      if (!res.data.success) {
        return dispatch(
          action("AUTH_ERROR", { error: "Something went wrong." })
        );
      }

      dispatch(action("AUTH_SUCCESS", { mentor: res.data.mentor }));
    } catch (err) {
      dispatch(action("AUTH_ERROR", { error: "Something went wrong." }));
    }
  };
}
