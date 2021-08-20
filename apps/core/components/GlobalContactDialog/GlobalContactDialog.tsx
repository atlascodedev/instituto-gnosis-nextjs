import useContactForm from 'apps/core/hooks/useContactForm';
import React from 'react';
import ContactFormDialog from '../contact-form-dialog/ContactFormDialog';
import { useRouter } from 'next/router';
import { contactDialogStore } from './store';

interface Props {}

const GlobalContactDialog = (props: Props) => {
  const router = useRouter();

  const contactOpen = contactDialogStore((state) => state.open);
  const contactClose = contactDialogStore((state) => state.closeDialog);

  const contactForm = useContactForm(
    ({ email, message, name, phone }, actions) => {
      actions.setSubmitting(true);

      setTimeout(() => {
        actions.setSubmitting(false);
        router.push('/contato-efetuado');
      }, 5000);
    }
  );

  return (
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
  );
};

export default GlobalContactDialog;
