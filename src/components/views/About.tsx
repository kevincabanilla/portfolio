import { motion } from "motion/react";
import { Data, Helper } from "@/utils";
import { fadeInLeft, fadeInRight, staggerContainer } from "@/animations";
import PageSection from "../common/ui/PageSection";
import TerminalBadge from "../common/ui/TerminalBadge";
import AboutAvatar from "../contents/about/AboutAvatar";
import AboutGreeting from "../contents/about/AboutGreeting";
import AboutHighlights from "../contents/about/AboutHighlights";

export default function About() {
  const { fullName, about } = Data.getPersonalData();
  const initials = Helper.getInitials(fullName);

  return (
    <PageSection id="about" title="About Myself" subtitle="Get to know me">
      <div className="max-w-6xl my-0 mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-14"
          variants={staggerContainer}
        >
          {/* Left - Avatar */}
          <motion.div variants={fadeInLeft} className="flex justify-center">
            <div className="scale-80 md:scale-100">
              <AboutAvatar>{initials}</AboutAvatar>
            </div>
          </motion.div>

          {/* Right - Bio */}
          <motion.div variants={fadeInRight}>
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
        </motion.div>
      </div>
    </PageSection>
  );
}
