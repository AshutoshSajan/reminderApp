const initialState = {
  isFetchingUsers: false,
  usersError: null,
  users: []
};

const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STUDENTS_AUTH_START":
      return {
        ...state,
        isFetchingUsers: true,
        usersError: null,
        users: []
      };

    case "FETCH_STUDENTS_LIST_SUCCESS":
      return {
        ...state,
        isFetchingUsers: false,
        usersError: null,
        users: action.data.students
      };

    case "CREATE_STUDENT":
      return {
        ...state,
        isFetchingUsers: false,
        users: [...state.students, action.data.student],
        usersError: null
      };

    case "UPDATE_STUDENT":
      return {
        ...state,
        isFetchingUsers: false,
        users: state.students.map(student => {
          if (student._id === action.data.student._id) {
            return action.data.student;
          } else {
            return student;
          }
        }),
        usersError: null
      };

    case "DELETE_STUDENT":
      return {
        ...state,
        isFetchingUsers: false,
        users: state.students.filter(student => {
          return !student._id === action.data.studentId;
        }),
        usersError: null
      };

    case "STUDENTS_AUTH_ERROR":
      return {
        ...state,
        isFetchingUsers: false,
        usersError: action.data.error,
        users: []
      };

    default:
      return state;
  }
};

export default studentsReducer;
