import React, { useState } from "react";
function NotificationBox() {
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  // Example function to trigger a notification
  const triggerNotification = () => {
    setNotificationOpen(true);
  };

  return (
    <div>
      {/* Your chat component content */}
      <button onClick={triggerNotification}>Show Notification</button>

      {/* Notification Box */}
      <NotificationBox
        open={notificationOpen}
        onClose={handleNotificationClose}
        message="This is a notification message!"
        severity="success"
      />
    </div>
  );
}

export default NotificationBox;
