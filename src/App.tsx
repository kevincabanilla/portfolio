import {
  lazy,
  useEffect,
  useState,
  type JSX,
  type LazyExoticComponent,
} from "react";
import "./App.css";
import { ReactLenis } from "lenis/react";
import { NavItemEnum } from "./models";
import { Helper } from "./utils";
import Navigation from "./components/layout/header/Navigation";
import Footer from "./components/layout/footer/Footer";
import BackToTop from "./components/layout/BackToTop";
import SystemStatus from "./components/layout/SystemStatus";
import { Hero } from "./components/views";
import {
  ContentWrapper,
  ScrollProgressBar,
  SectionTransition,
  type TransitionVariant,
} from "./components/common/ui";

const About = lazy(() => import("@/components/views/About"));
const Skills = lazy(() => import("@/components/views/Skills"));
const Contact = lazy(() => import("@/components/views/Contact"));

const LENIS_EASING = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

type SectionItem = {
  id: string;
  label: string;
  Component: LazyExoticComponent<() => JSX.Element>;
  transition: TransitionVariant;
};

const SECTIONS: SectionItem[] = [
  {
    id: NavItemEnum.About,
    label: "About",
    Component: About,
    transition: "GradientSweep",
  },
  {
    id: NavItemEnum.Skills,
    label: "Skills",
    Component: Skills,
    transition: "GeometricScatter",
  },
  {
    id: NavItemEnum.Contact,
    label: "Contact",
    Component: Contact,
    transition: "GlowPulse",
  },
];

function App() {
  const [contentsLoaded, setContentsLoaded] = useState(false);

  useEffect(() => {
    if (!contentsLoaded) return;

    const hash = window.location.hash;
    if (!hash) return;

    const targetId = hash.slice(1);
    const exists = SECTIONS.some((x) => x.id === targetId);

    if (exists) {
      Helper.scrollToId(hash);
    }
  }, [contentsLoaded]);

  return (
    <ReactLenis
      root
      options={{
        duration: 1,
        easing: LENIS_EASING,
      }}
    >
      <ScrollProgressBar />

      <div className="relative min-h-screen">
        <Navigation navItems={SECTIONS} contentsLoaded={contentsLoaded} />
        <main>
          <Hero />

          {/* <Suspense fallback={<SectionLoader />}> */}
          <ContentWrapper onLoaded={() => setContentsLoaded(true)}>
            {SECTIONS.map((section) => (
              <div key={section.id}>
                <SectionTransition variant={section.transition} />
                <div className="section-darker">
                  <section.Component />
                </div>
              </div>
            ))}
          </ContentWrapper>
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
