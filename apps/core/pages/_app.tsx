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
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import createEmotionCache from '@emotion/cache';

interface ContactDialogState {
  open: boolean;
  closeDialog: () => void;
  openDialog: () => void;
}

interface CourseDialogInfo {
  name: string;
  area: string;
  level: string;
}
interface CourseDialogState {
  open: boolean;
  setCourseInfo: (info: CourseDialogInfo) => void;
  toggleVisibility: (open: boolean) => void;
  courseInfo: CourseDialogInfo;
}

export const courseDialogStore = create<CourseDialogState>((set) => ({
  open: false,
  toggleVisibility: (open) => set((state) => ({ open: open })),
  setCourseInfo: (info) =>
    set((state) => ({
      ...state,
      courseInfo: { area: info.area, level: info.level, name: info.name },
    })),
  courseInfo: {
    area: '',
    level: '',
    name: '',
  },
}));

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

  const courseDialogOpen = courseDialogStore((state) => state.open);
  const toggleCourseDialog = courseDialogStore(
    (state) => state.toggleVisibility
  );

  const clientSideCache = createEmotionCache({ key: 'css' });

  return (
    <CacheProvider value={clientSideCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeSmoothScrollLayout>
          <AppLayout>
            <Head>
              <title>
                Instituto Educacional Gnosis - Cursos de pós-graduação na área
                de medicina.
              </title>
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

        <ContactFormDialog
          DialogProps={{ disablePortal: true, open: courseDialogOpen }}
          open={courseDialogOpen}
          title={`Manifestação de interesse - Curso de `}
        />
      </ThemeProvider>
    </CacheProvider>
  );
}
