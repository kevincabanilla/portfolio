import { motion } from "motion/react";
import { NavLink } from "react-router";
import { AppButton } from "../common/buttons";
import { InteractiveConstellation2 } from "../common/backgrounds";

export default function PageNotFound() {
  return (
    <>
      <InteractiveConstellation2 />
      <motion.div className="h-screen w-screen p-6 flex flex-col items-center justify-center text-center gap-4 font-mono">
        <h1 className="text-7xl md:text-9xl font-black text-rose-600">404</h1>
        <h2 className="text-3xl md:text-6xl font-bold gradient-text-vivid">
          How did you get here?
        </h2>
        <p className="text-2xl md:text-4xl text-primary">
          There's nothing to see
          <NavLink to="/nothing">
            &nbsp;<span className="underline">here</span>
          </NavLink>
          .
        </p>
        <p className="text-lg md:text-2xl text-secondary">
          {/* How about you
          <AppButton variant="plain" size="custom">
            &nbsp;play&nbsp;
          </AppButton>
          a game with me? Or just */}
          Go to&nbsp;
          <NavLink to="/">
            <AppButton variant="plain" size="custom">
              home
            </AppButton>
          </NavLink>
          &nbsp;page.
        </p>
      </motion.div>
    </>
  );
}
