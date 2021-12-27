require("dotenv").config({ path: `./.env` });

function getEnvironmentGTM() {
  return `${process.env[`GTM_${process.env.GTM_ENV.toUpperCase()}`]}`;
}

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    GTM: getEnvironmentGTM(),
  },
};
