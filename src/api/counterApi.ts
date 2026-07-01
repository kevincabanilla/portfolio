import useSWR from "swr";

const {
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

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      // Authorization: `Bearer ${counterApiToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};

export const useVisitsCounter = () => {
  const shouldFetch = !!(counterWorkspace && counterApiHandle);
  return useSWR(
    shouldFetch ? `${BASE_URL}/${counterApiHandle}` : null,
    fetcher,
    SWR_CONFIG,
  );
};
