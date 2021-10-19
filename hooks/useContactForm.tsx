import { useFormik, FormikConfig } from "formik";
import * as Yup from "yup";

type UseContactFormFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export const useContactForm = (
  callback: FormikConfig<UseContactFormFields>["onSubmit"]
) => {
  const formik = useFormik<UseContactFormFields>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    onSubmit: callback,
    isInitialValid: false,
    validationSchema: Yup.object({
      name: Yup.string().required("Este campo é obrigatório"),
      email: Yup.string()
        .email("É precio ser um e-mail válido")
        .required("Este campo é obrigatório"),
      phone: Yup.string().required("Este campo é obrigatório"),
      message: Yup.string().required(
        "Deixe-nos uma mensagem para que possamos melhor atendê-lo!"
      ),
    }),
  });

  return formik;
};

export default useContactForm;
