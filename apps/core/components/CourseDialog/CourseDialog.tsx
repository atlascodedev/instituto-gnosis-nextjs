import useContactForm from 'apps/core/hooks/useContactForm';
import React from 'react';
import ContactFormDialog from '../contact-form-dialog/ContactFormDialog';
import { courseDialogStore } from './store';
import { useRouter } from 'next/router';
import { submitCourseFormDialog } from './helpers';
import { alertStore } from '../Alerts/store';

interface Props {}

const CourseDialog = (props: Props) => {
  const courseDialogOpen = courseDialogStore((state) => state.open);
  const toggleCourseDialog = courseDialogStore(
    (state) => state.toggleVisibility
  );
  const courseDialogInfo = courseDialogStore((state) => state.courseInfo);

  const router = useRouter();

  const snackDispatch = alertStore((state) => state.dispatch);

  const form = useContactForm(async (values, actions) => {
    try {
      snackDispatch({
        message: 'Enviando sua solicitação...',
        severity: 'info',
      });

      await submitCourseFormDialog(
        values.name,
        values.email,
        values.message,
        values.phone,
        `${courseDialogInfo.name} - ${courseDialogInfo.area} - ${courseDialogInfo.level}`
      );

      toggleCourseDialog(false);

      snackDispatch({
        message: 'Enviado com sucesso!',
        severity: 'success',
      });

      router.push('/contato-efetuado');
    } catch (error) {
      snackDispatch({
        message:
          'Houve um erro ao tentar enviar a solicitação ao servidor, pedimos desculpas pela inconveniência.',
        severity: 'error',
      });
      console.log(error);
    }
  });

  return (
    <ContactFormDialog
      cancelLabel="Cancelar"
      submitLabel="Enviar"
      subtitle="Preencha o formulário e em breve um de nossos representantes entrará em contato para atendê-lo!"
      DialogProps={{ disablePortal: true, open: courseDialogOpen }}
      open={courseDialogOpen}
      title={`Manifestação de interesse - Curso de ${courseDialogInfo.level} - ${courseDialogInfo.area} - ${courseDialogInfo.name} `}
      handleClose={() => toggleCourseDialog(false)}
      nameInputProps={{
        name: 'name',
        value: form.values.name,
        error: Boolean(form.errors.name),
        helperText: form.errors.name,
        onChange: form.handleChange,
        label: 'Nome',
        placeholder: 'Ex. João Alves',
      }}
      emailInputProps={{
        name: 'email',
        value: form.values.email,
        error: Boolean(form.errors.email),
        helperText: form.errors.email,
        onChange: form.handleChange,
        placeholder: 'Ex. john.alves@gmail.com',
      }}
      messageInputProps={{
        name: 'message',
        value: form.values.message,
        error: Boolean(form.errors.message),
        onChange: form.handleChange,
        helperText: form.errors.message,
        label: 'Mensagem',
        placeholder: 'Ex. Gostaria de mais informações sobre como funciona...',
      }}
      phoneInputProps={{
        name: 'phone',
        value: form.values.phone,
        error: Boolean(form.errors.phone),
        helperText: form.errors.phone,
        onChange: form.handleChange,
        label: 'Telefone',
        placeholder: 'Ex. (99) 9-9988-7766',
      }}
      isSubmiting={form.isSubmitting || !form.isValid}
      onSubmit={form.submitForm}
    />
  );
};

export default CourseDialog;
