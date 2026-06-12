export const scrollToId = (id: string) => {
  const el = document.querySelector(`#${id}`);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

export const getWebGLContext = ():
  | WebGLRenderingContext
  | WebGL2RenderingContext
  | null => {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");

  return (canvas.getContext("webgl2") ||
    canvas.getContext("webgl") ||
    canvas.getContext("experimental-webgl")) as
    | WebGLRenderingContext
    | WebGL2RenderingContext
    | null;
};

export const hasWebGL = (): boolean => !!getWebGLContext();
