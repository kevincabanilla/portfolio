export const getInitials = (value: string): string => {
  return value
    .split(" ")
    .map((s) => s.charAt(0))
    .join("")
    .toUpperCase();
};

export const scrollToId = (id: string) => {
  const el = document.querySelector(id.startsWith("#") ? id : `#${id}`);
  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
