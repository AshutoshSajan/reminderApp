import React, { Component } from "react";

import { submitPaymentDetails } from "../../actions/index";

export default class PaymentDetails extends Component {
  constructor(props) {
    super();
    const studentId = window.location.pathname.split("/")[2];

    this.state = {
      payment: {
        studentId: studentId || "",
        amount: 0,
        mode: "",
        month: "",
        year: 0,
        isStayFee: false,
        isTrainingFee: false
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
  }

  componentDidMount = () => {};

  paymentDetailsSubmitHandler = () => {
    const {
      studentId,
      amount,
      mode,
      month,
      year,
      isStayFee,
      isTrainingFee
    } = this.state.payment;

    const payment = {
      amount: +amount,
      mode,
      month,
      year: +year,
      isStayFee,
      isTrainingFee
    };
    console.log(payment, "paymentDetailsSubmitHandler called...");

    this.props.dispatch(submitPaymentDetails(studentId, payment));
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      payment: {
        ...this.state.payment,
        [name]: value
      }
    });
  };

  handleToggle = e => {
    const { name } = e.target;

    this.setState({
      payment: {
        ...this.state.payment,
        [name]: !this.state.payment[name]
      }
    });
  };

  render() {
    const {
      amount,
      mode,
      month,
      year,
      isStayFee,
      isTrainingFee
    } = this.state.payment;

    return (
      <div className="container">
        <div className="form columns">
          <div className="column is-one-third is-offset-one-third">
            <label className="label">Send payment details</label>
            <br />

            <div className="field">
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="isStayFee"
                  checked={isStayFee}
                  onChange={this.handleToggle}
                />
                Stay Fee paid
              </label>
            </div>

            <div className="field">
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="isTrainingFee"
                  checked={isTrainingFee}
                  onChange={this.handleToggle}
                />
                Paid Training Fee
              </label>
            </div>

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
              <label className="label">Amount paid</label>
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
// payment schema feils...
// ==================================================


let payment = {
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student"
  },
  amount: {
    type: Number,
    required: true
  },
  mode: {
    type: String,
    enum: paymentModeEnum
  },
  month: {
    type: String,
    enum: monthsEnum
  },
  year: {
    type: Number
  },
  isStayFee: {
    type: Boolean,
    default: false
  },
  isTrainingFee: {
    type: Boolean,
    default: false
  }
};
// ==================================================

*/
