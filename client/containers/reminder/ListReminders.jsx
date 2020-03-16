import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "../common/Loader";
import { Alert } from "../common/Alert";

import {
	deleteReminderHandler,
	fetchRemindersListHandler
} from "../../actions/reminders";

function ListReminders(props) {
	const {
		isFetchingReminders,
		remindersAuthError,
		reminders
	} = props.reminders;

	const [hideError, setHideError] = useState(remindersAuthError ? false : true);

	useEffect(() => {
		if (!reminders || !reminders.length) {
			props.dispatch(fetchRemindersListHandler());
		}
	}, []);

	const deleteReminder = reminderId => {
		props.dispatch(deleteReminderHandler(reminderId));
	};

	const hideErrorHandler = () => setHideError(true);

	return (
		<div>
			{isFetchingReminders ? (
				<Loader />
			) : (
				<div className="container">
					{remindersAuthError ? (
						<Alert
							text={remindersAuthError}
							className="is-danger"
							hideError={hideError}
							hideErrorHandler={hideErrorHandler}
						/>
					) : null}

					{reminders.length ? (
						reminders.map((reminder, i) => {
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
																	<td>Amount</td>
																	<td>
																		{reminder.amount || "Amount not avilable"}
																	</td>
																</tr>
																<tr>
																	<td>Reminder details</td>
																	<td>
																		{reminder.details ||
																			"details not available"}
																	</td>
																</tr>
																<tr>
																	<td>Reminder mode</td>
																	<td>
																		{reminder.mode || "details not available"}
																	</td>
																</tr>
																<tr>
																	<td>Month of reminder</td>
																	<td>{reminder.month || "not available"}</td>
																</tr>
																<tr>
																	<td>Year of reminder</td>
																	<td>{reminder.year || "not available"}</td>
																</tr>
															</tbody>
														</table>

														{
															// 	<p className="is-size-5">
															// 	Amount: {reminder.amount || "Amount not avilable"}
															// </p>
															// <p className="is-size-5">
															// 	Reminder details :{" "}
															// 	{reminder.details || "details not available"}
															// </p>
															// <p className="is-size-5">
															// 	Reminder mode :{" "}
															// 	{reminder.mode || "details not available"}
															// </p>
															// <p className="is-size-5">
															// 	Month of reminder :{" "}
															// 	{reminder.month || "not available"}
															// </p>
															// <p className="is-size-5">
															// 	Year of reminder :{" "}
															// 	{reminder.year || "not available"}
															// </p>
														}
													</div>
												</div>
												<footer className="card-footer">
													<Link
														to={`/reminders/${reminder._id}/update`}
														className="card-footer-item"
													>
														Edit Reminder
													</Link>
													<a
														className="card-footer-item"
														onClick={() => deleteReminder(reminder._id)}
													>
														Delete Reminder
													</a>
												</footer>
											</div>
										</div>
									</div>
								</div>
							);
						})
					) : (
						<p>No Reminders Found!</p>
					)}
				</div>
			)}
		</div>
	);
}

export default connect(store => store)(ListReminders);
