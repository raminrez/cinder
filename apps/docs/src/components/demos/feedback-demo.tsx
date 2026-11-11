import { useState } from "react";
import { Badge, Tag, Meter } from "@cinder/react";

export function FeedbackLiveDemo() {
  const [meterValue, setMeterValue] = useState(72);
  const [tags, setTags] = useState([
    "WCAG AAA",
    "Persian Geometry",
    "Astro Fumadocs",
    "Tailwind v4",
  ]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-md items-center">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge variant="neutral">Neutral 01</Badge>
        <Badge variant="info">Hashti Portal</Badge>
        <Badge variant="success">WCAG AAA</Badge>
        <Badge variant="warning">Amber Glaze</Badge>
        <Badge variant="danger">Critical Alert</Badge>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {tags.map((tag) => (
          <Tag
            key={tag}
            type="dismissible"
            onDismiss={() => setTags((prev) => prev.filter((t) => t !== tag))}
          >
            {tag}
          </Tag>
        ))}
      </div>

      {/* Meter */}
      <div className="w-full space-y-2">
        <div className="flex justify-between text-xs text-neutral-500">
          <span>Portal Vault Integrity</span>
          <span className="font-mono">{meterValue}%</span>
        </div>
        <Meter value={meterValue} low={25} high={75} optimum={90} aria-label="Vault Integrity" />
        <input
          type="range"
          min="0"
          max="100"
          value={meterValue}
          onChange={(e) => setMeterValue(Number(e.target.value))}
          className="w-full accent-[#08bdba] cursor-pointer"
        />
      </div>
    </div>
  );
}
