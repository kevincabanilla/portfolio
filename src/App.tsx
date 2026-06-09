import "./App.css";
import fetcher from "../libs/fetcher";
import useSWR from "swr";
import { ReactLenis } from "lenis/react";

const COUNTER_NAMESPACE = "kevin-cabanilla";
const SWR_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 0,
  dedupingInterval: 1000000,
  revalidateIfStale: false,
} as const;

const LENIS_EASING = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

function App() {
  const shouldFetch = import.meta.env.PROD;
  const { data } = useSWR(
    shouldFetch
      ? `https://api.counterapi.dev/v2/${COUNTER_NAMESPACE}/kbc-portfolio-visits/up`
      : null,
    fetcher,
    SWR_CONFIG,
  );

  const count = (data?.data?.up_count ?? 0) + 1;
  console.log(count);

  return (
    <ReactLenis
      root
      options={{
        duration: 1,
        easing: LENIS_EASING,
      }}
    >
    </ReactLenis>
  );
}

export default App;
