import React, { Component } from "react";
import { connect } from "react-redux";

import { createPaymentHandler } from "../../actions/payments";

class CreatePayment extends Component {
  constructor(props) {
    super();
    this.studentId = window.location.pathname.split("/")[2];

    this.state = {
      payment: {
        studentId: this.studentId.length > 4 || "",
        amount: "",
        mode: "",
        month: "",
        year: "",
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
      ],
      paymentModes: ["cash", "UPI", "Bank Transfer"]
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
      // studentId,
      amount: +amount,
      mode,
      month,
      year: +year,
      isStayFee,
      isTrainingFee
    };

    // TODO: add student id inpayment object after testing

    this.props.dispatch(
      createPaymentHandler({ payment }, () =>
        this.props.history.push("/payments/list-payments")
      )
    );
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

    const { paymentModes, months } = this.state;

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
                  <option value="">Month of payment</option>
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
                  <option value="">Mode of payment</option>
                  {paymentModes.map((mode, i) => (
                    <option value={mode} key={i}>
                      {mode}
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

export default connect(store => store)(CreatePayment);
