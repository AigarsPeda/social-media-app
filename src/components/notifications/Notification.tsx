import React, { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// redux
import { RootStateType } from "../../redux/store";
import { connect } from "react-redux";
import { markNotificationsRed } from "../../redux/actions/userAction";

// icons
import NotificationIcon from "../../images/NotificationIcon";
import CancelIcon from "../../images/CancelIcon";
import LikeScreamNotificationIcon from "../../images/LikeScreamNotificationIcon";
import CommentNotificationIcon from "../../images/CommentNotificationIcon";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Notifications: React.FC<Props> = (props) => {
  const { notifications, markNotificationsRed } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setToggle(true);

    const unreadNotificationsId = notifications
      .filter((not) => !not.read)
      .map((not) => not.notificationId);

    // call to db to mark notifications read
    // markNotificationsRed(unreadNotificationsId);
  };

  const handleCancel = () => {
    setToggle(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  const handleOutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;

    if (element.classList.contains("notifications-container")) {
      setToggle(false);
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    }
  };

  const notificationsMarkUp = () => {
    dayjs.extend(relativeTime);
    const unReadNotifications = notifications.filter((not) => {
      return not.read === false;
    });

    if (unReadNotifications.length > 0) {
      return unReadNotifications.map((not) => {
        return (
          <div key={not.notificationId} className="display">
            <span className="icon">
              {not.type === "like" ? (
                <LikeScreamNotificationIcon
                  style={{ fill: not.read ? "black" : "red" }}
                />
              ) : (
                <CommentNotificationIcon
                  style={{ fill: not.read ? "black" : "red" }}
                />
              )}
            </span>
            {console.log(not)}
            <p>
              <Link to={`/users/${not.sender}`}>{not.sender}</Link> added new{" "}
              {not.type} <strong>{dayjs(not.createdAt).fromNow()}</strong>
            </p>
          </div>
        );
      });
    } else {
      return (
        <div>
          <h1>All Notifications are read</h1>
        </div>
      );
    }
  };

  return (
    <div className="notifications">
      <button onClick={handleOpen}>
        <NotificationIcon />
      </button>
      {isOpen && (
        <div className="notifications-container" onClick={handleOutClick}>
          <div
            className={
              toggle
                ? "notifications-display toggleIn"
                : "notifications-display toggleOut"
            }
          >
            <div className="cancel">
              <span onClick={handleCancel}>
                <CancelIcon />
              </span>
            </div>

            {notificationsMarkUp()}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  notifications: state.user.userData.notifications
});

const mapDispatchToProps = { markNotificationsRed };

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
