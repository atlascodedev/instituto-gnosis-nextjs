import { generateCSSFilter, useScrollbarContext } from "@atlascode/core";
import {
  Box,
  useTheme,
  useMediaQuery,
  ButtonProps,
  Typography,
  Button,
  Container,
} from "@material-ui/core";
import React from "react";
import Image from "next/image";
import styles from "./style";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeroScreenProps
  extends Omit<HeroScreenWhiteDotsProps, "desktopPicture" | "picture"> {}

const HeroScreen = (props: HeroScreenProps) => {
  return <HeroScreenWhiteDots {...props} />;
};

export default HeroScreen;

/* eslint-disable-next-line */
export interface HeroScreenWhiteDotsProps {
  patternColor?: string;
  patternSize?: string;
  backgroundColor?: string;
  blobColor?: "primary" | "secondary";
  buttonVariant?: ButtonProps["variant"];
  ctaCallback?: (...args: unknown[]) => void;
  ctaLabel?: string;
}

export function HeroScreenWhiteDots({
  patternColor = "#bbbbbb60",
  patternSize = "1px",
  backgroundColor = "#fff",
  blobColor = "secondary",
  buttonVariant = "contained",
  ctaCallback,
  ctaLabel = "Call to action",
}: HeroScreenWhiteDotsProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [blobFilter, setBlobFilter] = React.useState<string>("none");

  React.useEffect(() => {
    const filterResult = generateCSSFilter(theme.palette[blobColor].main);

    setBlobFilter(filterResult);
  }, [blobColor, theme.palette]);

  return (
    <Box
      sx={{
        height: "auto",
        backgroundColor: "#fff",
        backgroundImage: `radial-gradient(${patternColor} ${patternSize}, ${backgroundColor} ${patternSize})`,
        backgroundSize: "10px 10px",
        width: "100%",
        overflow: "hidden",
        pt: { md: "50px" },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={styles.inner}>
          <Box sx={styles.ctaContainer}>
            <Box sx={styles.ctaInnerContainer}>
              <Typography variant="h1" sx={styles.mainText}>
                O futuro da sua carreira está em suas mãos.
              </Typography>

              <Typography variant="h4" sx={styles.auxText}>
                Conheça os nossos cursos de pós-graduação e extensão em Medicina
                à distância.
              </Typography>

              <Button
                onClick={ctaCallback}
                sx={styles.ctaButton}
                variant="contained"
                color="primary"
              >
                Conheça os cursos
              </Button>
            </Box>
          </Box>

          <Box sx={styles.picContainer} component="figure">
            <Box
              component="img"
              sx={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
                position: "absolute",
              }}
              src={"/images/blob.svg"}
            />
            <Box
              component="img"
              sx={{
                position: "absolute",
                height: "100%",
                width: "100%",
                objectFit: { xs: "cover", sm: "contain" },
              }}
              src={"/images/young-doc-female.png"}
            />
          </Box>

          <Box sx={styles.desktopPicture} component="figure">
            <Box
              component="img"
              sx={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
                position: "absolute",
              }}
              src={"/images/blob.svg"}
            />
            <Box sx={{ width: "500px", height: "500px", zIndex: 5 }}>
              <Box
                component="img"
                src="/images/hero-doc.png"
                sx={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
