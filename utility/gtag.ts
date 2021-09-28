const GTAG_ID = "UA-199282503-1";

export const pageview = (url: string) => {
  (window as any).gtag("config", GTAG_ID, {
    page_path: url,
  });
};

type AnalyticsEvent = {
  action: string;
  category: string;
  label: string;
  value: string;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: AnalyticsEvent) => {
  (window as any).gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
