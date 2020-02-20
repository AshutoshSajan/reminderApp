import axios from "axios";

export function createPaymentHandler(formData, cb) {
  return async dispatch => {
    dispatch({ type: "PAYMENT_AUTH_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.post("/api/v1/payments", formData, {
        headers: {
          authorization: token
        }
      });

      console.log(res, "createPaymentDetailsHandler res..");

      dispatch({
        type: "CREATE_PAYMENT",
        data: { payment: res.data.payment }
      });
      // cb();
    } catch (err) {
      dispatch({
        type: "PAYMENT_AUTH_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
}

export function fetchPaymentDetailsHandler(paymentId) {
  return async dispatch => {
    dispatch({ type: "PAYMENT_AUTH_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.get("/api/v1/payments" + paymentId, {
        headers: {
          authorization: token
        }
      });

      console.log(res, "get Payment Details Handler res..");

      dispatch({
        type: "GET_PAYMENT_SUCCESS",
        data: { payment: res.data.payment }
      });
      // cb();
    } catch (err) {
      dispatch({
        type: "PAYMENT_AUTH_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
}

export function fetchPaymentListHandler() {
  return async dispatch => {
    dispatch({ type: "PAYMENT_AUTH_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.get("/api/v1/payments", {
        headers: {
          authorization: token
        }
      });

      console.log(res, "get Payment Details list Handler res..");

      dispatch({
        type: "FETCH_PAYMENT_LIST_SUCCESS",
        data: { payments: res.data.payments }
      });
    } catch (err) {
      dispatch({
        type: "PAYMENT_AUTH_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
}

export function paymentDetailsUpdateHandler(paymentId, formData, cb) {
  return async dispatch => {
    dispatch({ type: "PAYMENT_AUTH_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.put("/api/v1/payments/" + paymentId, formData, {
        headers: {
          authorization: token
        }
      });

      console.log(res, "createPaymentDetailsHandler res..");

      dispatch({
        type: "UPDATE_PAYMENT",
        data: { payment: res.data.payment }
      });
      cb();
    } catch (err) {
      dispatch({
        type: "PAYMENT_AUTH_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
}

export function deletePaymentDetailsHandler(paymentId, formData, cb) {
  return async dispatch => {
    dispatch({ type: "PAYMENT_AUTH_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.delete(
        "/api/v1/payments/" + paymentId,
        formData,
        {
          headers: {
            authorization: token
          }
        }
      );

      console.log(res, "createPaymentDetailsHandler res..");

      dispatch({
        type: "DELETE_PAYMENT",
        data: { payment: res.data.payment }
      });
      cb();
    } catch (err) {
      dispatch({
        type: "PAYMENT_AUTH_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
}
