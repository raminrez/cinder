import { useState } from "react";
import { Button } from "@cinder/react";

export function ButtonLiveDemo() {
  const [clicked, setClicked] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="primary" onPress={() => setClicked((c) => c + 1)}>
          Primary
        </Button>
        <Button variant="secondary" onPress={() => setClicked((c) => c + 1)}>
          Secondary
        </Button>
        <Button variant="tertiary" onPress={() => setClicked((c) => c + 1)}>
          Tertiary
        </Button>
        <Button variant="ghost" onPress={() => setClicked((c) => c + 1)}>
          Ghost
        </Button>
        <Button variant="danger" onPress={() => setClicked((c) => c + 1)}>
          Danger
        </Button>
      </div>
      {clicked > 0 && (
        <span className="text-xs text-neutral-500 font-mono">
          Clicked {clicked} {clicked === 1 ? "time" : "times"}
        </span>
      )}
    </div>
  );
}
