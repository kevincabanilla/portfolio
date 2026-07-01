import { useEffect, type JSX } from "react";
import { ReactLenis } from "lenis/react";
import { NavItemEnum } from "@/models";
import { Helper, EASE_OUT_EXPO } from "@/utils";
import { Navigation, BackToTop, Footer, SystemStatus } from ".";
import {
  ScrollProgressBar,
  SectionTransition,
  type TransitionVariant,
} from "@/components/common/ui";
import { About, Contact, Hero, Skills } from "@/components/views";
import { BackgroundStars } from "../common/backgrounds";

type SectionItem = {
  id: string;
  label: string;
  icon: string;
  Component: () => JSX.Element;
  transition: TransitionVariant;
};

const SECTIONS: SectionItem[] = [
  {
    id: NavItemEnum.About,
    label: "About",
    icon: "CircleUserRound",
    Component: About,
    transition: "GradientSweep",
  },
  {
    id: NavItemEnum.Skills,
    label: "Skills",
    icon: "Code2",
    Component: Skills,
    transition: "GeometricScatter",
  },
  {
    id: NavItemEnum.Contact,
    label: "Contact",
    icon: "Mail",
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
        easing: EASE_OUT_EXPO,
      }}
    >
      <ScrollProgressBar />
      <BackgroundStars />

      <div className="relative min-h-screen">
        <Navigation navItems={SECTIONS} />
        <main>
          <Hero />

          {SECTIONS.map((section, idx) => (
            <div key={section.id}>
              <SectionTransition variant={section.transition} />
              <div className={idx % 2 == 0 ? "bg-navy/40" : ""}>
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
