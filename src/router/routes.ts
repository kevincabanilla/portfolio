import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const MainContainer = lazy(() => import("@/components/layout/MainContainer"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainContainer,
  },
  {
    path: "/nothing",
    lazy: () =>
      import("@/components/layout/Nothing").then((m) => ({
        Component: m.default,
      })),
  },
  {
    path: "*",
    lazy: () =>
      import("@/components/layout/PageNotFound").then((m) => ({
        Component: m.default,
      })),
  },
]);

export default router;
