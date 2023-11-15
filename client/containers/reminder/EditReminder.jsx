import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateReminderHandler } from '../../actions/reminders';
import axios from 'axios';

import Loader from '../common/Loader';
import { Alert } from '../common/Alert';

class EditReminder extends Component {
  constructor(props) {
    super(props);

    this.reminderId = window.location.pathname.split('/')[2];

    if (this.reminderId) {
      this.reminder = this.props.reminders.reminders.reduce((acc, reminder) => {
        if (reminder._id === this.reminderId) {
          acc = reminder;
        }
        return acc;
      }, null);
    }

    this.state = {
      reminder: {
        studentId: this.reminder ? this.reminder.studentId : '',
        amount: this.reminder ? this.reminder.amount : '',
        details: this.reminder ? this.reminder.details : '',
        mode: this.reminder ? this.reminder.mode : '',
        month: this.reminder ? this.reminder.month : '',
        year: this.reminder ? this.reminder.year : '',
      },

      months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      paymentModes: ['call', 'sms', 'email'],

      isLoading: false,
      error: '',
      hideError: true,
    };
  }

  componentDidMount = () => {
    const { authToken } = localStorage;

    if (!this.reminder) {
      this.setState({ isLoading: true });
      axios
        .get('/api/v1/reminders/' + this.reminderId, {
          headers: {
            authorization: authToken,
          },
        })
        .then((res) => {
          this.setState((state) => ({
            isLoading: false,
            reminder: {
              ...state.reminder,
              ...res.data.reminder,
            },
          }));
        })
        .catch((err) => {
          console.error(err);
          this.setState({ isLoading: false, error: 'something went wrong' });
        });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      reminder: {
        ...this.state.reminder,
        [name]: value,
      },
    });
  };

  updateReminderSubmitHandler = () => {
    this.setState({ hideError: !this.state.hideError });

    const { studentId, amount, details, mode, month, year } =
      this.state.reminder;

    const reminder = {
      amount: +amount,
      details,
      mode,
      month,
      year: +year,
    };

    this.props.dispatch(
      updateReminderHandler(this.reminderId, { reminder }, () => {
        this.props.history.push('/reminders/list-reminders');
      }),
    );

    this.setState({
      reminder: {
        studentId: '',
        amount: '',
        details: '',
        mode: '',
        month: '',
        year: '',
      },
    });
  };

  hideErrorHandler = () => {
    this.setState({
      hideError: true,
    });
  };

  render() {
    const { studentId, amount, details, mode, month, year } =
      this.state.reminder;

    const { paymentModes, months, isLoading, error, hideError } = this.state;
    const { isFetchingReminders, remindersAuthError } = this.props.reminders;

    return (
      <div>
        {isFetchingReminders || isLoading ? (
          <Loader />
        ) : (
          <div className="container">
            {remindersAuthError || error ? (
              <Alert
                text={remindersAuthError || error}
                className="is-danger"
                hideError={hideError}
                hideErrorHandler={this.hideErrorHandler}
              />
            ) : null}

            <div className="form columns">
              <div className="column is-one-third is-offset-one-third">
                <label className="label">Edit Reminder</label>
                <br />

                <div className="field">
                  <div className="select is-info">
                    <select
                      className="is-capitalized"
                      name="month"
                      onChange={this.handleChange}
                      value={month}
                    >
                      <option value="">Month of reminder</option>
                      {months.map((month, i) => (
                        <option value={month} key={i}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field">
                  <div className="select is-info">
                    <select
                      className="is-capitalized"
                      name="mode"
                      onChange={this.handleChange}
                      value={mode}
                    >
                      <option value="">Mode of Reminder</option>
                      {paymentModes.map((mode, i) => (
                        <option value={mode} key={i}>
                          {mode}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Amount</label>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      name="amount"
                      value={amount}
                      onChange={this.handleChange}
                      placeholder="e.g 8000"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Details</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="details"
                      value={details}
                      onChange={this.handleChange}
                      placeholder="e.g"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Year</label>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      name="year"
                      value={year}
                      onChange={this.handleChange}
                      placeholder="e.g. 2020"
                    />
                  </div>
                </div>

                <button
                  onClick={this.updateReminderSubmitHandler}
                  className="button is-info"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect((store) => store)(EditReminder);
