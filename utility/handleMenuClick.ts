import scrollToElem from "./scrollToElem";
import { useRouter } from "next/router";
import { noop } from "./noop";

export const handleMenuClick = (
  router: ReturnType<typeof useRouter>,
  id?: string,
  link?: string
) => {
  if (router.route === "/" && id) {
    scrollToElem(id);
  } else if (
    (router.route === "/" && link) ||
    (router.route !== link && link)
  ) {
    router.push(link);
  } else if (
    (router.route !== "/" && id) ||
    (router.route !== "/" && id && !link)
  ) {
    router.push("/").then(() => {
      scrollToElem(id);
    });
  } else {
    noop();
  }
};
