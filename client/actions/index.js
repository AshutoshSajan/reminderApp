import axios from 'axios';
import action from '../utils/helper';

export function loginMentor(formData, cb) {
  return async (dispatch) => {
    dispatch({ type: 'AUTH_START' });

    try {
      const res = await axios.post('/api/v1/auth/login', formData);

      if (!res.data.success) {
        return dispatch(action('AUTH_ERROR', { error: res.data.message }));
      }

      dispatch(
        action('AUTH_SUCCESS', {
          mentor: res.data.response.mentor,
        }),
      );

      if (res.data.response.token) {
        localStorage.setItem('authToken', res.data.response.token);
      }

      return cb();
    } catch (err) {
      console.error(err, 'catch err...');
      return dispatch(action('AUTH_ERROR', { error: 'Something went wrong.' }));
    }
  };
}

export function verifyMentor(token) {
  return async (dispatch) => {
    dispatch({ type: 'AUTH_START' });

    try {
      const res = await axios.get('/api/v1/auth/me', {
        headers: {
          authorization: token,
        },
      });

      if (!res.data.success) {
        return dispatch(
          action('AUTH_ERROR', { error: 'Something went wrong.' }),
        );
      }

      return dispatch(action('AUTH_SUCCESS', { mentor: res.data.mentor }));
    } catch (err) {
      console.error(err);
      return dispatch(action('AUTH_ERROR', { error: 'Something went wrong.' }));
    }
  };
}
