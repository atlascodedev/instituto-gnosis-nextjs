interface IWindow extends Window {
  dataLayer: Record<string, any>[];
}

declare let window: IWindow;

export interface IGTMDataLayer {
  readonly DataLayer: typeof window["dataLayer"] | [];
}

export interface IGTMDataLayerEventDispatcher {
  pageview: (url: string) => void;
  custom: (customEvent: { [Key: string]: any }) => void;
}

abstract class GTMDataLayer implements IGTMDataLayer {
  DataLayer =
    typeof window !== "undefined" && window.dataLayer ? window.dataLayer : [];
}

export class GTMDataLayerEventDispatcher
  extends GTMDataLayer
  implements IGTMDataLayerEventDispatcher
{
  public pageview(url: string) {
    this.DataLayer.push({
      event: "pageview",
      page: url,
    });
  }

  public custom(customEvent: { [Key: string]: any }) {
    this.DataLayer.push(customEvent);
  }
}
