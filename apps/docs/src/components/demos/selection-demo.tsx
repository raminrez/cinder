import { useState } from "react";
import { Checkbox, RadioGroup, Radio, Switch } from "@hashti/react";

export function SelectionLiveDemo() {
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState("octagonal");
  const [switched, setSwitched] = useState(true);

  return (
    <div className="flex flex-col md:flex-row items-start justify-center gap-8 w-full max-w-lg">
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Checkbox
        </span>
        <Checkbox isSelected={checked} onChange={setChecked}>
          Zenithal Skylight (Hoor-Noor)
        </Checkbox>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Radio Group
        </span>
        <RadioGroup value={radio} onChange={setRadio} aria-label="Portal Geometry">
          <Radio value="octagonal">Octagonal</Radio>
          <Radio value="quadrilateral">Quadrilateral</Radio>
          <Radio value="circular">Circular Vault</Radio>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Switch
        </span>
        <Switch isSelected={switched} onChange={setSwitched}>
          Indirect Angle
        </Switch>
      </div>
    </div>
  );
}
