import { logEvent } from "firebase/analytics";

import { analytics } from "./index";

export const logAnalyticsEvent = (eventName, eventParams) => {
  logEvent(analytics, eventName, eventParams);
};
