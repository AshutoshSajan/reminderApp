import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../common/Loader';
import { Alert } from '../common/Alert';

import {
  deletePaymentHandler,
  fetchPaymentsListHandler,
} from '../../actions/payments';

function ListPayments(props) {
  const { isFetchingPayments, paymentsAuthError, payments } = props.payments;

  const [error, setHideError] = useState(paymentsAuthError ? false : true);

  useEffect(() => {
    if (!payments.length) {
      props.dispatch(fetchPaymentsListHandler());
    }
  }, []);

  const deletePayment = (paymentId) => {
    props.dispatch(deletePaymentHandler(paymentId));
  };

  const hideErrorHandler = () => {
    setHideError(true);
  };

  return (
    <div className="container">
      {isFetchingPayments ? (
        <Loader />
      ) : (
        <>
          {paymentsAuthError ? (
            <Alert
              text={paymentsAuthError}
              className="is-danger"
              hideError={error}
              hideErrorHandler={hideErrorHandler}
            />
          ) : null}
          {payments.length ? (
            payments.map((payment, i) => {
              if (!payment) return null;
              return (
                <div key={i}>
                  <div className="columns is-mobile">
                    <div className="column is-half is-offset-one-quarter">
                      <div className="card">
                        <div className="card-content">
                          <div className="content">
                            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                              <tbody>
                                <tr>
                                  <td>Is StayFee</td>
                                  <td>{payment.isStayFee ? 'Yes' : 'No'}</td>
                                </tr>
                                <tr>
                                  <td>Is Training Fee</td>
                                  <td>
                                    {!payment
                                      ? null
                                      : payment.isTrainingFee
                                        ? 'Yes'
                                        : 'No'}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Amount</td>
                                  <td>
                                    {payment.amount || 'Amount not avilable'}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Mode of payment</td>
                                  <td>{payment.mode || 'not available'}</td>
                                </tr>
                                <tr>
                                  <td>Month of payment</td>
                                  <td>{payment.month || 'not available'}</td>
                                </tr>

                                <tr>
                                  <td>Year of payment</td>
                                  <td>{payment.year || 'not available'}</td>
                                </tr>

                                <tr>
                                  <td>Month of payment : </td>
                                  <td>{payment.month || 'not available'}</td>
                                </tr>

                                <tr>
                                  <td>Screenshot</td>
                                  <td>
                                    <img
                                      src={payment.screenshot || ''}
                                      alt="screenshot"
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            {
                              // <p className="is-size-5">
                              // 	Is StayFee : {payment.isStayFee ? "Yes" : "No"}
                              // </p>
                              // <p className="is-size-5">
                              // 	Is Training Fee :
                              // 	{!payment
                              // 		? null
                              // 		: payment.isTrainingFee
                              // 		? "Yes"
                              // 		: "No"}
                              // </p>
                              // <p className="is-size-5">
                              // 	Amount:{" "}
                              // 	{!payment
                              // 		? null
                              // 		: payment.amount || "Amount not avilable"}
                              // </p>
                              // <p className="is-size-5">
                              // 	Mode of payment :{" "}
                              // 	{payment.mode || "not available"}
                              // </p>
                              // <p className="is-size-5">
                              // 	Month of payment :{" "}
                              // 	{payment.month || "not available"}
                              // </p>
                              // <p className="is-size-5">
                              // 	Year of payment :{" "}
                              // 	{payment.year || "not available"}
                              // </p>
                              // {payment.screenshot ? (
                              // 	<div>
                              // 		<p>Screenshot</p>
                              // 		<img
                              // 			src={payment.screenshot || ""}
                              // 			alt="screenshot"
                              // 		/>
                              // 	</div>
                              // ) : null}
                            }
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
                            onClick={() => deletePayment(payment._id)}
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
        </>
      )}
    </div>
  );
}

export default connect((store) => store)(ListPayments);
