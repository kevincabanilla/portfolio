export const scrollToId = (id: string) => {
  const el = document.querySelector(`#${id}`);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

