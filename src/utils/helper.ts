export const scrollTo = (id: string) => {
  const el = document.querySelector(`#${id}`);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

