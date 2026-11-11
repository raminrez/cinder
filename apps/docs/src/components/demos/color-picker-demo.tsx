import { useState } from "react";
import { ColorPicker, parseColor, type Color } from "@cinder/react";

export function ColorPickerLiveDemo() {
  const [color, setColor] = useState<Color>(parseColor("#08bdba"));

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-xs">
      <ColorPicker
        label="Portal Accent Color"
        value={color}
        onChange={setColor}
        showAlpha
        showHexField
        showSwatch
      />
      <div className="text-xs text-neutral-500 font-mono">
        Active Color: {color.toString("hex")}
      </div>
    </div>
  );
}
