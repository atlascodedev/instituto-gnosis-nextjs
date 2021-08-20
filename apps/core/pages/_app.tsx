import * as React from 'react';
import { AppProps } from 'next/app';
import { ThemeSmoothScrollLayout } from '@atlascode/core';
import theme from '../theme/customTheme';
import AppLayout from '../layout/LandingPage.layout';
import '@atlascode/core/core.esm.css';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import createEmotionCache from '@emotion/cache';
import GlobalContactDialog from '../components/GlobalContactDialog/GlobalContactDialog';
import CourseDialog from '../components/CourseDialog/CourseDialog';

export default function MyApp(
  props: AppProps & { emotionCache?: EmotionCache }
) {
  const clientSideCache = createEmotionCache({ key: 'css' });
  const { Component, pageProps, emotionCache = clientSideCache } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <ThemeSmoothScrollLayout>
          <AppLayout>
            <CssBaseline />
            <Head>
              <title>
                Instituto Educacional Gnosis - Cursos de pós-graduação na área
                de medicina.
              </title>
            </Head>
            <Component {...pageProps} />
          </AppLayout>
        </ThemeSmoothScrollLayout>

        <GlobalContactDialog />
        <CourseDialog />
      </ThemeProvider>
    </CacheProvider>
  );
}
