import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { paymentUpdateHandler } from "../../actions/payments";
import Loader from "../common/Loader";
import { Alert } from "../common/Alert";
class EditPayment extends Component {
  constructor(props) {
    super(props);

    this.paymentId = window.location.pathname.split("/")[2];

    if (this.paymentId) {
      this.payment = this.props.payments.payments.reduce((acc, payment) => {
        if (payment._id === this.paymentId) {
          acc = payment;
        }
        return acc;
      }, null);
    }

    this.state = {
      payment: {
        studentId: this.payment ? this.payment.studentId : "",
        amount: this.payment ? +this.payment.amount : "",
        mode: this.payment ? this.payment.mode : "",
        month: this.payment ? this.payment.month : "",
        year: this.payment ? +this.payment.year : "",
        isStayFee: this.payment ? this.payment.isStayFee : false,
        isTrainingFee: this.payment ? this.payment.isTrainingFee : false
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
      paymentModes: ["cash", "UPI", "Bank Transfer"],
      isLoading: false,
      error: ""
    };
  }

  componentDidMount() {
    const { authToken } = localStorage;
    if (!this.payment) {
      this.setState({ isLoading: true });
      axios
        .get("/api/v1/payments/" + this.paymentId, {
          headers: {
            authorization: authToken
          }
        })
        .then(res => {
          this.setState({
            isLoading: false,
            payment: {
              ...this.state.payment,
              ...res.data.payment
            }
          });
        })
        .catch(err => {
          console.error(err);
          this.setState({ isLoading: false, error: "something went wrong" });
        });
    }
  }

  updatePaymentSubmitHandler = () => {
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

    this.props.dispatch(
      paymentUpdateHandler(this.paymentId, { payment }, () => {
        this.props.history.push("/payments/list-payments");
      })
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

    const { paymentModes, months, isLoading, error } = this.state;

    const { paymentsAuthError, isFetchingPayments } = this.props.payments;

    return (
      <div className="container">
        {isFetchingPayments || isLoading ? (
          <Loader />
        ) : (
          <div>
            {paymentsAuthError || error ? (
              <Alert text={paymentsAuthError || error} className="is-danger" />
            ) : null}

            <div>
              <div className="form columns">
                <div className="column is-one-third is-offset-one-third">
                  <label className="label">Edit payment details</label>
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
                        value={month}
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
                        value={mode}
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
                    onClick={this.updatePaymentSubmitHandler}
                    className="button is-info"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(store => store)(EditPayment);
