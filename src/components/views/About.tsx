import { motion } from "motion/react";
import { Data, Helper } from "@/utils";
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  staggerContainer,
} from "@/animations";
import PageSection from "../common/ui/PageSection";
import TerminalBadge from "../common/ui/TerminalBadge";
import AboutAvatar from "../contents/about/AboutAvatar";
import AboutGreeting from "../contents/about/AboutGreeting";
import AboutHighlights from "../contents/about/AboutHighlights";
import AboutFavoriteQuote from "../contents/about/AboutFavoriteQuote";
import { useMemo } from "react";
import { useMediaQuery } from "@/hooks";

const { fullName, about } = Data.getPersonalData();

export default function About() {
  const isMobile = useMediaQuery();
  const initials = useMemo(() => Helper.getInitials(fullName), []);

  return (
    <PageSection
      id="about"
      headerTitle="About Myself"
      headerSubtitle="Get to know me"
    >
      <div className="max-w-6xl my-0 mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-14"
          variants={staggerContainer}
        >
          {/* Left - Avatar */}
          <motion.div
            variants={isMobile ? fadeInUp : fadeInLeft}
            className="flex justify-center"
          >
            <div className="scale-80 md:scale-100">
              <AboutAvatar>{initials}</AboutAvatar>
            </div>
          </motion.div>

          {/* Right - Bio */}
          <motion.div variants={isMobile ? fadeInUp : fadeInRight}>
            {/* Status badge */}
            <div className="block mb-5">
              <TerminalBadge size="sm" text={about.status}>
                ~
              </TerminalBadge>
            </div>

            {/* Greeting */}
            <AboutGreeting
              text={about.greeting.replace("{fullName}", fullName)}
            />

            {/* Highlights */}
            <div className="flex flex-col gap-3">
              <AboutHighlights items={about.highlights} />
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="md:col-span-2 flex items-center justify-center w-full pt-12"
          >
            <AboutFavoriteQuote {...about.favoriteQuote} />
          </motion.div>
        </motion.div>
      </div>
    </PageSection>
  );
}
