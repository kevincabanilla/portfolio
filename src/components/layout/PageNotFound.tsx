import { motion } from "motion/react";
import { NavLink } from "react-router";
import { AppButton } from "../common/buttons";

export default function PageNotFound() {
  return (
    <motion.div className="h-screen w-screen flex flex-col items-center justify-center gap-4 font-mono">
      <h1 className="text-9xl">404</h1>
      <h2 className="text-6xl">Page Not Found</h2>
      <NavLink to="/">
        <AppButton variant="plain" size="custom" className="mt-6 text-3xl">
          Home
        </AppButton>
      </NavLink>
    </motion.div>
  );
}
