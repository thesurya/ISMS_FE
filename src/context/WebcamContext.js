import { createContext, useState, useEffect } from "react";
export const UserContext = createContext({
  display_webcam: {},
  set_display_webcam() {},
  sm_value: {},
  set_sm_value() {},
  show_spinner: {},
  set_show_spinner() {},
  show_Success_alert: {},
  set_show_Success_alert() {},
  show_Warning_alert: {},
  set_show_Warning_alert() {},
  warning_alert_message: {},
  set_warning_alert_message() {},
  show_add_details_btn: {},
  set_show_add_details_btn() {},
});

export const UserContextProvider = ({ children }) => {
  const [display_webcam, set_display_webcam] = useState(true);
  const [sm_value,set_sm_value] = useState(8);
  const [show_spinner, set_show_spinner] = useState(false);
  const [show_Success_alert, set_show_Success_alert] = useState(false);
  const [show_Warning_alert, set_show_Warning_alert] = useState(false);
  const [warning_alert_message, set_warning_alert_message] = useState(null);
  const [show_add_details_btn, set_show_add_details_btn] = useState(false);
  const value = {
    display_webcam,
    set_display_webcam,
    sm_value,
    set_sm_value,
    show_spinner,
    set_show_spinner,
    show_Success_alert,
    set_show_Success_alert,
    show_Warning_alert,
    set_show_Warning_alert,
    warning_alert_message,
    set_warning_alert_message,
    show_add_details_btn,
    set_show_add_details_btn,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
