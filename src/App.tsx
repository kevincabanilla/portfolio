import "./App.css";
import { ReactLenis } from "lenis/react";


const LENIS_EASING = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

function App() {
  return (
    <ReactLenis
      root
      options={{
        duration: 1,
        easing: LENIS_EASING,
      }}
    >
    </ReactLenis>
  );
}

export default App;
