import axios from "axios";

export function createReminderHandler(formData, cb) {
  return async dispatch => {
    dispatch({ type: "REMINDER_AUTH_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.post("/api/v1/reminders", formData, {
        headers: {
          authorization: token
        }
      });

      dispatch({
        type: "CREATE_REMINDER",
        data: { reminder: res.data.reminder }
      });
      cb();
    } catch (err) {
      dispatch({
        type: "REMINDER_AUTH_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
}

export function fetchReminderHandler(reminderId) {
  return async dispatch => {
    dispatch({ type: "REMINDER_AUTH_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.get("/api/v1/reminders/" + reminderId, {
        headers: {
          authorization: token
        }
      });

      dispatch({
        type: "FETCH_REMINDER",
        data: { reminder: res.data.reminder }
      });
    } catch (err) {
      dispatch({
        type: "REMINDER_AUTH_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
}

export function fetchRemindersListHandler() {
  return async dispatch => {
    dispatch({ type: "REMINDER_AUTH_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.get("/api/v1/reminders", {
        headers: {
          authorization: token
        }
      });

      dispatch({
        type: "FETCH_REMINDER_LIST_SUCCESS",
        data: { reminders: res.data.reminders }
      });
    } catch (err) {
      dispatch({
        type: "REMINDER_AUTH_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
}

export function updateReminderHandler(reminderId, formData, cb) {
  return async dispatch => {
    dispatch({ type: "REMINDER_AUTH_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.put("/api/v1/reminders/" + reminderId, formData, {
        headers: {
          authorization: token
        }
      });

      dispatch({
        type: "UPDATE_REMINDER",
        data: { reminder: res.data.reminder }
      });

      cb();
    } catch (err) {
      dispatch({
        type: "REMINDER_AUTH_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
}

export function deleteReminderHandler(reminderId) {
  return async dispatch => {
    dispatch({ type: "REMINDER_AUTH_START" });

    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.delete("/api/v1/reminders/" + reminderId, {
        headers: {
          authorization: token
        }
      });

      dispatch({
        type: "DELETE_REMINDER",
        data: { reminderId }
      });
    } catch (err) {
      dispatch({
        type: "REMINDER_AUTH_ERROR",
        data: { error: "Something went wrong." }
      });
    }
  };
}

export function paymentReminderHandler(id, email) {
  // console.log(paymentReminderHandler);
}
