import axios from "axios";

const loginMentor = (formData, cb) => {
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
};

const verifyMentor = token => {
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
};

const fetchStudentsList = () => {
  return async dispatch => {
    dispatch({ type: "FETCH_STUDENTS_LIST_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.get("/api/v1/students", {
        headers: {
          authorization: token
        }
      });
      dispatch({
        type: "FETCH_STUDENTS_LIST_SUCCESS",
        data: { students: res.data.students }
      });
    } catch (err) {
      dispatch({
        type: "FETCH_STUDENTS_LIST_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
};

const createStudent = (formData, cb) => {
  return async dispatch => {
    dispatch({ type: "CREATE_STUDENT_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.post("/api/v1/students", formData, {
        headers: {
          authorization: token
        }
      });
      dispatch({
        type: "CREATE_STUDENT_SUCCESS",
        data: { students: res.data.students }
      });
      cb();
    } catch (err) {
      dispatch({
        type: "CREATE_STUDENT_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
};

const updateStudentHandler = (id, formData, cb) => {
  return async dispatch => {
    dispatch({ type: "UPDATE_STUDENT_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.put("/api/v1/students/" + id, formData, {
        headers: {
          authorization: token
        }
      });
      dispatch({
        type: "UPDATE_STUDENT_SUCCESS",
        data: { student: res.data.student }
      });
      cb();
    } catch (err) {
      dispatch({
        type: "UPDATE_STUDENT_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
};

const handelDeleteStudent = (id, cb) => {
  return async dispatch => {
    dispatch({ type: "DELETE_STUDENT_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.delete("/api/v1/students/" + id, {
        headers: {
          authorization: token
        }
      });

      dispatch({
        type: "DELETE_STUDENT_SUCCESS",
        data: { student: res.data.student }
      });
      // cb();
    } catch (err) {
      dispatch({
        type: "DELETE_STUDENT_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
};

const paymenHandler = (id, cb) => {
  return async dispatch => {
    dispatch({ type: "CREATE_PAYMENT_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.post("/api/v1/students", formData, {
        headers: {
          authorization: token
        }
      });
      dispatch({
        type: "CREATE_PAYMENT_SUCCESS",
        data: { payment: res.data.payment }
      });
      // cb();
    } catch (err) {
      dispatch({
        type: "CREATE_PAYMENT_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
};

const paymentReminderHandler = (id, cb) => {
  return async dispatch => {
    dispatch({ type: "PAYMENT_REMINDER_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.get("/api/v1/payments/" + id + "/students", {
        headers: {
          authorization: token
        }
      });
      dispatch({
        type: "PAYMENT_REMINDER_SUCCESS",
        data: { payment: res.data.payment }
      });
      // cb();
    } catch (err) {
      dispatch({
        type: "PAYMENT_REMINDER_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
};

const fetchStudentHandler = id => {
  return async dispatch => {
    dispatch({ type: "FETCH_STUDENT_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.get("/api/v1/students/" + id, {
        headers: {
          authorization: token
        }
      });
      dispatch({
        type: "FETCH_STUDENT_SUCCESS",
        data: { student: res.data.student }
      });
    } catch (err) {
      dispatch({
        type: "FETCH_STUDENT_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
};

const submitPaymentDetails = (id, formData) => {
  return async dispatch => {
    dispatch({ type: "CREATE_PAYMENT_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.post("/api/v1/payments", formData, {
        headers: {
          authorization: token
        }
      });
      dispatch({
        type: "CREATE_PAYMENT_SUCCESS",
        data: { payment: res.data.payment }
      });
      // cb();
    } catch (err) {
      dispatch({
        type: "CREATE_PAYMENT_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
};

export {
  loginMentor,
  verifyMentor,
  fetchStudentsList,
  createStudent,
  handelDeleteStudent,
  updateStudentHandler,
  paymentReminderHandler,
  paymenHandler,
  fetchStudentHandler,
  submitPaymentDetails
};
