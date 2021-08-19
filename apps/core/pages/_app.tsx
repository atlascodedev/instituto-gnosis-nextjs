import * as React from 'react';
import { AppProps } from 'next/app';
import {
  AtlasCodeThemeProvider,
  ThemeSmoothScrollLayout,
} from '@atlascode/core';
import theme from '../theme/customTheme';
import AppLayout from '../layout/LandingPage.layout';
import create from 'zustand';
import '@atlascode/core/core.esm.css';
import useContactForm from '../hooks/useContactForm';
import ContactFormDialog from '../components/contact-form-dialog/ContactFormDialog';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface ContactDialogState {
  open: boolean;
  closeDialog: () => void;
  openDialog: () => void;
}

function nameof<T>(
  obj: T,
  expression: (x: { [Property in keyof T]: () => string }) => () => string
): string {
  const res: { [Property in keyof T]: () => string } = {} as {
    [Property in keyof T]: () => string;
  };

  Object.keys(obj).map((k) => (res[k] = () => k));

  return expression(res)();
}

export const contactDialogStore = create<ContactDialogState>((set) => ({
  open: false,
  closeDialog: () => set((state) => ({ open: false })),
  openDialog: () => set((state) => ({ open: true })),
}));

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  const router = useRouter();

  const contactForm = useContactForm(
    ({ email, message, name, phone }, actions) => {
      actions.setSubmitting(true);

      setTimeout(() => {
        actions.setSubmitting(false);
        contactClose();

        router.push('/contato-efetuado');
      }, 5000);
    }
  );

  const contactOpen = contactDialogStore((state) => state.open);
  const contactClose = contactDialogStore((state) => state.closeDialog);

  return (
    <AtlasCodeThemeProvider theme={theme}>
      <ThemeSmoothScrollLayout>
        <AppLayout>
          <Head>
            <title>
              Instituto Educacional Gnosis - Cursos de pós-graduação na área de
              medicina.
            </title>

            <meta
              property="og:title"
              content="Instituto Educacional Gnosis - Cursos de pós-graduação na área da medicina."
            />
            <meta
              property="og:description"
              content="O Instituto Educacional Gnosis trabalha para trazer ao mercado cursos de pós-graduação, extensão e multidisciplinares capazes de impulsionar a sua carreira. Mantendo a excelência de uma instituição tradicional e trazendo ao mesmo tempo a modernidade do aprendizado à distância. Conheça nossos cursos de pós-graduação e extensão na área da medicina."
            />
            <meta
              name="description"
              content='content="O Instituto Educacional Gnosis trabalha para trazer ao mercado cursos de pós-graduação, extensão e multidisciplinares capazes de impulsionar a sua carreira. Mantendo a excelência de uma instituição tradicional e trazendo ao mesmo tempo a modernidade do aprendizado à distância. Conheça nossos cursos de pós-graduação e extensão na área da medicina."'
            />
          </Head>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeSmoothScrollLayout>

      <ContactFormDialog
        isSubmiting={contactForm.isSubmitting || !contactForm.isValid}
        nameInputProps={{
          name: 'name',
          label: 'Nome',
          onChange: contactForm.handleChange,
          error: Boolean(contactForm.errors.name),
          helperText: contactForm.errors.name,
          placeholder: 'Ex: João Alves... ',
          value: contactForm.values.name,
        }}
        emailInputProps={{
          error: Boolean(contactForm.errors.email),
          helperText: contactForm.errors.email,
          label: 'Email',
          name: 'email',
          onChange: contactForm.handleChange,
          placeholder: 'Ex: joao.alves@gmail.com...',
          value: contactForm.values.email,
        }}
        messageInputProps={{
          error: Boolean(contactForm.errors.message),
          name: 'message',
          helperText: contactForm.errors.message,
          label: 'Mensagem',
          placeholder: 'Digite uma mensagem para possamos melhor atendê-lo!',
          onChange: contactForm.handleChange,
          value: contactForm.values.message,
        }}
        phoneInputProps={{
          error: Boolean(contactForm.errors.phone),
          helperText: contactForm.errors.phone,
          label: 'Telefone',
          name: 'phone',
          onChange: contactForm.handleChange,
          placeholder: 'Ex (99) 9-9988-7766',
          value: contactForm.values.phone,
        }}
        onSubmit={contactForm.submitForm}
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
