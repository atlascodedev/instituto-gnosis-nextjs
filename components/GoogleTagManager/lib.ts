export interface IWindow extends Window {
  dataLayer: Record<string, any>[];
}

declare let window: IWindow;

export function checkDataLayerExists() {
  return typeof window !== "undefined" && window.dataLayer;
}

export function GTMDataLayerEvent(customEvent: Record<string, unknown>) {
  if (checkDataLayerExists()) {
    window.dataLayer.push(customEvent);
  } else {
    (() => {})();
  }
}

export function GTMDataLayerPageView(url: string) {
  GTMDataLayerEvent({
    event: "pageview",
    page: url,
  });
}
