import React from "react";
import { useRouter } from "next/router";
import { GTMDataLayerEventDispatcher } from "./GTMDataLayer";

export function useGTMWithNextJSRouter() {
  const router = useRouter();

  const dataLayer = new GTMDataLayerEventDispatcher();

  React.useEffect(() => {
    router.events.on("routeChangeComplete", dataLayer.pageview);
    return () => {
      router.events.off("routeChangeComplete", dataLayer.pageview);
    };
  }, [router.events]);
}
