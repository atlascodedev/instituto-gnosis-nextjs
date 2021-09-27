import { AtlasStylesheet } from "../../utility/stylesheet";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { SvgIcon, BoxProps } from "@material-ui/core";
import { WhatsApp } from "@material-ui/icons";
import React from "react";
import MotionBox from "../MotionBox";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WhatsAppButtonProps extends BoxProps {
  color?: "primary" | "secondary";
}

export const WhatsAppButton = ({
  color = "primary",
  sx,
  style = {},
  onClick,
  ...rest
}: WhatsAppButtonProps) => {
  const [hovered, setHovered] = React.useState<boolean>(false);

  const styles = React.useMemo(() => stylesClass(color), [color]);

  return (
    <AnimateSharedLayout>
      <MotionBox
        onClick={onClick}
        sx={{ ...styles.root, ...sx }}
        style={style}
        layout
        transition={{ type: "keyframes" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <MotionBox sx={styles.container} layout transition={{ type: "just" }}>
          <AnimatePresence>
            {hovered && (
              <MotionBox
                sx={styles.title}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1] }}
                exit={{ opacity: 0 }}
              >
                Fale conosco
              </MotionBox>
            )}
          </AnimatePresence>
          <MotionBox
            sx={styles.iconContainer}
            layout
            transition={{ type: "just" }}
          >
            <SvgIcon component={WhatsApp} />
          </MotionBox>
        </MotionBox>
      </MotionBox>
    </AnimateSharedLayout>
  );
};

const stylesClass = (color: "primary" | "secondary" = "primary") =>
  AtlasStylesheet.create({
    root: {
      position: "fixed",
      bottom: (theme) => theme.spacing(1),
      left: (theme) => theme.spacing(0),
      width: "auto",
      color: (theme) => theme.palette[color].contrastText,
      bgcolor: (theme) => theme.palette[color].main,
      borderRadius: "0px 10px 10px 0px",
      cursor: "pointer",
      fontSize: { xs: "10px", lg: "10px" },
    },

    container: {
      display: "flex",
      height: "100%",
      padding: "10px 0px",
    },

    title: {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "1.625em",
      display: "flex",
      padding: "0px 20px",
      alignItems: "center",
      textAlign: "center",
      whiteSpace: "nowrap",
    },

    iconContainer: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100%",
      padding: "0px 15px 0px 15px",

      ".MuiSvgIcon-root": {
        fill: (theme) => theme.palette[color].contrastText,
        fontSize: "3em",
      },
    },
  });

export default WhatsAppButton;
