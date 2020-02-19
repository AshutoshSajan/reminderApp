const initialState = {
  isFetchinglist: false,
  fetchingListError: null,
  list: []
};

const reminderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_REMINDER_LIST_START":
      return {
        ...state,
        isFetchinglist: true,
        fetchingListError: null,
        list: []
      };
    case "FETCH_REMINDER_LIST_SUCCESS":
      return {
        ...state,
        isFetchinglist: false,
        list: action.data.students,
        fetchingListError: null
      };
    case "FETCH_REMINDER_LIST_ERROR":
      return {
        ...state,
        isFetchinglist: false,
        fetchingListError: action.data.error
      };
    default:
      return state;
  }
};

export default reminderReducer;
