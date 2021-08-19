import { ContactFormDialog, StandardFooter } from '@atlascode/core';
import { Box } from '@material-ui/core';
import _ from 'lodash';
import React from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [contactFormDialogState, setContactFormDialogState] =
    React.useState<boolean>(false);

  return (
    <Box sx={{ width: '100%' }}>
      <Header />
      {children}
      <div id="contact_form">
        <Contact
          formProps={{
            title: 'Fale conosco',
          }}
          blobColor="secondary"
        />
      </div>
      <Footer
        FooterContactInfoProps={{
          address: 'Avenida Praia de Belas, 1212, sala 424, RS - Brasil',
          registration: 'CNPJ: 36.605.433/0001-18',
          emails: ['atendimento@institutoeg.com'],
          phones: ['(51) 9-9143-1009'],
        }}
        FooterIconsProps={{
          facebook: 'https://www.facebook.com/InstitutoGnosisEducacional/',
          instagram: 'https://www.instagram.com/gnosisinstitutoeducacional/',
          twitter: 'https://twitter.com/GnosisInstituto',
          youtube:
            'https://www.youtube.com/channel/UC4qx3U-Hk8qlX46zTZqrL0w/videos?view_as=subscriber',
          linkedin: 'https://institutoeg.com/',
          whatsApp: 'https://wa.link/3in1jl',
        }}
        FooterLinksProps={{
          label: 'Informações',
          links: ['Sobre nós', 'Institucional', 'E-MEC'],
        }}
      />
    </Box>
  );
};

export default AppLayout;
