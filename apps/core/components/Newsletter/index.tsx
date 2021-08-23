import { NewsLetterInput } from '@atlascode/core';
import { Box } from '@material-ui/core';
import React from 'react';
import axios from 'axios';
import { FORM_API_ROUTES } from 'apps/core/constants';
import { alertStore } from '../Alerts/store';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewsletterProps {}

const Newsletter = (props: NewsletterProps) => {
  const [inputState, setInputState] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      axios.post(FORM_API_ROUTES.newsletter, { email: inputState });
    } catch (error) {
      console.log(error);
    }
  };

  const dispatchSnack = alertStore((state) => state.dispatch);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        height: { xs: '55rem', lg: '44rem' },
        background: (theme) =>
          `linear-gradient(159.61deg, ${theme.palette.secondary.main} 0.98%, rgba(255, 151, 0, 0) 149.87%)`,
        overflow: 'visible',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gridAutoFlow: 'row',
          gridTemplateRows: { xs: '1fr 1fr', lg: 'none' },
          height: '100%',
          px: { xs: '2rem' },
        }}
      >
        <Box component="figure" sx={{ order: { xs: 1, lg: 0 }, m: 0 }}>
          <Box
            sx={{
              width: { xs: '100%', lg: '50%' },
              height: { xs: '100%', lg: '125%' },
              bottom: 0,
              left: 0,
              pt: { xs: '23rem', md: '0px' },
              position: 'absolute',
            }}
          >
            <Box
              sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
              component="img"
              src="/images/doc-img-2.png"
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: { xs: 'center', lg: 'center' },
            gap: '2rem',
            order: { xs: 0, lg: 1 },
          }}
        >
          <Box
            sx={{
              fontSize: { xs: '1.8rem', lg: '3.2rem' },
              maxWidth: { xs: '100%', lg: '28ch' },
              fontWeight: 700,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Assine nossa Newsletter e fique por dentro das novidades.
          </Box>

          <NewsLetterInput
            placeholder="Ex. john.alves@gmail.com"
            minWidth={'200px'}
            buttonLabel="Enviar"
            onClick={() =>
              dispatchSnack({ message: 'Hello world', severity: 'success' })
            }
            size="medium"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Newsletter;
