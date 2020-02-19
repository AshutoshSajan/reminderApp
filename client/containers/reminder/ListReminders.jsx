import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function ListReminders() {
  const { authToken } = localStorage;
  const [loading, setLoading] = useState(false);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/v1/reminders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: authToken
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, "reminders data...");
        setReminders(data.reminders);
        setLoading(false);
      });
    return () => {
      console.log("cleanup called...");
    };
  }, []);

  const deleteReminderHandler = () => {
    console.log("deleteReminderHandler called...");
  };

  return (
    <div>
      {loading ? <p>Loading. . . </p> : null}

      {reminders.length ? (
        reminders.map((reminder, i) => {
          return (
            <div className="container" key={i}>
              <div className="columns is-mobile">
                <div className="column is-half is-offset-one-quarter">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        <p className="is-size-5">
                          Amount: {reminder.amount || "Amount not avilable"}
                        </p>
                        <p className="is-size-5">
                          Reminder details :{" "}
                          {reminder.details || "details not available"}
                        </p>
                        <p className="is-size-5">
                          Reminder mode :{" "}
                          {reminder.mode || "details not available"}
                        </p>
                        <p className="is-size-5">
                          Month of reminder :{" "}
                          {reminder.month || "not available"}
                        </p>
                        <p className="is-size-5">
                          Year of reminder : {reminder.year || "not available"}
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
                        to={`/students/${reminder._id}/update`}
                        className="card-footer-item"
                      >
                        Edit
                      </Link>
                      <a
                        className="card-footer-item"
                        onClick={deleteReminderHandler(reminder._id)}
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
        <p>No reminder found...</p>
      )}
    </div>
  );
}

export default connect(store => store)(ListReminders);
