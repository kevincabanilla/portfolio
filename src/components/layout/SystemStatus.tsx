import { motion } from "motion/react";
import useSWR from "swr";
import clsx from "clsx";
import { Server, ServerOff, Eye } from "lucide-react";
import { fetcher } from "@/utils";
import { LiveIndicator } from "../common/indicators";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

const SWR_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 0,
  dedupingInterval: Infinity,
  revalidateIfStale: false,
} as const;

export default function SystemStatus() {
  const isOnline = useOnlineStatus();
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
  const ServerIcon = isOnline ? Server : ServerOff;

  return (
    <motion.div
      className={clsx(
        "flex items-center gap-3 cursor-default",
        "md:fixed md:bottom-6 md:left-6 md:z-50 md:rounded-full",
        "py-2 px-4 bg-navy/70 backdrop-blur-md shadow-xl",
        "border border-cyan/8 hover:border-cyan/30",
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
      <ServerIcon size={14} className={isOnline ? "text-green" : "text-red"} />

      <div className="flex items-center justify-center gap-1">
        <LiveIndicator active={isOnline} color={isOnline ? "green" : "red"} />

        <span
          className={clsx(
            "font-mono text-[11px] font-medium ml-1",
            isOnline ? "text-gray" : "text-red",
          )}
        >
          {isOnline ? "ALL SYSTEMS NOMINAL" : "OFFLINE"}
        </span>
      </div>

      {isOnline && (
        <>
          {/* Divider */}
          <div className="w-px h-3 bg-white/15" />

          <div className="flex items-center justify-center gap-1">
            {visitors > 0 && <Eye size={12} color="var(--color-cyan)" />}
            <span className="font-mono text-[11px] text-cyan font-semibold">
              {visitors > 0 ? visitors.toLocaleString() : "ONLINE"}
            </span>
          </div>
        </>
      )}
    </motion.div>
  );
}
