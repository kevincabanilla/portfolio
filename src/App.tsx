import "./App.css";
import { useState } from "react";
import { MainContainer } from "./components/layout";
import PreloaderScreen from "./components/preloader/PreloaderScreen";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <PreloaderScreen isLoaded={isLoaded} />
      <MainContainer onLoaded={() => setIsLoaded(true)} />
    </>
  );
}

export default App;
