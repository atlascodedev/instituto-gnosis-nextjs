const IS_PROD = process.env.NODE_ENV === "production";

const API_ROUTE_BASE = IS_PROD
  ? "https://us-central1-gnosis-webapp.cloudfunctions.net/api"
  : "http://127.0.0.1:5001/gnosis-webapp/us-central1/api";

/**
 * Contact required body - {name: string, email: string, phone: string, message: string}
 *
 * Course required body - {name: string, email: string, phone: string, message: string, course: string}
 */
export const EMAIL_API_ROUTES = {
  contact:
    "https://us-central1-atlascodedev-landing.cloudfunctions.net/api/sendMail/gnosis",
  course:
    "https://us-central1-atlascodedev-landing.cloudfunctions.net/api/sendMail/gnosis-curso",
};

export const FORM_API_ROUTES = {
  contactForm: `${API_ROUTE_BASE}/forms/contact`,
  courseInterest: `${API_ROUTE_BASE}/forms/course-interest`,
  newsletter: `${API_ROUTE_BASE}/forms/newsletter-subscribe`,
};

/**
 * Base value retrivies all entries in this collection, passing an additional parameter to the end of this route will retrieve by ID
 */
export const COLLECTIONS_API_ROUTES = {
  courses: `${API_ROUTE_BASE}/collections/entries/coursesNew`,
  blog: `${API_ROUTE_BASE}/collections/entries/gnosisBlog`,
  testimonials: `${API_ROUTE_BASE}/collections/entries/testimonials`,
};

export const GTM_ID = {
  production: `${process.env.GTM}`,
  development: `${process.env.GTM}`,
} as const;
