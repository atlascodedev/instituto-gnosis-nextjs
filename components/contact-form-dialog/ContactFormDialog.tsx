import { Box } from "@material-ui/core";
import * as React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormInputProps } from "../minimal-contact-form/MinimalContactForm";
import NumberFormat from "react-number-format";

/* eslint-disable-next-line */
export interface ContactFormDialogProps {
  title?: string;
  subtitle?: string;
  cancelLabel?: string;
  submitLabel?: string;
  onSubmit?: (...args: unknown[]) => void;
  handleClose?: (...args: unknown[]) => void;
  open?: boolean;
  nameInputProps?: Partial<FormInputProps>;
  phoneInputProps?: Partial<FormInputProps>;
  emailInputProps?: Partial<FormInputProps>;
  messageInputProps?: Partial<FormInputProps>;
  DialogProps?: DialogProps;
  isSubmiting?: boolean;
}

export function ContactFormDialog({
  title = "Placeholder title",
  subtitle = "Lorem ipsum dolum salet, please fill out this fields this is placeholder text to give context about this forms purpose to the end user.",
  cancelLabel = "Cancel",
  submitLabel = "Send",
  onSubmit,
  handleClose,
  open = false,
  emailInputProps = {
    label: "Email",
    placeholder: "Ex. joao.vitor@gmail.com",
  },
  messageInputProps = {
    label: "Mensagem",
    placeholder: "Ex: Tenho dúvidas a respeito de...",
  },
  nameInputProps = {
    label: "Nome completo",
    placeholder: "Ex. João Vitor",
  },
  phoneInputProps = {
    label: "Número",
    placeholder: "Ex: (00) 0-0000-0000",
  },
  DialogProps,
  isSubmiting,
}: ContactFormDialogProps) {
  return (
    <Dialog
      sx={{
        ".MuiDialog-paper": {
          minWidth: "50%",
        },
      }}
      maxWidth={"xl"}
      open={open}
      onClose={handleClose}
      {...DialogProps}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ pb: "2rem" }}>{subtitle}</DialogContentText>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gridTemplateRows: "1fr",
            gridAutoFlow: "row",
            gap: "3rem",
          }}
        >
          <TextField
            {...nameInputProps}
            sx={{ gridColumn: { xs: "1/3", md: "initial" } }}
            autoFocus
            margin="dense"
            fullWidth
            variant="outlined"
          />
          <TextField
            {...emailInputProps}
            sx={{ gridColumn: { xs: "1/3", md: "initial" } }}
            margin="dense"
            type="email"
            fullWidth
            variant="outlined"
          />
          <NumberFormat
            customInput={TextField}
            format="(##) #-####-####"
            {...phoneInputProps}
            sx={{ gridColumn: "1/3" }}
            margin="dense"
            fullWidth
            variant="outlined"
          />
          <TextField
            {...messageInputProps}
            sx={{ gridColumn: "1/3" }}
            margin="dense"
            fullWidth
            variant="outlined"
            multiline
            rows={6}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button disabled={isSubmiting} onClick={handleClose}>
          {cancelLabel}
        </Button>
        <Button disabled={isSubmiting} onClick={onSubmit}>
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ContactFormDialog;
