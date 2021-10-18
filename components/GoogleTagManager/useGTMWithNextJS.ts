import React from "react";
import { useRouter } from "next/router";
import {
  GTMDataLayerEventDispatcher,
  IGTMDataLayerEventDispatcher,
  IWindow,
} from "./GTMDataLayer";

export function useGTMWithNextJSRouter() {
  const router = useRouter();
  const [dataLayer, setDataLayer] =
    React.useState<IGTMDataLayerEventDispatcher>();

  React.useEffect(() => {
    if (
      (typeof window !== "undefined" &&
        (window as unknown as IWindow).dataLayer) ||
      !dataLayer
    ) {
      setDataLayer(new GTMDataLayerEventDispatcher());
    }
  }, []);

  React.useEffect(() => {
    if (dataLayer) {
      router.events.on("routeChangeComplete", dataLayer.pageview);
    }

    return () => {
      if (dataLayer) {
        router.events.off("routeChangeComplete", dataLayer.pageview);
      }
    };
  }, [router.events, dataLayer]);
}
