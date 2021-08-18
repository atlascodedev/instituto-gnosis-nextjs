import { polkaPattern, TabPanel } from '@atlascode/core';
import { Box, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import OfferSlider, {
  OfferSliderProps,
} from '../Sliders/offer-slider/OfferSlider';
import { motion } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CoursesProps {
  coursesPos?: OfferSliderProps['items'];
  coursesExt?: OfferSliderProps['items'];
  coursesMulti?: OfferSliderProps['items'];
}

const Courses = ({ coursesExt, coursesMulti, coursesPos }: CoursesProps) => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        pb: { xs: '5rem', lg: '15rem' },
      }}
    >
      <Box
        sx={{
          ...(polkaPattern('#fff', 0.4, 50, 'grey') as Record<string, unknown>),
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: -1,
        }}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: '90%',
            width: { xs: '90%', md: '60%' },
            backgroundColor: (theme) => theme.palette.primary.main,
            borderRadius: '4px',
            marginTop: '4rem',
          }}
        >
          <Tabs
            textColor="inherit"
            variant="fullWidth"
            sx={{ color: (theme) => theme.palette.primary.contrastText }}
            value={activeTab}
            onChange={(e, value) => setActiveTab(value)}
            indicatorColor="secondary"
          >
            <Tab label="Pós-graduação" />
            <Tab label="Extensão" />
            <Tab label="Multidisciplinar" />
          </Tabs>
        </Box>
      </Box>

      <Box
        sx={{
          py: '3rem',
        }}
      >
        <TabPanel index={0} value={activeTab}>
          {coursesPos.length > 0 ? (
            <OfferSlider items={coursesPos} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                py: '5rem',
              }}
            >
              <motion.div
                animate="visible"
                variants={{
                  hidden: {
                    opacity: 0,
                  },
                  visible: {
                    opacity: 1,
                  },
                }}
              >
                <Box
                  sx={{
                    fontSize: { xs: '20px', lg: '32px' },
                    fontWeight: 700,
                    color: (theme) => theme.palette.primary.main,
                    maxWidth: '50ch',
                    textAlign: 'center',
                  }}
                >
                  Nenhum curso de pós-graduação encontrado. Inscreva-se na nossa
                  newsletter e receba notícias sobre lançamentos de cursos.
                </Box>
              </motion.div>
            </Box>
          )}
        </TabPanel>

        <TabPanel index={1} value={activeTab}>
          {coursesExt.length > 0 ? (
            <OfferSlider items={coursesExt} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                py: '5rem',
              }}
            >
              <motion.div
                animate="visible"
                variants={{
                  hidden: {
                    opacity: 0,
                  },
                  visible: {
                    opacity: 1,
                  },
                }}
              >
                <Box
                  sx={{
                    maxWidth: '50ch',
                    textAlign: 'center',
                    fontSize: { xs: '20px', lg: '32px' },
                    fontWeight: 700,
                    color: (theme) => theme.palette.primary.main,
                  }}
                >
                  Nenhum curso de extensão encontrado. Inscreva-se na nossa
                  newsletter e receba notícias sobre lançamentos de cursos.
                </Box>
              </motion.div>
            </Box>
          )}
        </TabPanel>

        <TabPanel index={2} value={activeTab}>
          {coursesMulti.length > 0 ? (
            <OfferSlider items={coursesMulti} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                py: '5rem',
              }}
            >
              <motion.div
                animate="visible"
                variants={{
                  hidden: {
                    opacity: 0,
                  },
                  visible: {
                    opacity: 1,
                  },
                }}
              >
                <Box
                  sx={{
                    maxWidth: '50ch',
                    textAlign: 'center',
                    fontSize: { xs: '20px', lg: '32px' },
                    fontWeight: 700,
                    color: (theme) => theme.palette.primary.main,
                  }}
                >
                  Nenhum curso multidisciplinar encontrado. Inscreva-se na nossa
                  newsletter e receba notícias sobre lançamentos de cursos.
                </Box>
              </motion.div>
            </Box>
          )}
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Courses;
