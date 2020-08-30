import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { ListGroupItem, Modal, ListGroup, Button } from "react-bootstrap";
import { getLastActive, isToday, displayTime } from "../../utils/date";
import { Error } from "../network_state/Message";
import createEvent from "../../utils/calender_event";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MemberList.css";

function MemberItem(props) {
  const [shouldShowModal, updateShouldShowModal] = useState(false);

  const [showCalendar, toggleShowCallendar] = useState(false);

  const activityList = props.activities.map((activity, index) =>
    createEvent(index, activity, props.name, props.timeZone)
  );

  const todaysActivities = activityList.filter(
    (activity) => isToday(activity.start) || isToday(activity.end)
  );

  const showModal = () => updateShouldShowModal(true);
  const hideModal = () => updateShouldShowModal(false);

  function showLastActiveDate() {
    const activitiesLength = props.activities.length;
    return activitiesLength
      ? getLastActive(props.activities[activitiesLength - 1], props.timeZone)
      : null;
  }

  function renderToggleCalendarButton() {
    return (
      <div className="calendar-toggle-button">
        <Button onClick={() => toggleShowCallendar(!showCalendar)}>
          {showCalendar ? "Hide Calendar" : "Show Calendar"}
        </Button>
      </div>
    );
  }

  function renderListItem() {
    return (
      <ListGroupItem className="member-list" onClick={showModal}>
        <div className="section">{props.name}</div>
        <div className="section last-seen">
          <div>Last seen</div>
          <b>{showLastActiveDate() ?? "N/A"}</b>
        </div>
      </ListGroupItem>
    );
  }

  function renderActivityItem() {
    return todaysActivities.map((activity) => (
      <ListGroupItem key={activity.id}>
        <span>{props.name}</span>
        <p>{`${displayTime(activity.start)} - ${displayTime(activity.end)}`}</p>
      </ListGroupItem>
    ));
  }

  function renderCalendar() {
    return (
      <Calendar
        showMultiDayTimes
        localizer={momentLocalizer(moment)}
        defaultDate={new Date()}
        scrollToTime={new Date()}
        defaultView="day"
        events={activityList}
        style={{
          height: "70vh",
          width: "100%",
        }}
      ></Calendar>
    );
  }

  return (
    <React.Fragment>
      {renderListItem()}
      <Modal
        show={shouldShowModal}
        onHide={hideModal}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{`${props.name}'s Activity`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderToggleCalendarButton()}
          {!showCalendar ? (
            <ListGroup variant="flush">
              {!activityList.length ? (
                <Error message={`${props.name} has no activity records.`} />
              ) : !todaysActivities.length ? (
                <Error
                  message={`${props.name} has no activity records for today.`}
                />
              ) : (
                renderActivityItem()
              )}
            </ListGroup>
          ) : (
            renderCalendar()
          )}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default MemberItem;
