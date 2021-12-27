/* eslint-disable @typescript-eslint/no-explicit-any */
export const nativeSmoothScrollTo = (elem: Element | HTMLElement) => {
  window.scroll({
    behavior: "smooth",
    left: 0,
    top: elem.getBoundingClientRect().top + global.window.pageYOffset,
  });
};

export const smoothScrollTo = (to: number, duration: number) => {
  const element =
      global.window.document.scrollingElement ||
      global.window.document.documentElement,
    start = element.scrollTop,
    change = to - start,
    startDate = +new Date();

  const easeInOutQuad = (t: any, b: any, c: any, d: any) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const animateScroll = () => {
    const currentDate = +new Date();
    const currentTime = currentDate - startDate;
    element.scrollTop = parseInt(
      easeInOutQuad(currentTime, start, change, duration)
    );
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      element.scrollTop = to;
    }
  };
  animateScroll();
};

const supportsNativeSmoothScroll =
  typeof window === "undefined"
    ? null
    : "scrollBehavior" in global.window.document.documentElement.style;

export const scrollToElem = (elemSelector: string): void => {
  if (!elemSelector) {
    return;
  }

  const elem = global.window.document.querySelector(elemSelector);
  if (elem) {
    if (supportsNativeSmoothScroll as any) {
      nativeSmoothScrollTo(elem);
    } else {
      smoothScrollTo((elem as HTMLElement).offsetTop, 600);
    }
  }
};

export default scrollToElem;
