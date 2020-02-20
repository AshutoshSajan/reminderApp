import axios from "axios";

export function createStudentHandler(formData, cb) {
  return async dispatch => {
    dispatch({ type: "STUDENTS_AUTH_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.post("/api/v1/students", formData, {
        headers: {
          authorization: token
        }
      });
      dispatch({
        type: "CREATE_STUDENT",
        data: { student: res.data.student }
      });
      cb();
    } catch (err) {
      dispatch({
        type: "STUDENTS_AUTH_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
}

export function fetchStudentsListHandler() {
  return async dispatch => {
    dispatch({ type: "STUDENTS_AUTH_START" });

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
        type: "STUDENTS_AUTH_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
}

export function fetchStudentHandler(studentId) {
  return async dispatch => {
    dispatch({ type: "STUDENTS_AUTH_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.get("/api/v1/students/" + studentId, {
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
        type: "STUDENTS_AUTH_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
}

export function updateStudentHandler(studentId, formData, cb) {
  return async dispatch => {
    dispatch({ type: "STUDENTS_AUTH_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.put("/api/v1/students/" + studentId, formData, {
        headers: {
          authorization: token
        }
      });
      dispatch({
        type: "UPDATE_STUDENT",
        data: { student: res.data.student }
      });
      cb();
    } catch (err) {
      dispatch({
        type: "STUDENTS_AUTH_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
}

export function deleteStudentHandler(studentId) {
  return async dispatch => {
    dispatch({ type: "STUDENTS_AUTH_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.delete("/api/v1/students/" + studentId, {
        headers: {
          authorization: token
        }
      });

      dispatch({
        type: "DELETE_STUDENT",
        data: { studentId }
      });
    } catch (err) {
      dispatch({
        type: "STUDENTS_AUTH_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
}
