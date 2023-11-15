import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from '../common/Loader';
import ListStudents from '../students/ListStudents';
import { Alert } from '../common/Alert';

import {
  fetchStudentsListHandler,
  deleteStudentHandler,
} from '../../actions/students';

import { createReminderHandler } from '../../actions/reminders';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideError: true,
    };
  }

  componentDidMount() {
    const { authToken } = localStorage;
    const { students } = this.props.students;

    if (!students || !students.length) {
      if (authToken) {
        this.props.dispatch(fetchStudentsListHandler());
      }
    }
  }

  handlePaymentReminder = (studentId, email) => {
    const { authToken } = localStorage;
    this.setState({ hideError: !this.state.hideError });

    if (authToken) {
      this.props.dispatch(createReminderHandler(studentId, email));
    }
  };

  handelDeleteStudent = (studentId) => {
    this.props.dispatch(deleteStudentHandler(studentId));
  };

  hideErrorHandler = () => {
    this.setState({
      hideError: true,
    });
  };

  render() {
    const { isFetchingStudents, studentsAuthError, students } =
      this.props.students;

    const { hideError } = this.state;

    return (
      <div>
        {isFetchingStudents ? (
          <Loader />
        ) : (
          <div className="container">
            {studentsAuthError ? (
              <Alert
                text={studentsAuthError}
                className="is-danger"
                hideError={hideError}
                hideErrorHandler={this.hideErrorHandler}
              />
            ) : null}
            {students ? (
              <ListStudents
                students={students}
                handlePaymentReminder={this.handlePaymentReminder}
                handelDeleteStudent={this.handelDeleteStudent}
              />
            ) : (
              // students.map((student, i) => {
              //   return (
              //     <div className="container" key={i}>
              //       <div className="columns is-mobile">
              //         <div className="column is-half is-offset-one-quarter">
              //           <div className="card">
              //             <header className="card-header">
              //               <p className="card-header-title is-capitalized is-size-3">
              //                 {student.name}
              //               </p>
              //               <a
              //                 href="#"
              //                 className="card-header-icon"
              //                 aria-label="more options"
              //               >
              //                 <span className="icon">
              //                   <i
              //                     className="fas fa-angle-down"
              //                     aria-hidden="true"
              //                   ></i>
              //                 </span>
              //               </a>
              //             </header>
              //             <div className="card-content">
              //               <div className="media-content">
              //                 <p className="title is-4 is-capitalized is-size-4">
              //                   {student.name}
              //                 </p>
              //                 <p className="subtitle is-5">{student.email}</p>
              //               </div>
              //               <br />
              //               <div className="content">
              //                 <p className="is-size-5">
              //                   Aluminai : {student.isAlumni ? "Yes" : "No"}
              //                 </p>
              //                 <p className="is-size-5">
              //                   Staying in campus :{" "}
              //                   {student.isStayingInCampus ? "Yes" : "No"}
              //                 </p>
              //                 <p className="is-size-5">
              //                   Paid entire Training Fee :{" "}
              //                   {student.hasPaidEntireTrainingFee
              //                     ? "Yes"
              //                     : "No"}
              //                 </p>
              //                 <p className="is-size-5">
              //                   Phone:{" "}
              //                   {student.phoneNumber
              //                     ? student.phoneNumber
              //                     : "Phone Number not avilable"}
              //                 </p>
              //                 <p className="is-size-5">
              //                   Annual Salary :{" "}
              //                   {student.numAnnualSalary
              //                     ? student.numAnnualSalary
              //                     : ""}
              //                 </p>
              //                 <p className="is-size-5">
              //                   Percentage To Be Charged :{" "}
              //                   {student.numPercentageToBeCharged
              //                     ? student.numPercentageToBeCharged + "%"
              //                     : ""}
              //                 </p>
              //                 <p className="is-size-5">
              //                   Minumum amount to be paid :{" "}
              //                   {student.numMinAmtToBePaid
              //                     ? student.numMinAmtToBePaid
              //                     : ""}
              //                 </p>
              //               </div>
              //             </div>
              //             <footer className="card-footer">
              //               <Link
              //                 to=""
              //                 className="card-footer-item"
              //                 onClick={() => {
              //                   this.handlePaymentReminder(
              //                     student._id,
              //                     student.email
              //                   );
              //                 }}
              //               >
              //                 Send reminder
              //               </Link>
              //               <Link
              //                 to={`/students/${student._id}/update`}
              //                 className="card-footer-item"
              //               >
              //                 Edit
              //               </Link>
              //               <a
              //                 className="card-footer-item"
              //                 onClick={() =>
              //                   this.handelDeleteStudent(student._id)
              //                 }
              //               >
              //                 Delete
              //               </a>
              //             </footer>
              //           </div>
              //         </div>
              //       </div>
              //     </div>
              //   );
              // })
              <div>No students found!</div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return store;
};

export default connect(mapStateToProps)(Dashboard);
