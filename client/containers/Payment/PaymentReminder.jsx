import React, { Component } from "react";

export default class PaymentReminder extends Component {
  state = {
    reminder: {
      studentId: "",
      amount: 0,
      details: "",
      mode: "",
      month: "",
      year: 0
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
    ]
  };

  componentDidMount = () => {};

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      reminder: {
        ...this.state.reminder,
        [name]: value
      }
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
                  <option value="">please select a month</option>
                  {this.state.months.map((month, i) => (
                    <option value={month} key={i}>
                      {month}
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
              <label className="label">Mode of payment</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="mode"
                  value={mode}
                  onChange={this.handleChange}
                  placeholder="e.g cash/phonepay"
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
              onClick={this.paymentDetailsSubmitHandler}
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

/*

// ==================================================
// reminder schema feilds...
// ==================================================

let reminder = {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student'
    },
    amount: {
      type: Number,
      required: true
    },
    details: {
      type: String
    },
    mode: {
      type: String,
      enum: reminderModeEnum
    },
    month: {
      type: String,
      enum: monthsEnum
    },
    year: {
      type: Number
    }
  },

  */
