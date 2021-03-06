import { ContactThankyouPage } from "@atlascode/core";
import { Box } from "@material-ui/core";
import React from "react";
import { useRouter } from "next/router";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ContactConfirmationPageProps {}

const ContactConfirmationPage = (props: ContactConfirmationPageProps) => {
  const router = useRouter();

  return (
    <Box sx={{ py: { xs: "8rem", lg: "15rem" } }}>
      <ContactThankyouPage
        ButtonProps={{ onClick: () => router.push("/") }}
        redirectTimeout={Infinity}
        redirectCallback={() => router.push("/")}
      />
    </Box>
  );
};

export default ContactConfirmationPage;
