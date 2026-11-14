import { useEffect, useRef } from "react";
import { registerSurface, type SurfaceInput } from "./registry";

export function useAgentSurface(input: SurfaceInput) {
  const latest = useRef(input);
  latest.current = input;
  const handle = useRef<ReturnType<typeof registerSurface> | null>(null);

  useEffect(() => {
    handle.current = registerSurface(latest.current);
    return () => {
      handle.current?.dispose();
      handle.current = null;
    };
  }, []);

  useEffect(() => {
    handle.current?.update(latest.current);
  });
}