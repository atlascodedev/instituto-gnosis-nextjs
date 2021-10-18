import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { SxProps, Theme } from "@material-ui/system";
import { IconType } from "react-icons/lib";
import { CSSInterpolation } from "@material-ui/system";
import { useRouter } from "next/router";

export const backGroundZoom = (
  variant: "backgroundImage" | "objectFit",
  duration = 5
): CSSInterpolation => {
  const objectFitVariant = {
    "& > :first-child": {
      transition: `${duration}s`,
      ":hover": {
        transform: `scale(1.3)`,
      },
    },
  };

  const backgroundImageVariant = {
    trasition: `${duration}s`,
    ":hover": {
      backgroundSize: "130%",
    },
  };

  const zoomVariant =
    variant === "objectFit" ? objectFitVariant : backgroundImageVariant;

  return {
    overflow: "hidden",
    ...zoomVariant,
  };
};

export function OfferCard({
  img,
  items,
  redirectLink,
  title,
  zoomEffect,
  sx,
}: OfferCardProps) {
  const router = useRouter();

  return (
    <Box
      sx={{ width: { xs: "30rem", lg: "34rem" }, fontSize: "inherit", ...sx }}
    >
      <Card sx={{ maxWidth: "100%", borderRadius: "11px" }}>
        <Box component="a" href={redirectLink}>
          <Box
            sx={{
              width: "100%",
              height: "19em",
              // eslint-disable-next-line @typescript-eslint/ban-types
              ...(zoomEffect ? (backGroundZoom("objectFit") as {}) : {}),
            }}
          >
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={img}
            ></Box>
          </Box>{" "}
        </Box>
        <CardContent
          sx={{
            px: "2.7em",
            pb: "0em",
            pt: "0em",
          }}
        >
          <Box
            sx={{ textDecoration: "none" }}
            component="a"
            href={redirectLink}
          >
            <Typography
              sx={{
                fontSize: "2em",
                fontWeight: "600",
                color: (theme) => theme.palette.primary.main,
                m: "0em",
                py: "1em",
              }}
              gutterBottom
              variant="h5"
            >
              {title}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5em" }}>
            {items.map(({ icon: Icon, text }, index) => {
              return (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "1.5em" }}
                  key={index}
                >
                  <Box
                    sx={{
                      fontSize: "1.8em",
                      color: (theme) => theme.palette.primary.main,
                    }}
                    component={Icon}
                  />
                  <Typography
                    sx={{
                      fontSize: "1.6em",
                      color: (theme) => theme.palette.grey[500],
                    }}
                    component="sub"
                  >
                    {text}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </CardContent>
        <CardActions sx={{ px: "2.7em", pt: "3.5em", pb: "3.5em" }}>
          <Button
            variant="contained"
            color="primary"
            LinkComponent={"a"}
            onClick={() => router.push(redirectLink)}
            sx={{
              fontSize: "1.4em",
              textTransform: "inherit",
              fontWeight: "500",
            }}
          >
            Saiba mais
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default OfferCard;
export interface OfferCardItem {
  icon: IconType;
  text: string;
}

export interface OfferCardProps {
  img: string;
  title: string;
  items: OfferCardItem[];
  redirectLink: string;
  zoomEffect?: boolean;
  sx?: SxProps<Theme>;
}
