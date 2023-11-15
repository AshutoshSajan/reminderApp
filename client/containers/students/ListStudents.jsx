import React from 'react';
import { Link } from 'react-router-dom';

export default function ListStudents(props) {
  const { students, handlePaymentReminder, handelDeleteStudent } = props;

  return (
    <div>
      {students.map((student, i) => {
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
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </a>
                  </header>
                  <div className="card-content">
                    <div className="media-content">
                      <p className="is-4 is-capitalized is-size-4">
                        Name : {student.name}
                      </p>
                      <p className="subtitle is-5">Email : {student.email}</p>
                    </div>
                    <br />

                    <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                      <tbody>
                        <tr>
                          <td>Aluminai</td>
                          <td>{student.isAlumni ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                          <td>Staying in campus</td>
                          <td>{student.isStayingInCampus ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                          <td>Paid entire Training Fee</td>
                          <td>
                            {student.hasPaidEntireTrainingFee ? 'Yes' : 'No'}
                          </td>
                        </tr>
                        <tr>
                          <td>Phone</td>
                          <td>
                            {student.phoneNumber
                              ? student.phoneNumber
                              : 'Phone Number not avilable'}
                          </td>
                        </tr>
                        <tr>
                          <td>Annual Salary</td>
                          <td>
                            {student.numAnnualSalary
                              ? student.numAnnualSalary
                              : ''}
                          </td>
                        </tr>
                        <tr>
                          <td>Percentage To Be Charged</td>
                          <td>
                            {student.numPercentageToBeCharged
                              ? student.numPercentageToBeCharged + '%'
                              : ''}
                          </td>
                        </tr>

                        <tr>
                          <td>Minumum amount to be paid</td>
                          <td>
                            {student.numMinAmtToBePaid
                              ? student.numMinAmtToBePaid
                              : ''}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <footer className="card-footer">
                    <Link
                      to=""
                      className="card-footer-item"
                      onClick={() => {
                        handlePaymentReminder(student._id, student.email);
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
                      onClick={() => handelDeleteStudent(student._id)}
                    >
                      Delete
                    </a>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
