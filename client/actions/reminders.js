import axios from 'axios';
import action from '../utils/helper';

export function createReminderHandler(formData, cb) {
  return async (dispatch) => {
    dispatch({ type: 'REMINDER_AUTH_START' });

    const token = localStorage.getItem('authToken');

    try {
      const res = await axios.post('/api/v1/reminders', formData, {
        headers: {
          authorization: token,
        },
      });

      if (!res.data.success) {
        return dispatch(
          action('REMINDER_AUTH_ERROR', {
            error: res.data.message,
          }),
        );
      }

      dispatch(action('CREATE_REMINDER', { reminder: res.data.reminder }));

      return cb();
    } catch (err) {
      return dispatch(
        action('REMINDER_AUTH_ERROR', { error: 'Something went wrong.' }),
      );
    }
  };
}

export function fetchReminderHandler(reminderId) {
  return async (dispatch) => {
    dispatch({ type: 'REMINDER_AUTH_START' });

    const token = localStorage.getItem('authToken');

    try {
      const res = await axios.get(`/api/v1/reminders/${reminderId}`, {
        headers: {
          authorization: token,
        },
      });

      if (!res.data.success) {
        return dispatch(
          action('REMINDER_AUTH_ERROR', {
            error: res.data.message,
          }),
        );
      }

      return dispatch(
        action('FETCH_REMINDER', { reminder: res.data.reminder }),
      );
    } catch (err) {
      return dispatch(
        action('REMINDER_AUTH_ERROR', { error: 'Something went wrong.' }),
      );
    }
  };
}

export function fetchRemindersListHandler() {
  return async (dispatch) => {
    dispatch({ type: 'REMINDER_AUTH_START' });

    const token = localStorage.getItem('authToken');

    try {
      const res = await axios.get('/api/v1/reminders', {
        headers: {
          authorization: token,
        },
      });

      if (!res.data.success) {
        return dispatch(
          action('REMINDER_AUTH_ERROR', {
            error: res.data.message,
          }),
        );
      }

      return dispatch(
        action('FETCH_REMINDER_LIST_SUCCESS', {
          reminders: res.data.reminders,
        }),
      );
    } catch (err) {
      return dispatch(
        action('REMINDER_AUTH_ERROR', { error: 'Something went wrong.' }),
      );
    }
  };
}

export function updateReminderHandler(reminderId, formData, cb) {
  return async (dispatch) => {
    dispatch({ type: 'REMINDER_AUTH_START' });

    const token = localStorage.getItem('authToken');

    try {
      const res = await axios.put(`/api/v1/reminders/${reminderId}`, formData, {
        headers: {
          authorization: token,
        },
      });

      if (!res.data.success) {
        return dispatch(
          action('REMINDER_AUTH_ERROR', {
            error: res.data.message,
          }),
        );
      }

      dispatch(action('UPDATE_REMINDER', { reminder: res.data.reminder }));

      return cb();
    } catch (err) {
      return dispatch(
        action('REMINDER_AUTH_ERROR', { error: 'Something went wrong.' }),
      );
    }
  };
}

export function deleteReminderHandler(reminderId) {
  return async (dispatch) => {
    dispatch({ type: 'REMINDER_AUTH_START' });

    const token = localStorage.getItem('authToken');

    try {
      const res = await axios.delete(`/api/v1/reminders/${reminderId}`, {
        headers: {
          authorization: token,
        },
      });

      if (!res.data.success) {
        return dispatch(
          action('REMINDER_AUTH_ERROR', {
            error: res.data.message,
          }),
        );
      }

      return dispatch(action('DELETE_REMINDER', { reminderId }));
    } catch (err) {
      return dispatch(
        action('REMINDER_AUTH_ERROR', { error: 'Something went wrong.' }),
      );
    }
  };
}
