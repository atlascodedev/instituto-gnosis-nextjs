export const pageView = (url: string) => {
  (window as any).dataLayer.push({
    event: "pageView",
    page: url,
  });
};
