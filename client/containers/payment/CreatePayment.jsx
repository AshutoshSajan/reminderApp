import React, { Component } from "react";
import { connect } from "react-redux";

import { createPaymentHandler } from "../../actions/payments";
import { Alert } from "../common/Alert";
import Loader from "../common/Loader";

class CreatePayment extends Component {
  constructor(props) {
    super();
    this.studentId = window.location.pathname.split("/")[2];

    this.state = {
      payment: {
        studentId: this.studentId.length > 4 || "",
        amount: "",
        mode: "",
        screenshot: "",
        month: "",
        year: "",
        isStayFee: false,
        isTrainingFee: false
      },
      error: "",
      hideError,

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
      selectedFile: ""
    };
    this.fileInput = React.createRef();
  }

  paymentDetailsSubmitHandler = () => {
    this.setState({ hideError: !this.state.hideError });

    const {
      studentId,
      amount,
      mode,
      screenshot,
      month,
      year,
      isStayFee,
      isTrainingFee
    } = this.state.payment;

    const payment = {
      // studentId,
      amount: +amount,
      mode,
      screenshot,
      month,
      year: +year,
      isStayFee,
      isTrainingFee
    };

    if (
      !amount ||
      !month ||
      !mode ||
      !screenshot ||
      !year ||
      !isStayFee ||
      !isStayFee
    ) {
      return this.handleError("All feilds are must");
    }

    // TODO: add student id in payment object after testing
    this.props.dispatch(
      createPaymentHandler({ payment }, () =>
        this.props.history.push("/students/thank-you")
      )
    );
  };

  handleError = async err => {
    await this.setState({ error: err });
  };

  handleFileChange = async e => {
    const file = event.target.files[0];

    this.setState({ selectedFile: file.name });

    const setFileInState = str => {
      str
        ? this.setState({
            payment: {
              ...this.state.payment,
              screenshot: str
            }
          })
        : null;
    };

    // file conversion to base64 using FileReader
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = event => {
      setFileInState(event.target.result);
    };
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

  hideErrorHandler = () => {
    this.setState({
      hideError: true
    });
  };

  render() {
    const {
      amount,
      mode,
      screenshot,
      month,
      year,
      isStayFee,
      isTrainingFee
    } = this.state.payment;

    const { paymentModes, months, error, selectedFile, hideError } = this.state;

    const { paymentsAuthError, isFetchingPayments } = this.props.payments;

    return (
      <div>
        {isFetchingPayments ? (
          <Loader />
        ) : (
          <>
            {paymentsAuthError || error ? (
              <Alert
                text={paymentsAuthError || error}
                className="is-danger"
                hideError={hideError}
                hideErrorHandler={this.hideErrorHandler}
              />
            ) : null}
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
                    <div className="file has-name ">
                      <label className="file-label">
                        <input
                          className="file-input"
                          type="file"
                          name="screenshot"
                          ref={this.fileInput}
                          onChange={this.handleFileChange}
                          accept="image/png, image/jpg, image/jpeg"
                        />
                        <span className="file-cta">
                          <span className="file-icon">
                            <i className="fas fa-upload"></i>
                          </span>
                          <span className="file-label">Choose a file…</span>
                        </span>
                        <span className="file-name">{selectedFile}</span>
                      </label>
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
          </>
        )}
      </div>
    );
  }
}

export default connect(store => store)(CreatePayment);
