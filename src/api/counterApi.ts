import useSWR from "swr";
import type { CounterUp } from "@/models";

const {
  PROD: isProduction,
  VITE_COUNTER_API_WORKSPACE: counterWorkspace,
  VITE_COUNTER_API_HANDLE: counterApiHandle,
} = import.meta.env;

const BASE_URL = `https://api.counterapi.dev/v2/${counterWorkspace}`;

const SWR_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 0,
  dedupingInterval: Infinity,
  revalidateIfStale: false,
} as const;

const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url, {
    headers: {
      // Authorization: `Bearer ${counterApiToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return (await res.json()) as T;
};

export const useVisitsCounter = () => {
  const shouldFetch = !!(counterWorkspace && counterApiHandle);
  return useSWR(
    shouldFetch ? `${BASE_URL}/${counterApiHandle}` : null,
    fetcher<CounterUp>,
    SWR_CONFIG,
  );
};

export const useNothingCounter = () => {
  return useSWR(
    !isProduction || !counterWorkspace
      ? null
      : `${BASE_URL}/portfolio-nothing-visits/up`,
    fetcher<CounterUp>,
    SWR_CONFIG,
  );
};
