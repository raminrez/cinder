import { useState } from "react";
import { ComboBox, ListBoxItem } from "@cinder/react";

const INITIAL_ELEMENTS = [
  { id: "hasht", name: "Hashti (Octagonal Vestibule)" },
  { id: "sardar", name: "Sar-Dar (Entrance Portal)" },
  { id: "dalan", name: "Dalan (Indirect Corridor)" },
  { id: "hoor-noor", name: "Hoor-Noor (Zenithal Skylight)" },
];

export function ComboBoxLiveDemo() {
  const [items, setItems] = useState(INITIAL_ELEMENTS);

  const handleCreate = (name: string) => {
    const newItem = {
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name,
    };
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <div className="w-full max-w-sm">
      <ComboBox
        label="Architectural Component"
        placeholder="Type or select a portal element..."
        defaultItems={items}
        allowCreateItem
        onCreateItem={handleCreate}
      >
        {(item: any) => <ListBoxItem id={item.id}>{item.name}</ListBoxItem>}
      </ComboBox>
    </div>
  );
}
