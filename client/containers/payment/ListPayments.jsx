import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  deletePaymentHandler,
  fetchPaymentsListHandler
} from "../../actions/payments";

function ListPayments(props) {
  useEffect(() => {
    props.dispatch(fetchPaymentsListHandler());
  }, []);

  return (
    <div className="container">
      {props.payments.isFetchingPayments ? <p>Loading....</p> : null}
      {props.reminders.paymentsAuthError ? (
        <p>{props.reminders.paymentsAuthError}</p>
      ) : null}
      {props.payments.payments.length ? (
        props.payments.payments.map((payment, i) => {
          return (
            <div key={i}>
              <div className="columns is-mobile">
                <div className="column is-half is-offset-one-quarter">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        <p className="is-size-5">
                          Is StayFee : {payment.isStayFee ? "Yes" : "No"}
                        </p>
                        <p className="is-size-5">
                          Is Training Fee :
                          {payment.isTrainingFee ? "Yes" : "No"}
                        </p>
                        <p className="is-size-5">
                          Amount: {payment.amount || "Amount not avilable"}
                        </p>
                        <p className="is-size-5">
                          Mode of payment : {payment.mode || "not available"}
                        </p>
                        <p className="is-size-5">
                          Month of payment : {payment.month || "not available"}
                        </p>
                        <p className="is-size-5">
                          Year of payment : {payment.year || "not available"}
                        </p>
                      </div>
                    </div>
                    <footer className="card-footer">
                      <Link
                        to={`/payments/${payment._id}/update`}
                        className="card-footer-item"
                      >
                        Edit
                      </Link>
                      <a
                        className="card-footer-item"
                        onClick={() => deletePaymentHandler(payment._id)}
                      >
                        Delete
                      </a>
                    </footer>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No payment data found...</p>
      )}
    </div>
  );
}

export default connect(store => store)(ListPayments);
