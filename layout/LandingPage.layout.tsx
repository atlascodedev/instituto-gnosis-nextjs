import { Box } from "@material-ui/core";
import React from "react";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";

export interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Header />

      <Box
        id="anchor"
        sx={{
          visibility: "hidden",
          opacity: 0,
          height: { lg: "95px" },
        }}
      />
      {children}
      <div id="contact_form">
        <Contact
          formProps={{
            title: "Fale conosco",
          }}
          blobColor="secondary"
        />
      </div>
      <Footer
        FooterContactInfoProps={{
          address: "Avenida Praia de Belas, 1212, sala 424, RS - Brasil",
          registration: "CNPJ: 36.605.433/0001-18",
          emails: ["atendimento@institutoeg.com"],
          phones: ["(51) 9-9143-1009"],
        }}
        FooterIconsProps={{
          facebook: "https://www.facebook.com/InstitutoGnosisEducacional/",
          instagram: "https://www.instagram.com/gnosisinstitutoeducacional/",
          twitter: "https://twitter.com/GnosisInstituto",
          youtube:
            "https://www.youtube.com/channel/UC4qx3U-Hk8qlX46zTZqrL0w/videos?view_as=subscriber",
          linkedin: "https://institutoeg.com/",
          whatsApp: "https://wa.link/3in1jl",
        }}
        FooterLinksProps={{
          label: "Informações",
          links: ["Sobre nós", "Institucional", "E-MEC"],
        }}
      />
    </Box>
  );
};

export default AppLayout;
