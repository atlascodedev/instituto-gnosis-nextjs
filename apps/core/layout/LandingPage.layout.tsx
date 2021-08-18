import { ContactFormDialog, StandardFooter } from '@atlascode/core';
import { Box } from '@material-ui/core';
import _ from 'lodash';
import React from 'react';
import Contact from '../components/Contact';
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
      <StandardFooter
        emails={['teste@teste.com']}
        phones={['(51) 9-9999-8877']}
      />
    </Box>
  );
};

export default AppLayout;
