import { Box, useTheme } from "@material-ui/core";
import _ from "lodash";
import { useRouter } from "next/dist/client/router";
import {
  isBrowser,
  KotaMenu,
  ModernCleanMenu,
  useScrollbarContext,
} from "@atlascode/core";
import React from "react";
import { contactDialogStore } from "../GlobalContactDialog/store";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderProps {}

const Header = (props: HeaderProps) => {
  const { scrollIntoView, scrollTop } = useScrollbarContext();
  const { asPath, push } = useRouter();

  const handleScrollIntoView = (callback: (...args: unknown[]) => void) => {
    if (asPath !== "/") {
      push("/");
    } else {
      callback();
    }
  };

  const handleLogoClick = () => {
    if (asPath !== "/") {
      push("/");
    } else {
      scrollTop(1500);
    }
  };
  const items = [
    {
      action: () =>
        handleScrollIntoView(() => {
          scrollIntoView("#courses_section");
          setMenuState(false);
        }),
      label: "Cursos",
    },
    {
      action: () => {
        handleScrollIntoView(() => scrollIntoView("#contact_form"));
        setMenuState(false);
      },
      label: "Contato",
    },
  ];
  const [menuState, setMenuState] = React.useState<boolean>(false);
  const theme = useTheme();
  const mobileHeaderRef = React.useRef<HTMLElement>(null);
  const desktopHeaderRef = React.useRef<HTMLElement>(null);

  const { scrollbarInstance, disableScroll, enableScroll } =
    useScrollbarContext();

  React.useEffect(() => {
    if (isBrowser) {
      scrollbarInstance?.addListener((status) => {
        const offset = status.offset;

        mobileHeaderRef!.current!.style.top = offset.y + "px";
        desktopHeaderRef!.current!.style.top = offset.y + "px";
      });
    }
  }, [scrollbarInstance]);

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
          onOpen={disableScroll}
          onClose={enableScroll}
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
            zIndex: 1000,
          },
        }}
      >
        <ModernCleanMenu
          onLogoClick={handleLogoClick}
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
