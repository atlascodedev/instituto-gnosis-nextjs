import React from "react";
import { useRouter } from "next/router";
import { GTMDataLayerPageView } from "./lib";

export function useGTMWithNextJSRouter() {
  const router = useRouter();

  React.useEffect(() => {
    router.events.on("routeChangeComplete", GTMDataLayerPageView);

    return () => {
      router.events.off("routeChangeComplete", GTMDataLayerPageView);
    };
  }, [router.events]);
}
