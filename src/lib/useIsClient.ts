import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,  // client snapshot
    () => false, // server snapshot
  );
}
