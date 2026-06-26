import { useEffect, type JSX } from "react";
import { ReactLenis } from "lenis/react";
import { NavItemEnum } from "@/models";
import { Helper } from "@/utils";
import { Navigation, BackToTop, Footer, SystemStatus } from ".";
import {
  ScrollProgressBar,
  SectionTransition,
  type TransitionVariant,
} from "@/components/common/ui";
import { About, Contact, Hero, Skills } from "@/components/views";

const LENIS_EASING = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

type SectionItem = {
  id: string;
  label: string;
  Component: () => JSX.Element;
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
    transition: "Beam",
  },
];

export default function MainContainer() {
  // Auto scroll to section when url is loaded with hash
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const targetId = hash.slice(1);
    const exists = SECTIONS.some((x) => x.id === targetId);

    if (exists) {
      Helper.scrollToId(hash);
    }
  }, []);

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
        <Navigation navItems={SECTIONS} />
        <main>
          <Hero />

          {SECTIONS.map((section, idx) => (
            <div key={section.id}>
              <SectionTransition variant={section.transition} />
              <div
                className={idx % 2 == 0 ? "bg-navy/15 backdrop-blur-sm" : ""}
              >
                <section.Component />
              </div>
            </div>
          ))}
        </main>
        <Footer />
        <BackToTop />
        <SystemStatus />
      </div>
    </ReactLenis>
  );
}
