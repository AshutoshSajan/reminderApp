import React, { Component } from "react";
import { connect } from "react-redux";
import validator from "validator";

import Loader from "../common/Loader";
import { Alert } from "../common/Alert";

import { createStudentHandler } from "../../actions/students";
import { isValidPhoneNumber } from "../../utils/helper";

class CreateStudent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			student: {
				name: "",
				email: "",
				phoneNumber: "",
				isAlumni: false,
				isStayingInCampus: false,
				numAnnualSalary: "",
				numPercentageToBeCharged: "",
				numMinAmtToBePaid: "",
				hasPaidEntireTrainingFee: false
			},
			error: "",
			hideError: true
		};
	}

	handleSubmit = e => {
		e.preventDefault();
		const { error, hideError } = this.state;

		if (!error) {
			this.setState({ hideError: true });
		}

		if (hideError) {
			this.setState({ hideError: !hideError });
		}

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

		if (!name && !email && !isValidPhoneNumber(phoneNumber)) {
			return this.setState({ error: "All fields are required" });
		}

		if (!name) {
			return this.setState({ error: "name required" });
		}

		if (!validator.isEmail(email)) {
			return this.setState({ error: "Invalid email address" });
		}

		if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
			return this.setState({ error: "Invalid phone number" });
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
			createStudentHandler({ student }, () => {
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

	hideErrorHandler = () => {
		this.setState({
			hideError: true
		});
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

		const { error, hideError } = this.state;

		return (
			<div>
				{isAuthInProgress ? (
					<Loader />
				) : (
					<>
						{authError || error ? (
							<Alert
								text={authError || error}
								className="is-danger"
								hideErrorHandler={this.hideErrorHandler}
								hideError={hideError}
							/>
						) : null}
						<div className="container">
							<div className="form columns">
								<div className="column is-one-third is-offset-one-third">
									<label className="label">Create student</label>
									<br />
									<div className="field">
										<label className="checkbox">
											<input
												type="checkbox"
												name="isAlumni"
												checked={isAlumni}
												onChange={this.handleToggle}
											/>
											Alumni
										</label>
									</div>

									<div className="field">
										<label className="checkbox">
											<input
												type="checkbox"
												name="hasPaidEntireTrainingFee"
												checked={hasPaidEntireTrainingFee}
												onChange={this.handleToggle}
											/>
											Paid Entire Training Fee
										</label>
									</div>

									<div className="field">
										<label className="checkbox">
											<input
												type="checkbox"
												name="isStayingInCampus"
												checked={isStayingInCampus}
												onChange={this.handleToggle}
											/>
											Staying In Campus
										</label>
									</div>

									<div className="field">
										<label className="label">Name</label>
										<div className="control">
											<input
												onChange={this.handleChange}
												className="input"
												type="text"
												name="name"
												value={name}
												placeholder="e.g Jhon Doe"
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
												placeholder="e.g example@gmail.com"
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
												placeholder="e.g 7833915629"
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
												placeholder="e.g. 15"
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

									<button
										onClick={this.handleSubmit}
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

const mapStateToProps = store => {
	return store;
};

export default connect(mapStateToProps)(CreateStudent);
