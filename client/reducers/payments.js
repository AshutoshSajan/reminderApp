const initialState = {
  isFetchingPayments: false,
  paymentsAuthError: null,
  payments: []
};

const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PAYMENT_AUTH_START":
      return {
        ...state,
        isFetchingPayments: true,
        paymentsAuthError: null
      };

    case "FETCH_PAYMENT_LIST_SUCCESS":
      return {
        ...state,
        isFetchingPayments: false,
        payments: action.data.payments,
        paymentsAuthError: null
      };

    case "CREATE_PAYMENT":
      return {
        ...state,
        isFetchingPayments: false,
        payments: [...state.payments, action.data.payment],
        paymentsAuthError: null
      };

    case "UPDATE_PAYMENT":
      return {
        ...state,
        isFetchingPayments: false,
        payments: state.payments.map(payment => {
          if (payment._id === action.data.payment._id) {
            return action.data.payment;
          } else {
            return payment;
          }
        }),
        paymentsAuthError: null
      };

    case "DELETE_PAYMENT":
      return {
        ...state,
        isFetchingPayments: false,
        payments: state.payments.filter(payment => {
          return payment._id !== action.data.paymentId;
        }),
        paymentsAuthError: null
      };

    case "PAYMENT_AUTH_ERROR":
      return {
        ...state,
        isFetchingPayments: false,
        payments: [],
        paymentsAuthError: action.data.error
      };

    default:
      return state;
  }
};

export default paymentsReducer;
