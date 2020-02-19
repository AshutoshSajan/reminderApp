import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function ListPayments() {
  const { authToken } = localStorage;
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/v1/payments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: authToken
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, "payments data...");
        setPayments(data.payments);
        setLoading(false);
      });
    return () => {
      console.log("cleanup called...");
    };
  }, []);

  const deletePaymentHandler = () => {};

  return (
    <div>
      {loading ? <p>Loading....</p> : null}

      {payments.length ? (
        payments.map((payment, i) => {
          return (
            <div className="container" key={i}>
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
                      {/* <Link
                        to=""
                        className="card-footer-item"
                        onClick={() => {}}
                      >
                        Send reminder
                      </Link> */}
                      <Link
                        to={`/students/${payment._id}/update`}
                        className="card-footer-item"
                      >
                        Edit
                      </Link>
                      <a
                        className="card-footer-item"
                        onClick={deletePaymentHandler(payment._id)}
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
