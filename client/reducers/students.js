const initialState = {
  isFetchinglist: false,
  fetchingListError: null,
  list: []
};

const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_STUDENTS_LIST_START":
      return {
        ...state,
        isFetchinglist: true,
        fetchingListError: null,
        list: []
      };
    case "FETCH_STUDENTS_LIST_SUCCESS":
      return {
        ...state,
        isFetchinglist: false,
        list: action.data.students,
        fetchingListError: null
      };
    case "FETCH_STUDENTS_LIST_ERROR":
      return {
        ...state,
        isFetchinglist: false,
        fetchingListError: action.data.error
      };
    default:
      return state;
  }
};

export default studentsReducer;
