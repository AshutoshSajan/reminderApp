const initialState = {
  isFetchinglist: false,
  fetchingListError: null,
  list: []
};

const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PAYMENT_LIST_START":
      return {
        ...state,
        isFetchinglist: true,
        fetchingListError: null,
        list: []
      };
    case "FETCH_PAYMENT_LIST_SUCCESS":
      return {
        ...state,
        isFetchinglist: false,
        list: action.data.students,
        fetchingListError: null
      };
    case "FETCH_PAYMENT_LIST_ERROR":
      return {
        ...state,
        isFetchinglist: false,
        fetchingListError: action.data.error
      };
    default:
      return state;
  }
};

export default paymentsReducer;
