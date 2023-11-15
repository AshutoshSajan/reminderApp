import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from '../common/Loader';
import { Alert } from '../common/Alert';

import { createReminderHandler } from '../../actions/reminders';

class CreateReminder extends Component {
  state = {
    reminder: {
      studentId: '',
      amount: '',
      details: '',
      mode: '',
      month: '',
      year: '',
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
    hideError: true,
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

  paymentReminderSubmitHandler = () => {
    this.setState({ hideError: !this.state.hideError });

    const { amount, details, mode, month, year } = this.state.reminder;
    const reminder = { amount: +amount, details, mode, month, year: +year };
    this.props.dispatch(
      createReminderHandler({ reminder }, () => {
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

    const { isFetchingReminders, remindersAuthError } = this.props.reminders;

    const { paymentModes, months, hideError } = this.state;

    return (
      <div>
        {isFetchingReminders ? (
          <Loader />
        ) : (
          <div className="container">
            {remindersAuthError ? (
              <Alert
                text={remindersAuthError}
                className="is-danger"
                hideError={hideError}
                hideErrorHandler={this.hideErrorHandler}
              />
            ) : null}

            <div className="form columns">
              <div className="column is-one-third is-offset-one-third">
                <label className="label">Payment reminder</label>
                <br />

                <div className="field">
                  <div className="select is-info">
                    <select
                      className="is-capitalized"
                      name="month"
                      onChange={this.handleChange}
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
                  onClick={this.paymentReminderSubmitHandler}
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

export default connect((store) => store)(CreateReminder);
