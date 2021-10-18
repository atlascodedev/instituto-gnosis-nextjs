import React from "react";
import GTMScriptInject, { GTMScriptInjectProps } from "./GTMScriptInject";
import { useGTMWithNextJSRouter } from "./useGTMWithNextJS";

const GoogleTagManager = ({
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

export default GoogleTagManager;
