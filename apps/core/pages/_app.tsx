import * as React from 'react';
import { AppProps } from 'next/app';
import { ThemeSmoothScrollLayout, MotionBox } from '@atlascode/core';
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
            <MotionBox
              animate="visible"
              initial="hidden"
              variants={{
                visible: {
                  opacity: 1,
                  zIndex: 5000,
                },
                hidden: {
                  opacity: 0,
                  zIndex: -1,
                },
              }}
              sx={{ width: '100%', height: '100%' }}
            >
              <Component {...pageProps} />
            </MotionBox>
          </AppLayout>
        </ThemeSmoothScrollLayout>

        <GlobalContactDialog />
        <CourseDialog />
      </ThemeProvider>
    </CacheProvider>
  );
}
