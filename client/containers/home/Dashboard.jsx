import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchStudentsList,
  handelDeleteStudent,
  paymentReminderHandler
} from "../../actions";
import Header from "../common/Header";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { authToken } = localStorage;
    if (authToken) {
      this.props.dispatch(fetchStudentsList());
    }
  }

  handlePaymentReminder = (id, email) => {
    const { authToken } = localStorage;
    if (authToken) {
      this.props.dispatch(paymentReminderHandler(id, email));
    }
  };
  deleteStudentHandler = id => {
    const { authToken } = localStorage;
    if (authToken) {
      this.props.dispatch(handelDeleteStudent(id));
    }
  };

  render() {
    const { isFetchinglist, list } = this.props.students;

    return (
      <div>
        <div className="container">
          {isFetchinglist ? (
            <div>Loading . . .</div>
          ) : list ? (
            list.map((student, i) => {
              return (
                <div className="container" key={i}>
                  <div className="columns is-mobile">
                    <div className="column is-half is-offset-one-quarter">
                      <div className="card">
                        <header className="card-header">
                          <p className="card-header-title is-capitalized is-size-3">
                            {student.name}
                          </p>
                          <a
                            href="#"
                            className="card-header-icon"
                            aria-label="more options"
                          >
                            <span className="icon">
                              <i
                                className="fas fa-angle-down"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </a>
                        </header>
                        <div className="card-content">
                          <div className="media-content">
                            <p className="title is-4 is-capitalized is-size-4">
                              {student.name}
                            </p>
                            <p className="subtitle is-5">{student.email}</p>
                          </div>
                          <br />
                          <div className="content">
                            <p className="is-size-5">
                              Aluminai : {student.isAlumni ? "Yes" : "No"}
                            </p>
                            <p className="is-size-5">
                              Staying in campus :{" "}
                              {student.isStayingInCampus ? "Yes" : "No"}
                            </p>
                            <p className="is-size-5">
                              Paid entire Training Fee :{" "}
                              {student.hasPaidEntireTrainingFee ? "Yes" : "No"}
                            </p>
                            <p className="is-size-5">
                              Phone:{" "}
                              {student.phoneNumber
                                ? student.phoneNumber
                                : "Phone Number not avilable"}
                            </p>
                            <p className="is-size-5">
                              Annual Salary :{" "}
                              {student.numAnnualSalary
                                ? student.numAnnualSalary
                                : ""}
                            </p>
                            <p className="is-size-5">
                              Percentage To Be Charged :{" "}
                              {student.numPercentageToBeCharged
                                ? student.numPercentageToBeCharged + "%"
                                : ""}
                            </p>
                            <p className="is-size-5">
                              Minumum amount to be paid :{" "}
                              {student.numMinAmtToBePaid
                                ? student.numMinAmtToBePaid
                                : ""}
                            </p>
                          </div>
                        </div>
                        <footer className="card-footer">
                          <Link
                            to=""
                            className="card-footer-item"
                            onClick={() => {
                              this.handlePaymentReminder(
                                student._id,
                                student.email
                              );
                            }}
                          >
                            Send reminder
                          </Link>
                          <Link
                            to={`/students/${student._id}/update`}
                            className="card-footer-item"
                          >
                            Edit
                          </Link>
                          <a
                            className="card-footer-item"
                            onClick={() =>
                              this.deleteStudentHandler(student._id)
                            }
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
            <div>No students found!</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return store;
};

export default connect(mapStateToProps)(Dashboard);
