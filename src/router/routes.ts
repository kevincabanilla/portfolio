import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const MainContainer = lazy(() => import("@/components/layout/MainContainer"));
const ErrorBoundary = lazy(() => import("@/components/layout/ErrorBoundary"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainContainer,
    ErrorBoundary,
  },
  {
    path: "/nothing",
    lazy: () =>
      import("@/components/layout/Nothing").then((m) => ({
        Component: m.default,
      })),
    ErrorBoundary,
  },
  {
    path: "*",
    lazy: () =>
      import("@/components/layout/PageNotFound").then((m) => ({
        Component: m.default,
      })),
    ErrorBoundary,
  },
]);

export default router;
