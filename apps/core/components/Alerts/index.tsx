import * as React from 'react';
import Stack from '@material-ui/core/Stack';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/core';
import { alertStore } from './store';

export default function GlobalSnack() {
  const alertVisible = alertStore((state) => state.open);
  const alertSeverity = alertStore((state) => state.severity);
  const alertMessage = alertStore((state) => state.message);
  const toggleAlertVisibility = alertStore((state) => state.toggleVisibility);

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={alertVisible}
        autoHideDuration={6000}
        onClose={() => toggleAlertVisibility(false)}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity={alertSeverity}
          sx={{ width: '100%', fontSize: '1.5rem' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
