import "./App.css";
import { Suspense, useState } from "react";
import { SimpleAnalytics } from "@simpleanalytics/react";
import PreloaderScreen from "./components/preloader/PreloaderScreen";
import { ContentWrapper } from "./components/common/ui";
import { RouterProvider } from "react-router";
import router from "./router/routes";

const ANALYTICS_ENABLED = import.meta.env.VITE_ANALYTICS_ENABLED === "true";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {ANALYTICS_ENABLED && <SimpleAnalytics collectDnt />}
      <PreloaderScreen isLoaded={isLoaded} />
      <Suspense>
        <ContentWrapper onLoaded={() => setIsLoaded(true)}>
          <RouterProvider router={router} />
        </ContentWrapper>
      </Suspense>
    </>
  );
}

export default App;
