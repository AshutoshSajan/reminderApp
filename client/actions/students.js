import axios from "axios";
import action from "../utils/helper";

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

      if (!res.data.success) {
        return dispatch(
          action("STUDENTS_AUTH_ERROR", {
            error: res.data.message
          })
        );
      }

      dispatch(action("CREATE_STUDENT", { student: res.data.student }));

      cb();
    } catch (err) {
      dispatch(
        action("STUDENTS_AUTH_ERROR", { error: "Something went wrong." })
      );
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

      if (!res.data.success) {
        return dispatch(
          action("STUDENTS_AUTH_ERROR", {
            error: res.data.message
          })
        );
      }

      dispatch(
        action("FETCH_STUDENTS_LIST_SUCCESS", {
          students: res.data.students
        })
      );
    } catch (err) {
      dispatch(
        action("STUDENTS_AUTH_ERROR", { error: "Something went wrong." })
      );
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

      if (!res.data.success) {
        return dispatch(
          action("STUDENTS_AUTH_ERROR", {
            error: res.data.message
          })
        );
      }

      dispatch(action("FETCH_STUDENT_SUCCESS", { student: res.data.student }));
    } catch (err) {
      dispatch(
        action("STUDENTS_AUTH_ERROR", { error: "Something went wrong." })
      );
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

      if (!res.data.success) {
        return dispatch(
          action("STUDENTS_AUTH_ERROR", {
            error: res.data.message
          })
        );
      }

      dispatch(action("UPDATE_STUDENT", { student: res.data.student }));
      cb();
    } catch (err) {
      dispatch(
        action("STUDENTS_AUTH_ERROR", { error: "Something went wrong." })
      );
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

      if (!res.data.success) {
        return dispatch(
          action("STUDENTS_AUTH_ERROR", {
            error: res.data.message
          })
        );
      }

      dispatch(action("DELETE_STUDENT", { studentId }));
    } catch (err) {
      dispatch(
        action("STUDENTS_AUTH_ERROR", { error: "Something went wrong." })
      );
    }
  };
}
