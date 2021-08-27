import React from "react";
import { Box, IconButton, Link } from "@material-ui/core";
import {
  Facebook,
  Instagram,
  WhatsApp,
  YouTube,
  LinkedIn,
  Twitter,
} from "@material-ui/icons";

interface FooterProps {
  FooterContactInfoProps?: FooterContactInfoProps;
  FooterIconsProps?: FooterIconsProps;
  FooterLinksProps?: FooterAdditionalLinksProps;
}

const Footer = ({
  FooterContactInfoProps,
  FooterIconsProps,
  FooterLinksProps,
}: FooterProps) => {
  return (
    <Box
      className="Atlas-Footer-rootContainer"
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        width: "100%",
        borderTop: (theme) => `0.5px solid ${theme.palette.grey[400]}`,
      }}
    >
      <Box
        className="Atlas-Footer-upperFlexContainer"
        sx={{
          width: { xs: "100%", lg: "75% " },
          margin: "auto",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: { xs: "center", lg: "space-evenly" },
          alignItems: { xs: "center", lg: "flex-start" },
          py: { xs: "2.5em" },
          color: (theme) => theme.palette.primary.contrastText,
          gap: { xs: "2.5em", lg: "0em" },
        }}
      >
        <FooterContactInfo {...FooterContactInfoProps} />

        {FooterLinksProps && <FooterAdditionalLinks {...FooterLinksProps} />}
      </Box>

      <Box
        className="Atlas-Footer-bottomFlexContainer"
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          py: { xs: "1.5em" },
          borderTop: (theme) => `0.5px solid ${theme.palette.grey[400]}`,
        }}
      >
        <Box
          className="Atlas-Footer-bottomFlexContainer-socialIconContainer"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "25px",
            py: { xs: "1.5em" },
          }}
        >
          <FooterIcons {...FooterIconsProps} />
        </Box>

        <Box
          component={"p"}
          sx={{
            color: "#fff",
            textTransform: "capitalize",
            fontSize: { xs: "10px", lg: "16px" },
            textAlign: "center",
          }}
        >{`© ${new Date().getFullYear()} Todos direitos reservados - Instituto Educacional Gnosis `}</Box>
      </Box>
    </Box>
  );
};

export default Footer;

interface FooterAdditionalLinksProps {
  label: string;
  links: string[];
}

const FooterAdditionalLinks = ({
  label,
  links,
}: Partial<FooterAdditionalLinksProps>) => {
  return (
    <Box
      className="Atlas-Footer-upperflexContainer-additionalLinks"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: { xs: "12px", lg: "14px" },
        gap: "10px",
      }}
    >
      <Box
        className="Atlas-Footer-upperflexContainer-additionalLinks-label"
        sx={{ fontWeight: "800" }}
      >
        {label}
      </Box>
      <Box
        className="Atlas-Footer-upperflexContainer-additionalLinks-list"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {links &&
          links.map((value, index) => {
            return <Box key={index}> {value} </Box>;
          })}
      </Box>
    </Box>
  );
};

interface FooterContactInfoProps {
  address: string;
  registration: string;
  phones: string[];
  emails: string[];
}

const FooterContactInfo = ({
  address,
  emails,
  phones,
  registration,
}: Partial<FooterContactInfoProps>) => {
  return (
    <Box
      className="Atlas-Footer-upperFlexContainer-contactInfo"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: { xs: "12px", lg: "14px" },
        gap: "10px",
      }}
    >
      <Box sx={{ fontWeight: "800" }}>Contato</Box>
      <Box className="Atlas-Footer-upperFlexContainer-contactInfoAddress">
        {address && <Box>{address} </Box>}
      </Box>
      <Box className="Atlas-Footer-upperFlexContainer-contactInfoRegistration">
        {registration && <Box>{registration}</Box>}
      </Box>
      <Box className="Atlas-Footer-upperFlexContainer-contactInfoPhones">
        {phones && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {phones.map((value, index) => {
              return <Box key={index}>{value}</Box>;
            })}
          </Box>
        )}
      </Box>

      <Box className="Atlas-Footer-upperFlexContainer-contactInfoEmails">
        {emails && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {emails.map((value, index) => {
              return <Box key={index}>{value}</Box>;
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

interface FooterIconsProps {
  facebook: string;
  instagram: string;
  whatsApp: string;
  twitter: string;
  youtube: string;
  linkedin: string;
}

const FooterIcons = ({
  facebook,
  instagram,
  whatsApp,
  twitter,
  youtube,
  linkedin,
}: Partial<FooterIconsProps>) => {
  return (
    <>
      <IconButton
        className="Atlas-Footer-facebookIcon"
        sx={{
          color: (theme) => theme.palette.primary.contrastText,
          fontSize: { xs: "16px", lg: "30px" },
        }}
      >
        <Facebook sx={{ fontSize: "inherit" }} />
      </IconButton>

      <IconButton
        className="Atlas-Footer-instagramIcon"
        sx={{
          color: (theme) => theme.palette.primary.contrastText,
          fontSize: { xs: "16px", lg: "30px" },
        }}
      >
        <Link href={facebook} target={"_blank"}>
          <Instagram sx={{ fontSize: "inherit" }} />
        </Link>
      </IconButton>

      <IconButton
        className="Atlas-Footer-whatsAppIcon"
        sx={{
          color: (theme) => theme.palette.primary.contrastText,
          fontSize: { xs: "16px", lg: "30px" },
        }}
      >
        <Link href={whatsApp} target={"_blank"}>
          <WhatsApp sx={{ fontSize: "inherit" }} />
        </Link>
      </IconButton>

      <IconButton
        className="Atlas-Footer-twitterIcon"
        sx={{
          color: (theme) => theme.palette.primary.contrastText,
          fontSize: { xs: "16px", lg: "30px" },
        }}
      >
        <Link href={twitter} target={"_blank"}>
          <Twitter sx={{ fontSize: "inherit" }} />
        </Link>
      </IconButton>

      <IconButton
        className="Atlas-Footer-youtubeIcon"
        sx={{
          color: (theme) => theme.palette.primary.contrastText,
          fontSize: { xs: "16px", lg: "30px" },
        }}
      >
        <Link href={youtube} target="_blank">
          <YouTube sx={{ fontSize: "inherit" }} />
        </Link>
      </IconButton>

      <IconButton
        className="Atlas-Footer-linkedinIcon"
        sx={{
          color: (theme) => theme.palette.primary.contrastText,
          fontSize: { xs: "16px", lg: "30px" },
        }}
      >
        <Link target={"_blank"} href={youtube}>
          <LinkedIn sx={{ fontSize: "inherit" }} />
        </Link>
      </IconButton>
    </>
  );
};
