import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const MainContainer = lazy(() => import("@/components/layout/MainContainer"));

const router = createBrowserRouter([
  { path: "/", Component: MainContainer },
]);

export default router;
