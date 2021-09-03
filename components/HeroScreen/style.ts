import { Theme } from "@material-ui/core";
import { SxProps } from "@material-ui/system";

const DESKTOP_HEADER_HEIGHT = 95;
const COMPENSATION_MARGIN = 50;

const styles = {
  inner: {
    width: "100%",
    display: "flex",
    flexDirection: { xs: "column", lg: "row" },
    mt: { xs: `${DESKTOP_HEADER_HEIGHT + COMPENSATION_MARGIN}px` },
    // pb: { xs: `${COMPENSATION_MARGIN}px` },
    gap: { xs: 5, lg: 0 },
  } as SxProps<Theme>,

  ctaContainer: {
    width: { xs: "100%", lg: "50%" },
    display: "flex",
    alignItems: "center",
  } as SxProps<Theme>,

  picContainer: {
    width: { xs: "100%", lg: "50%" },
    m: 0,
    height: "100%",
    position: "relative",
    display: { xs: "block", lg: "none" },
  } as SxProps<Theme>,

  desktopPicture: {
    width: "50%",
    flexGrow: 0.5,
    position: "relative",
    m: 0,
    overflow: "visible",
    height: "100%",
    display: { xs: "none", lg: "block" },
  } as SxProps<Theme>,

  ctaInnerContainer: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "center",
    gap: 5,
    fontSize: (theme) => theme.typography.h1,
    maxWidth: { xs: "100%", lg: "15ch" },
  } as SxProps<Theme>,

  mainText: {
    p: 0,
    m: 0,
    fontWeight: 900,
    color: (theme) => theme.palette.primary.main,
  } as SxProps<Theme>,

  auxText: {
    p: 0,
    m: 0,
    color: (theme) => theme.palette.grey[600],
  } as SxProps<Theme>,

  ctaButton: {
    color: (theme: Theme) => theme.palette.secondary.light,
    p: 1.5,
    fontWeight: 700,
  } as SxProps<Theme>,
} as const;

export default styles as {
  [Key in keyof typeof styles]: SxProps<Theme>;
};
