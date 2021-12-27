import { Box, useTheme } from "@material-ui/core";
import { useRouter } from "next/router";
import { ModernCleanMenu } from "@atlascode/core";
import React from "react";
import { contactDialogStore } from "../GlobalContactDialog/store";
import { handleMenuClick } from "../../utility/handleMenuClick";
import scrollToElem, { smoothScrollTo } from "../../utility/scrollToElem";
import { KotaMenuItem, KotaMenu } from "../KotaMenu/KotaMenu";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderProps {}

const Header = (props: HeaderProps) => {
  const router = useRouter();

  const handleLogoClick = async () => {
    if (router.asPath === "/") {
      smoothScrollTo(0, 250);
    } else {
      await router.push("/");
      // scrollToElem("#top");
      console.log("clicked");
    }
  };

  const items: KotaMenuItem[] = [
    {
      label: "Cursos",
      action: () => {
        handleMenuClick(router, "#courses_section");
        setMenuState(false);
      },
    },
    {
      label: "Contato",
      action: () => {
        handleMenuClick(router, "#contact_form");
        setMenuState(false);
      },
    },
  ];
  const [menuState, setMenuState] = React.useState<boolean>(false);
  const theme = useTheme();
  const mobileHeaderRef = React.useRef<HTMLElement>(null);
  const desktopHeaderRef = React.useRef<HTMLElement>(null);

  const contactStore = contactDialogStore((state) => state.openDialog);

  return (
    <React.Fragment>
      <Box
        ref={mobileHeaderRef}
        sx={{
          display: { xs: "block", lg: "none" },
          width: "100%",
          position: "fixed",
          zIndex: 9999,
        }}
      >
        <KotaMenu
          onLogoClick={async () => await handleLogoClick()}
          onOpen={() => setMenuState(true)}
          onClose={() => setMenuState(false)}
          {...{
            open: menuState,
            ImageCrossFadeProps: {
              primaryImage: "/images/gnosis-logo-blue.svg",
              secondaryImage: "/images/gnosis-logo-white.svg",
            },
            KotaBurguerProps: {
              colorOpen: "#fff",
              colorClosed: theme.palette.primary.main,
              onClick: () => setMenuState((prevState) => !prevState),
            },
            items: items.map((value, index) => {
              return { action: value.action, label: value.label };
            }),
          }}
        />
      </Box>
      <Box
        ref={desktopHeaderRef}
        sx={{
          display: {
            xs: "none",
            lg: "block",
            position: "fixed",
            width: "100%",
            zIndex: 500,
          },
        }}
      >
        <ModernCleanMenu
          onLogoClick={async () => await handleLogoClick()}
          ButtonProps={{
            children: "Contate-nos",
            variant: "outlined",
            onClick: contactStore,
          }}
          logo={"/images/gnosis-logo-blue.svg"}
          items={items.map((value, index) => {
            return { onClick: value.action, label: value.label };
          })}
        />
      </Box>
    </React.Fragment>
  );
};

export default Header;
