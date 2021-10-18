export interface IWindow extends Window {
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

export class GTMDataLayerEventDispatcher
  implements IGTMDataLayerEventDispatcher
{
  public pageview(url: string) {
    window.dataLayer.push({
      event: "pageview",
      page: url,
    });

    console.log("pushed pageview");
  }

  public custom(customEvent: { [Key: string]: any }) {
    window.dataLayer.push(customEvent);
  }
}
