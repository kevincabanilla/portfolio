import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const MainContainer = lazy(() => import("@/components/layout/MainContainer"));
const Nothing = lazy(() => import("@/components/layout/Nothing"));
const PageNotFound = lazy(() => import("@/components/layout/PageNotFound"));

const router = createBrowserRouter([
  { path: "/", Component: MainContainer },
  { path: "/nothing", Component: Nothing },
  { path: "*", Component: PageNotFound },
]);

export default router;
