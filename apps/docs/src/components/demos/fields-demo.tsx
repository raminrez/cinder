import { useState } from "react";
import {
  TextField,
  TextArea,
  NumberField,
  SearchField,
  TimeField,
  DatePicker,
  DateRangePicker,
  InputOTP,
  Autocomplete,
  ListBoxItem,
} from "@hashti/react";

export function TextFieldLiveDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      <TextField
        label="Architectural Workspace Name"
        description="Enter the identifier for your Hashti environment."
        placeholder="e.g. Isfahan Pavilion"
        value={value}
        onChange={setValue}
      />
      <TextArea
        label="Spatial Notes"
        placeholder="Diffuse zenithal light and masonry bench observations..."
        rows={3}
      />
    </div>
  );
}

export function NumberFieldLiveDemo() {
  const [val, setVal] = useState<number | null>(44);
  return (
    <div className="w-full max-w-xs">
      <NumberField
        label="Touch Target Height (px)"
        description="Standard ergonomic touch boundary in pixels."
        value={val}
        onChange={setVal}
        minValue={24}
        maxValue={96}
        step={4}
      />
    </div>
  );
}

export function SearchFieldLiveDemo() {
  const [query, setQuery] = useState("");
  return (
    <div className="w-full max-w-sm">
      <SearchField
        label="Search Architectural Records"
        placeholder="Search vaults, portals, tokens..."
        value={query}
        onChange={setQuery}
      />
    </div>
  );
}

export function TimeFieldLiveDemo() {
  return (
    <div className="w-full max-w-xs flex flex-col gap-4">
      <TimeField label="Zenithal Illumination Peak" />
    </div>
  );
}

export function DatePickerLiveDemo() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-5">
      <DatePicker label="Observation Date" />
      <DateRangePicker label="Exhibition Window" />
    </div>
  );
}

export function InputOTPLiveDemo() {
  const [otp, setOtp] = useState("");
  return (
    <div className="flex flex-col items-center gap-3">
      <InputOTP
        maxLength={6}
        value={otp}
        onChange={setOtp}
        aria-label="Two-factor authentication code"
      />
      <span className="text-xs text-neutral-500 font-mono">
        Entered: {otp || "------"}
      </span>
    </div>
  );
}

export function AutocompleteLiveDemo() {
  return (
    <div className="w-full max-w-sm">
      <Autocomplete
        label="Architectural Component"
        placeholder="Type to filter..."
        defaultItems={[
          { id: "darvazeh", name: "Darvazeh Portal" },
          { id: "hashti", name: "Hashti Vestibule" },
          { id: "dalan", name: "Dalan Bent Corridor" },
          { id: "hayati", name: "Hayati Courtyard Pool" },
          { id: "howz", name: "Howz Turquoise Basin" },
        ]}
      >
        {(item: any) => <ListBoxItem id={item.id}>{item.name}</ListBoxItem>}
      </Autocomplete>
    </div>
  );
}
