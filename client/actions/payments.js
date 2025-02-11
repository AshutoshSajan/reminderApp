import axios from 'axios';
import action from '../utils/helper';

export function createPaymentHandler(formData, cb) {
  return async (dispatch) => {
    dispatch({ type: 'PAYMENT_AUTH_START' });

    try {
      const res = await axios.post('/api/v1/payments', formData);

      if (!res.data.success) {
        return dispatch(action('PAYMENT_ERROR', { error: res.data.message }));
      }

      dispatch(action('CREATE_PAYMENT', { payment: res.data.payment }));
      return cb();
    } catch (err) {
      return dispatch(
        action('PAYMENT_AUTH_ERROR', { error: 'Something went wrong.' }),
      );
    }
  };
}

export function fetchPaymentHandler(paymentId) {
  return async (dispatch) => {
    dispatch({ type: 'PAYMENT_AUTH_START' });

    const token = localStorage.getItem('authToken');

    try {
      const res = await axios.get(`/api/v1/payments${paymentId}`, {
        headers: {
          authorization: token,
        },
      });

      if (!res.data.success) {
        return dispatch(
          action('PAYMENT_AUTH_ERROR', {
            error: res.data.message,
          }),
        );
      }

      return dispatch(
        action('GET_PAYMENT_SUCCESS', {
          payment: res.data.payment,
        }),
      );
    } catch (err) {
      return dispatch(
        action('PAYMENT_AUTH_ERROR', { error: 'Something went wrong.' }),
      );
    }
  };
}

export function fetchPaymentsListHandler() {
  return async (dispatch) => {
    dispatch({ type: 'PAYMENT_AUTH_START' });

    const token = localStorage.getItem('authToken');

    try {
      const res = await axios.get('/api/v1/payments', {
        headers: {
          authorization: token,
        },
      });

      if (!res.data.success) {
        return dispatch(
          action('PAYMENT_AUTH_ERROR', {
            error: res.data.message,
          }),
        );
      }

      return dispatch(
        action('FETCH_PAYMENT_LIST_SUCCESS', {
          payments: res.data.payments,
        }),
      );
    } catch (err) {
      return dispatch(
        action('PAYMENT_AUTH_ERROR', { error: 'Something went wrong.' }),
      );
    }
  };
}

export function paymentUpdateHandler(paymentId, formData, cb) {
  return async (dispatch) => {
    dispatch({ type: 'PAYMENT_AUTH_START' });

    const token = localStorage.getItem('authToken');

    try {
      const res = await axios.put(`/api/v1/payments/${paymentId}`, formData, {
        headers: {
          authorization: token,
        },
      });

      if (!res.data.success) {
        return dispatch(
          action('PAYMENT_AUTH_ERROR', {
            error: res.data.message,
          }),
        );
      }

      dispatch(action('UPDATE_PAYMENT', { payment: res.data.payment }));
      return cb();
    } catch (err) {
      return dispatch(
        action('PAYMENT_AUTH_ERROR', { error: 'Something went wrong.' }),
      );
    }
  };
}

export function deletePaymentHandler(paymentId) {
  return async (dispatch) => {
    dispatch({ type: 'PAYMENT_AUTH_START' });

    const token = localStorage.getItem('authToken');

    try {
      const res = await axios.delete(`/api/v1/payments/${paymentId}`, {
        headers: {
          authorization: token,
        },
      });

      if (!res.data.success) {
        return dispatch(
          action('PAYMENT_AUTH_ERROR', {
            error: 'Something went wrong.',
          }),
        );
      }

      return dispatch(action('DELETE_PAYMENT', { paymentId }));
    } catch (err) {
      return dispatch(
        action('PAYMENT_AUTH_ERROR', { error: 'Something went wrong.' }),
      );
    }
  };
}
