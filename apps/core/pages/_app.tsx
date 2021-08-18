import * as React from 'react';
import { AppProps } from 'next/app';
import {
  AtlasCodeThemeProvider,
  ContactFormDialog,
  ThemeSmoothScrollLayout,
} from '@atlascode/core';
import theme from '../theme/customTheme';
import AppLayout from '../layout/LandingPage.layout';
import create from 'zustand';

interface ContactDialogState {
  open: boolean;
  closeDialog: () => void;
  openDialog: () => void;
}

export const contactDialogStore = create<ContactDialogState>((set) => ({
  open: false,
  closeDialog: () => set((state) => ({ open: false })),
  openDialog: () => set((state) => ({ open: true })),
}));

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  const contactOpen = contactDialogStore((state) => state.open);
  const contactClose = contactDialogStore((state) => state.closeDialog);

  return (
    <AtlasCodeThemeProvider theme={theme}>
      <ThemeSmoothScrollLayout>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeSmoothScrollLayout>

      <ContactFormDialog
        cancelLabel="Cancelar"
        submitLabel="Enviar"
        title="Contato"
        subtitle="Preencha o formulário com seus dados e uma mensagem e um de nossos representantes irá atendê-lo na primeira oportunidade."
        handleClose={contactClose}
        open={contactOpen}
        DialogProps={{ disablePortal: true, open: contactOpen }}
      />
    </AtlasCodeThemeProvider>
  );
}
