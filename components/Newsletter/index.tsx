import { NewsLetterInput } from "@atlascode/core";
import { Box } from "@material-ui/core";
import React from "react";
import axios from "axios";
import { alertStore } from "../Alerts/store";
import { FORM_API_ROUTES } from "../../constants";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewsletterProps {}

const Newsletter = (props: NewsletterProps) => {
  const [inputState, setInputState] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      dispatchSnack({ message: "Enviando seu cadastro...", severity: "info" });
      await axios.post(FORM_API_ROUTES.newsletter, { email: inputState });

      dispatchSnack({
        message: "Obrigado por cadastre-se em nossa newsletter!",
        severity: "success",
      });
      setInputState("");
    } catch (error) {
      dispatchSnack({
        severity: "error",
        message:
          "Ocorreu um erro ao tentar enviar a solicitação ao servidor, pedimos desculpas pela inconveniência.",
      });
      console.log(error);
    }

    setIsLoading(false);
  };

  const dispatchSnack = alertStore((state) => state.dispatch);

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        height: { xs: "55rem", lg: "44rem" },
        background: (theme) =>
          `linear-gradient(159.61deg, ${theme.palette.secondary.main} 0.98%, rgba(255, 151, 0, 0) 149.87%)`,
        overflow: "visible",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          gridAutoFlow: "row",
          gridTemplateRows: { xs: "1fr 1fr", lg: "none" },
          height: "100%",
          px: { xs: "2rem" },
        }}
      >
        <Box component="figure" sx={{ order: { xs: 1, lg: 0 }, m: 0 }}>
          <Box
            sx={{
              width: { xs: "100%", lg: "50%" },
              height: { xs: "100%", lg: "125%" },
              bottom: 0,
              left: 0,
              position: "absolute",

              img: {
                pt: { xs: "23rem !important", md: "0px !important" },
              },
            }}
          >
            <Image
              className="newsletter-doc-img"
              layout="fill"
              objectFit="contain"
              src="/images/doc-img-2.png"
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignSelf: { xs: "center", lg: "center" },
            gap: "2rem",
            order: { xs: 0, lg: 1 },
          }}
        >
          <Box
            sx={{
              fontSize: { xs: "1.8rem", lg: "3.2rem" },
              maxWidth: { xs: "100%", lg: "28ch" },
              fontWeight: 700,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Assine nossa Newsletter e fique por dentro das novidades.
          </Box>

          <NewsLetterInput
            placeholder="Ex. john.alves@gmail.com"
            minWidth={"200px"}
            buttonLabel="Enviar"
            value={inputState}
            disabled={isLoading}
            onChange={(event) => setInputState(event.target.value)}
            onClick={handleSubmit}
            size="medium"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Newsletter;
