import React, { Component } from "react";
import { connect } from "react-redux";
import validator from "validator";
import axios from "axios";

import {
  updateStudentHandler,
  fetchStudentHandler
} from "../../actions/students";

class UpdateStudent extends Component {
  constructor(props) {
    super(props);

    const studentId = window.location.pathname.split("/")[2];
    const { students } = this.props.students;

    this.student = students.reduce((acc, student) => {
      if (student._id === studentId) {
        acc = student;
        return acc;
      }
      return acc;
    }, {});

    this.state = {
      isLoading: false,
      student: {
        name: this.student.name || "",
        email: this.student.email || "",
        phoneNumber: this.student.phoneNumber || "",
        isAlumni: this.student.isAlumni || false,
        isStayingInCampus: this.student.isStayingInCampus || false,
        numAnnualSalary: this.student.numAnnualSalary || "",
        numPercentageToBeCharged: this.student.numPercentageToBeCharged || "",
        numMinAmtToBePaid: this.student.numMinAmtToBePaid || "",
        hasPaidEntireTrainingFee: this.student.hasPaidEntireTrainingFee || false
      }
    };
  }

  componentDidMount = async () => {
    // const {student} = this.state;
    const { authToken } = localStorage;

    const studentId = window.location.pathname.split("/")[2];

    if (!this.student._id) {
      try {
        this.setState(state => ({ isLoading: true }));
        const res = await axios.get("/api/v1/students/" + studentId, {
          headers: {
            authorization: authToken
          }
        });

        const { student } = res.data;

        if (student) {
          this.setState(state => ({
            isLoading: false,
            student: {
              ...state.student,
              name: student.name,
              email: student.email,
              phoneNumber: student.phoneNumber,
              isAlumni: student.isAlumni,
              isStayingInCampus: student.isStayingInCampus,
              numAnnualSalary: student.numAnnualSalary,
              numPercentageToBeCharged: student.numPercentageToBeCharged,
              numMinAmtToBePaid: student.numMinAmtToBePaid,
              hasPaidEntireTrainingFee: student.hasPaidEntireTrainingFee
            }
          }));
        }
      } catch (error) {
        console.log(error, "something went wrong!");
      }
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const studentId = window.location.pathname.split("/")[2];

    const {
      name,
      email,
      phoneNumber,
      isAlumni,
      isStayingInCampus,
      numAnnualSalary,
      numPercentageToBeCharged,
      numMinAmtToBePaid,
      hasPaidEntireTrainingFee
    } = this.state.student;

    if (
      !name ||
      !email ||
      !phoneNumber ||
      !numAnnualSalary ||
      !numPercentageToBeCharged ||
      !numMinAmtToBePaid
    ) {
      return alert("All fields are must.");
    }

    if (!validator.isEmail(email)) {
      return alert("Invalid email.");
    }

    const student = {
      name,
      email,
      phoneNumber: +phoneNumber,
      isAlumni,
      isStayingInCampus,
      numAnnualSalary: +numAnnualSalary,
      numPercentageToBeCharged: +numPercentageToBeCharged,
      numMinAmtToBePaid: +numMinAmtToBePaid,
      hasPaidEntireTrainingFee
    };

    this.props.dispatch(
      updateStudentHandler(studentId, { student }, () => {
        this.props.history.push("/");
      })
    );
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState(state => ({
      student: {
        ...state.student,
        [name]: value
      }
    }));
  };

  handleToggle = e => {
    const { name } = e.target;

    this.setState(state => ({
      student: {
        ...state.student,
        [name]: !state.student[name]
      }
    }));
  };

  render() {
    const isAuthInProgress = this.props.auth.isAuthInProgress;
    const authError = this.props.auth.authError;

    const {
      name,
      email,
      phoneNumber,
      isAlumni,
      isStayingInCampus,
      numAnnualSalary,
      numPercentageToBeCharged,
      numMinAmtToBePaid,
      hasPaidEntireTrainingFee
    } = this.state.student;

    const { isLoading } = this.state;

    return (
      <div className="container">
        {isLoading ? (
          <p>Loading . . . </p>
        ) : (
          <div className="form columns">
            <div className="column is-one-third is-offset-one-third">
              <label className="label">Create student</label>

              <label className="checkbox">
                <input
                  type="checkbox"
                  name="isAlumni"
                  checked={isAlumni}
                  onChange={this.handleToggle}
                />
                Alumni
              </label>

              <br />

              <label className="checkbox">
                <input
                  type="checkbox"
                  name="hasPaidEntireTrainingFee"
                  checked={hasPaidEntireTrainingFee}
                  onChange={this.handleToggle}
                />
                Paid Entire Training Fee
              </label>

              <br />

              <label className="checkbox">
                <input
                  type="checkbox"
                  name="isStayingInCampus"
                  checked={isStayingInCampus}
                  onChange={this.handleToggle}
                />
                Staying In Campus
              </label>

              <br />

              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    onChange={this.handleChange}
                    className="input"
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Text input"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    onChange={this.handleChange}
                    className="input"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Text input"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Phone</label>
                <div className="control">
                  <input
                    onChange={this.handleChange}
                    className="input"
                    type="number"
                    name="phoneNumber"
                    value={phoneNumber}
                    placeholder="Text input"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Annual Salary</label>
                <div className="control">
                  <input
                    onChange={this.handleChange}
                    className="input"
                    type="number"
                    name="numAnnualSalary"
                    value={numAnnualSalary}
                    placeholder="e.g. 50000"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Percentage To Be Charged</label>
                <div className="control">
                  <input
                    onChange={this.handleChange}
                    className="input"
                    type="number"
                    name="numPercentageToBeCharged"
                    value={numPercentageToBeCharged}
                    placeholder="e.g. 7000"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Minimum Amount To Be Paid</label>
                <div className="control">
                  <input
                    onChange={this.handleChange}
                    className="input"
                    type="number"
                    name="numMinAmtToBePaid"
                    value={numMinAmtToBePaid}
                    placeholder="e.g. 100000"
                  />
                </div>
              </div>

              <button onClick={this.handleSubmit} className="button is-info">
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(store => store)(UpdateStudent);
