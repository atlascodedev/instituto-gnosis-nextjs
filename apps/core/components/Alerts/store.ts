import create from 'zustand';

export interface AlertState {
  open: boolean;
  message: string;
  severity: 'warning' | 'success' | 'error' | 'info';
}

export interface AlertActions {
  dispatch: (alert: Omit<AlertState, 'open'>) => void;
  toggleVisibility: (open: boolean) => void;
}

export const alertStore = create<AlertState & AlertActions>((set) => ({
  open: false,
  message: '',
  severity: 'info',
  toggleVisibility: (open) =>
    set((state) => ({
      ...state,
      open: open,
    })),
  dispatch: (alert) =>
    set((state) => ({
      ...state,
      open: true,
      message: alert.message,
      severity: alert.severity,
    })),
}));
