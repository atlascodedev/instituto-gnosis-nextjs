import React from "react";
import GTMScriptInject, { GTMScriptInjectProps } from "./GTMScriptInject";
import { useGTMWithNextJSRouter } from "./useGTMWithNextJS";

export const GoogleTagManagerAfterInteractive = ({
  children,
  GTM_ID,
}: { children?: React.ReactNode } & Pick<GTMScriptInjectProps, "GTM_ID">) => {
  useGTMWithNextJSRouter();

  return (
    <React.Fragment>
      <GTMScriptInject GTM_ID={GTM_ID} />
      {children}
    </React.Fragment>
  );
};

export const GoogleTagManagerBeforeInteractive = ({
  GTM_ID,
}: Pick<GTMScriptInjectProps, "GTM_ID">) => {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      ></iframe>
    </noscript>
  );
};
