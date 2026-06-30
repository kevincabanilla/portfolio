import { type JSX } from "react";
import HeroContent from "../contents/hero/HeroContent";
import HeroScrollDown from "../contents/hero/HeroScrollDown";
import { Helper } from "@/utils";
import { HeroBackground } from "../3D/backgrounds";
import { AuroraBlobs } from "../common/backgrounds";

const webGLSupported = Helper.hasWebGL();

export default function Hero(): JSX.Element {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {webGLSupported && (
        <div className="absolute inset-0 -z-1 pointer-events-none backdrop-blur-md">
          <AuroraBlobs />
          <HeroBackground />
        </div>
      )}

      {/* Gradient redial eclipse overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,color-mix(in_srgb,var(--color-cyan)_6%,transparent)_0%,transparent_70%)]" />

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid" />

      {/* Top left ambient background glow */}
      <div className="absolute top-[10%] left-[20%] size-125 rounded-full blur-[60px] bg-radial from-cyan-500/8 to-transparent" />

      {/* Bottom right ambient background glow */}
      <div className="absolute bottom-[10%] right-[10%] size-100 rounded-full blur-[60px] bg-radial from-purple-500/6 to-transparent" />

      <HeroContent />

      {/* Scroll indicator */}
      <HeroScrollDown />
    </section>
  );
}
