import axios from "axios";
import { FORM_API_ROUTES, EMAIL_API_ROUTES } from "../../constants";

export const submitCourseFormDialog = async (
  name: string,
  email: string,
  message: string,
  phone: string,
  course: string,
  rejectionTest?: boolean
) => {
  try {
    await axios.post(EMAIL_API_ROUTES.course, {
      name: name,
      email: email,
      message: message,
      phone: phone,
      course: course,
    });

    await axios.post(FORM_API_ROUTES.courseInterest, {
      name: name,
      email: email,
      message: message,
      phone: phone,
      course: course,
    });
  } catch (error) {
    console.log(error);
  }
};
