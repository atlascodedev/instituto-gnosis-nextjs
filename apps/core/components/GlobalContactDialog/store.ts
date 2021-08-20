import store from 'zustand';
interface ContactDialogState {
  open: boolean;
  closeDialog: () => void;
  openDialog: () => void;
}

export const contactDialogStore = store<ContactDialogState>((set) => ({
  open: false,
  closeDialog: () => set((state) => ({ open: false })),
  openDialog: () => set((state) => ({ open: true })),
}));
