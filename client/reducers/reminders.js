const initialState = {
  isFetchingReminders: false,
  remindersError: null,
  reminders: []
};

const remindersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REMINDER_AUTH_START":
      return {
        ...state,
        isFetchingReminders: true,
        remindersError: null,
        reminders: []
      };

    case "FETCH_REMINDER_LIST_SUCCESS":
      return {
        ...state,
        isFetchingReminders: false,
        remindersError: null,
        reminders: action.data.reminders
      };

    case "CREATE_REMINDER":
      return {
        ...state,
        isFetchingReminders: false,
        remindersError: null,
        reminders: [...state.reminders, action.data.reminder]
      };

    case "UPDATE_REMINDER":
      return {
        ...state,
        isFetchingReminders: false,
        remindersError: null,
        reminders: state.reminders.map(reminder => {
          if (reminder._id === action.data.reminder._id) {
            return action.data.reminder;
          } else {
            return reminder;
          }
        })
      };

    case "DELETE_REMINDER":
      return {
        ...state,
        isFetchingReminders: false,
        remindersError: null,
        reminders: state.reminders.filter(reminder => {
          return !reminder._id === action.data.reminderId;
        })
      };

    case "REMINDER_AUTH_ERROR":
      return {
        ...state,
        isFetchingReminders: false,
        remindersError: action.data.error,
        reminders: []
      };

    default:
      return state;
  }
};

export default remindersReducer;
