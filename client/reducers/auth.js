const initialState = {
  isAuthInProgress: false,
  isAuthenticated: false,
  isIdentifyingToken: false,
  authError: null,
  mentor: null,
};

// eslint-disable-next-line default-param-last
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isAuthInProgress: true, authError: null };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        isAuthInProgress: false,
        authError: null,
        isAuthenticated: true,
        isIdentifyingToken: false,
        mentor: action.data.mentor,
      };

    case 'AUTH_ERROR':
      return {
        ...state,
        isAuthInProgress: false,
        authError: action.data.error,
        isAuthenticated: false,
        mentor: null,
      };

    case 'TOKEN_VERIFICATION_START':
      return {
        ...state,
        isAuthInProgress: true,
        authError: null,
        isIdentifyingToken: true,
      };

    case 'LOGOUT':
      return {
        ...state,
        isAuthInProgress: false,
        isAuthenticated: false,
        isIdentifyingToken: false,
        authError: null,
        mentor: null,
      };

    default:
      return state;
  }
};

export default authReducer;
