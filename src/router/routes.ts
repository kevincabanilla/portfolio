import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const MainContainer = lazy(() => import("@/components/layout/MainContainer"));
const PageNotFound = lazy(() => import("@/components/layout/PageNotFound"));

const router = createBrowserRouter([
  { path: "/", Component: MainContainer },
  { path: "*", Component: PageNotFound },
]);

export default router;
