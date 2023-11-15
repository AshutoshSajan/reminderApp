const initialState = {
  isFetchingStudents: false,
  studentsAuthError: null,
  students: [],
};

// eslint-disable-next-line default-param-last
const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STUDENTS_AUTH_START':
      return {
        ...state,
        isFetchingStudents: true,
        studentsAuthError: null,
      };

    case 'FETCH_STUDENTS_LIST_SUCCESS':
      return {
        ...state,
        isFetchingStudents: false,
        studentsAuthError: null,
        students: action.data.students,
      };

    case 'CREATE_STUDENT':
      return {
        ...state,
        isFetchingStudents: false,
        students: [...state.students, action.data.student],
        studentsAuthError: null,
      };

    case 'UPDATE_STUDENT':
      return {
        ...state,
        isFetchingStudents: false,
        students: state.students.map((student) => {
          if (student._id === action.data.student._id) {
            return action.data.student;
          }

          return student;
        }),
        studentsAuthError: null,
      };

    case 'DELETE_STUDENT':
      return {
        ...state,
        isFetchingStudents: false,
        students: state.students.filter(
          (student) => student._id !== action.data.studentId,
        ),
        studentsAuthError: null,
      };

    case 'STUDENTS_AUTH_ERROR':
      return {
        ...state,
        isFetchingStudents: false,
        studentsAuthError: action.data.error,
        students: [],
      };

    default:
      return state;
  }
};

export default studentsReducer;
