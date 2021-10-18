import * as React from "react";
import { AppProps } from "next/app";
import { ThemeSmoothScrollLayout, MotionBox } from "@atlascode/core";
import theme from "../theme/customTheme";
import AppLayout from "../layout/LandingPage.layout";
import "@atlascode/core/core.esm.css";
import Head from "next/head";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@emotion/cache";
import GlobalContactDialog from "../components/GlobalContactDialog/GlobalContactDialog";
import CourseDialog from "../components/CourseDialog/CourseDialog";
import GlobalSnack from "../components/Alerts";
import "../public/css/index.css";
import WhatsAppButton from "../components/WhatsAppButton";
import { wppRedirect } from "../utility/redirectToWhatsapp";
import { Box, ThemeProvider, CssBaseline } from "@material-ui/core";
import { GoogleTagManagerAfterInteractive } from "../components/GoogleTagManager";
import { GTM_ID } from "../constants";

export default function MyApp(
  props: AppProps & { emotionCache?: EmotionCache }
) {
  const clientSideCache = createEmotionCache({ key: "css" });
  const {
    Component,
    pageProps,
    emotionCache = clientSideCache,
    router,
  } = props;

  return (
    <React.Fragment>
      <GoogleTagManagerAfterInteractive GTM_ID={GTM_ID.development} />
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <MotionBox
            animate="visible"
            initial="hidden"
            variants={{
              visible: {
                opacity: 1,
                zIndex: 3000,
              },
              hidden: {
                opacity: 0,
                zIndex: -1,
              },
            }}
            transition={{
              duration: 1,
            }}
            sx={{ width: "100%", height: "100%" }}
            key={router.route}
          >
            <ThemeSmoothScrollLayout>
              <AppLayout>
                <CssBaseline />
                <Head>
                  <title>
                    Instituto Educacional Gnosis - Cursos de pós-graduação na
                    área de medicina.
                  </title>
                </Head>

                <Component {...pageProps} />
              </AppLayout>
            </ThemeSmoothScrollLayout>

            <Box sx={{ display: { xs: "block", lg: "none" } }}>
              <WhatsAppButton
                onClick={() =>
                  wppRedirect(
                    "5551991431009",
                    "Olá, estou vindo através do website e gostaria de mais informações.",
                    "mobile"
                  )
                }
              />
            </Box>

            <Box sx={{ display: { xs: "none", lg: "block" } }}>
              <WhatsAppButton
                onClick={() =>
                  wppRedirect(
                    "5551991431009",
                    "Olá, estou vindo através do website e gostaria de mais informações.",
                    "desktop"
                  )
                }
              />
            </Box>
          </MotionBox>

          <GlobalContactDialog />
          <CourseDialog />
          <GlobalSnack />
        </ThemeProvider>
      </CacheProvider>
    </React.Fragment>
  );
}
