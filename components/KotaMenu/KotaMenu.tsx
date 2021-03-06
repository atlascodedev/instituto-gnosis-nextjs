import { Stack, Box, Theme } from "@material-ui/core";
import { AnimationControls, useAnimation } from "framer-motion";
import React from "react";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoWhatsapp,
} from "react-icons/io";

import { noop } from "../../utility/noop";
import FadeInList from "../FadeInList/FadeInList";
import IconButtonCircle from "../IconButtonCircle/IconButtonCircle";
import ImageCrossfade, {
  ImageCrossfadeProps,
} from "../ImageCrossfade/ImageCrossfade";
import KotaBurguer, { KotaBurguerProps } from "../KotaBurguer/KotaBurguer";
import MotionBox from "../MotionBox";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface KotaMenuProps extends KotaMenuBarProps {
  open: boolean;
  items?: KotaMenuItem[];
  onOpen?: (...args: unknown[]) => void;
  onClose?: (...args: unknown[]) => void;
  onLogoClick: (...args: unknown[]) => void;
}

export const KotaMenu = ({
  ImageCrossFadeProps,
  KotaBurguerProps,
  open,
  items = [],
  onClose = noop,
  onOpen = noop,
  onLogoClick = noop,
}: KotaMenuProps) => {
  const dropdownControls = useAnimation();
  const listControls = useAnimation();
  const socialsControls = useAnimation();
  const [crossfadeState, setCrossfadeState] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (open) {
      (async () => {
        onOpen();
        setCrossfadeState(true);
        await dropdownControls.start("visible");
        await listControls.start("visible");
        socialsControls.start("visible");
      })();
    } else {
      (async () => {
        socialsControls.start("hidden");
        await listControls.start("hidden");
        await dropdownControls.start("hidden");
        setCrossfadeState(false);
        onClose();
      })();
    }
  }, [open, dropdownControls, listControls, socialsControls, onOpen, onClose]);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <KotaMenuBar
        onImageClick={onLogoClick}
        ImageCrossFadeProps={{
          ...ImageCrossFadeProps,
          swap: crossfadeState,
        }}
        KotaBurguerProps={{ ...KotaBurguerProps, open: open }}
      />
      <KotaMenuDropdown animationControls={dropdownControls}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateRows: "1fr 20%",
            gridTemplateColumns: "1fr",
          }}
        >
          <Box
            sx={{ gridRow: "1/3", justifySelf: "center", alignSelf: "center" }}
          >
            <FadeInList
              component={KotaMenuItem}
              list={items}
              customControl={listControls}
              flexDirection="column"
            />
          </Box>
          <MotionBox
            animate={socialsControls}
            initial="hidden"
            sx={{
              display: "flex",
              justifyContent: { xs: "center", lg: "flex-start" },
              width: "100%",
              px: { lg: "4rem" },
            }}
            variants={{
              visible: {
                opacity: 1,
              },
              hidden: {
                opacity: 0,
              },
            }}
          >
            <Stack
              sx={{
                position: "relative",
                pb: "4rem",
              }}
              direction="row"
              gap="2.5rem"
            >
              <IconButtonCircle
                size="small"
                elevation
                href="https://atlascode.dev"
                variant="contained"
                icon={IoLogoFacebook}
              />
              <IconButtonCircle
                size="small"
                elevation
                variant="contained"
                icon={IoLogoInstagram}
              />
              <IconButtonCircle
                size="small"
                elevation
                variant="contained"
                icon={IoLogoWhatsapp}
              />
            </Stack>
          </MotionBox>
        </Box>
      </KotaMenuDropdown>
    </Box>
  );
};

export interface KotaMenuItem {
  label: string;
  action: (...args: unknown[]) => void;
}

const KotaMenuItem = ({ action, label }: KotaMenuItem) => {
  return (
    <Box
      onClick={action}
      sx={{
        color: (theme) => theme.palette.primary.contrastText,
        fontSize: { xs: "4rem", lg: "6.5rem" },
        fontWeight: 800,
        cursor: "pointer",
        textTransform: "uppercase",
        transition: "color 0.5s",
        ":hover": {
          color: (theme) => theme.palette.secondary.main,
        },
      }}
    >
      {label}
    </Box>
  );
};

export interface KotaMenuDropdownProps {
  animationControls?: AnimationControls;
  children?: React.ReactNode;
}

const KotaMenuDropdown = ({
  animationControls,
  children,
}: KotaMenuDropdownProps) => {
  return (
    <MotionBox
      initial="hidden"
      animate={animationControls ? animationControls : "visible"}
      variants={{
        visible: {
          height: "100vh",
        },
        hidden: {
          height: "0px",
        },
      }}
      transitionPreset="gentle"
      sx={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: (theme: Theme) => theme.palette.primary.main,
        zIndex: 800,
      }}
    >
      {children}
    </MotionBox>
  );
};

export interface KotaMenuBarProps {
  ImageCrossFadeProps: ImageCrossfadeProps;
  KotaBurguerProps: KotaBurguerProps;
  onImageClick?: (...args: unknown[]) => void;
}

const KotaMenuBar = ({
  ImageCrossFadeProps,
  KotaBurguerProps,
  onImageClick = noop,
}: KotaMenuBarProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        px: "4rem",
        pt: "4rem",
        zIndex: 900,
        position: "relative",
      }}
    >
      <Box
        onClick={onImageClick}
        sx={{
          cursor: "pointer",
          height: { xs: "5rem", lg: "8rem" },
          width: { xs: "5rem", lg: "8rem" },
        }}
      >
        <ImageCrossfade fitContainer {...ImageCrossFadeProps} />
      </Box>

      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
        <KotaBurguer
          fontSize={{ xs: "0.35rem", lg: "0.5rem" }}
          {...KotaBurguerProps}
        />
      </Box>
    </Box>
  );
};

export default KotaMenu;
