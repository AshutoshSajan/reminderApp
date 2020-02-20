import React, { Component } from "react";
import { connect } from "react-redux";
import { updateReminderHandler } from "../../actions/reminders";

class EditReminder extends Component {
  constructor(props) {
    super(props);

    const reminderId = window.location.pathname.split("/")[2] || "122";

    const paymentReminder = this.props.reminders.reduce((acc, reminder) => {
      if (reminder._id === reminderId) {
        acc = reminder;
        // return acc;
      }
      return acc;
    }, {});

    console.log(paymentReminder, "edit pay rem constructor....");

    this.state = {
      reminder: {
        studentId: "",
        amount: "",
        details: "",
        mode: "",
        month: "",
        year: ""

        // ...this.state.reminder,
        // ...paymentReminder
      },

      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      paymentModes: ["call", "sms", "email"]
    };
  }

  componentDidMount = () => {
    const { authToken } = localStorage;
    console.log(authToken, "cdm edit payment reminders....");
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      reminder: {
        ...this.state.reminder,
        [name]: value
      }
    });
  };

  updateReminderSubmitHandler = () => {
    const { amount, details, mode, month, year } = this.state.reminder;
    const reminder = { amount: +amount, details, mode, month, year: +year };
    this.props.dispatch(updateReminderHandler({ reminder }), () => {
      this.props.history.push("/reminders/list-reminders");
    });
  };

  render() {
    const {
      studentId,
      amount,
      details,
      mode,
      month,
      year
    } = this.state.reminder;

    const { paymentModes, months } = this.state;

    return (
      <div className="container">
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
              onClick={this.updateReminderSubmitHandler}
              className="button is-info"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(store => store)(EditReminder);
