import { lazy /* Suspense */ } from "react";
import "./App.css";
import { ReactLenis } from "lenis/react";
import { NavItemEnum } from "./models";
import Navigation from "./components/layout/header/Navigation";
import Footer from "./components/layout/footer/Footer";
import BackToTop from "./components/layout/BackToTop";
import SystemStatus from "./components/layout/SystemStatus";
import { Hero } from "./components/views";

const About = lazy(() => import("@/components/views/About"));
const Skills = lazy(() => import("@/components/views/Skills"));
const Contact = lazy(() => import("@/components/views/Contact"));

const LENIS_EASING = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

const SECTIONS = [
  {
    id: NavItemEnum.About,
    label: "About",
    Component: About,
    transition: "gradient-sweep",
  },
  {
    id: NavItemEnum.Skills,
    label: "Skills",
    Component: Skills,
    transition: "geometric-scatter",
  },
  {
    id: NavItemEnum.Contact,
    label: "Contact",
    Component: Contact,
    transition: "glow-pulse",
  },
];

function App() {
  return (
    <ReactLenis
      root
      options={{
        duration: 1,
        easing: LENIS_EASING,
      }}
    >
      <div className="relative min-h-screen">
        <Navigation navItems={SECTIONS} />
        <main>
          <Hero />
          {/* <Suspense fallback={<SectionLoader />}> */}
          {SECTIONS.map((section) => (
            // <SectionTransition variant={x.transition} />
            <div key={section.id} className="section-darker">
              <section.Component />
            </div>
          ))}
          {/* </Suspense> */}
        </main>
        <Footer />
        <BackToTop />
        <SystemStatus />
      </div>
    </ReactLenis>
  );
}

export default App;
