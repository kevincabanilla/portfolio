import { motion } from "motion/react";
import useSWR from "swr";
import clsx from "clsx";
import { Server, Eye } from "lucide-react";
import { fetcher } from "@/utils";
import { LiveIndicator } from "../common/indicators";

const SWR_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 0,
  dedupingInterval: Infinity,
  revalidateIfStale: false,
} as const;

export default function SystemStatus() {
  const {
    VITE_COUNTER_API_WORKSPACE: counterWorkspace,
    VITE_COUNTER_API_HANDLE: counterApiHandle,
  } = import.meta.env;

  const shouldFetch = !!(counterWorkspace && counterApiHandle);
  const { data } = useSWR(
    shouldFetch
      ? `https://api.counterapi.dev/v2/${counterWorkspace}/${counterApiHandle}`
      : null,
    fetcher,
    SWR_CONFIG,
  );

  const visitors = data?.data?.up_count ?? 0;

  return (
    <motion.div
      className={clsx(
        "hidden md:flex items-center gap-3",
        "fixed bottom-6 left-6 z-50 cursor-default",
        "py-2 px-4 bg-navy/70 backdrop-blur-md",
        "border border-cyan/8 rounded-full shadow-xl",
        "hover:border-cyan/30",
      )}
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, delay: 2.5 },
      }}
      whileHover={{
        y: -2,
      }}
    >
      <Server size={14} className="text-green" />

      <div className="flex items-center justify-center gap-1">
        <LiveIndicator active />

        <span className="font-mono text-[11px] text-gray font-medium ml-1">
          ALL SYSTEMS NOMINAL
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-3 bg-white/15" />

      <div className="flex items-center justify-center gap-1">
        <Eye size={12} color="var(--color-cyan)" />
        <span className="font-mono text-[11px] text-cyan font-semibold">
          {visitors > 0 ? visitors.toLocaleString() : "LIVE"}
        </span>
      </div>
    </motion.div>
  );
}
