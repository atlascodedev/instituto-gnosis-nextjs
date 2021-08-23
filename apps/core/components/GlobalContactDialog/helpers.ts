import { EMAIL_API_ROUTES, FORM_API_ROUTES } from 'apps/core/constants';
import axios from 'axios';

const submitContactDialog = async (
  name: string,
  email: string,
  message: string,
  phone: string
) => {
  try {
    await axios.post(FORM_API_ROUTES.contactForm, {
      name: name,
      email: email,
      message: message,
      phone: phone,
    });

    // await axios.post(EMAIL_API_ROUTES.contact, {
    //   name: name,
    //   email: email,
    //   message: message,
    //   phone: phone,
    // });
  } catch (error) {
    console.log(error);
  }
};

export default submitContactDialog;
