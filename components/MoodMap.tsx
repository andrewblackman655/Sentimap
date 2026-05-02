"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { CityAggregate, EMOTION_COLORS, EMOTIONS } from "@/lib/data";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface MoodMapProps {
  cityAgg: CityAggregate[];
}

export default function MoodMap({ cityAgg }: MoodMapProps) {
  const { sizes, colors, hoverText } = useMemo(() => {
    const maxCount = Math.max(...cityAgg.map((c) => c.count), 1);
    const sizes = cityAgg.map((c) => 12 + 28 * (Math.log(c.count + 1) / Math.log(maxCount + 1)));
    const colors = cityAgg.map((c) => EMOTION_COLORS[c.dominantEmotion]);
    const hoverText = cityAgg.map(
      (c) =>
        `<b>${c.city}</b><br>Posts: ${c.count}<br>Dominant: ${c.dominantEmotion} (${Math.round(c.dominantPct * 100)}%)`
    );
    return { sizes, colors, hoverText };
  }, [cityAgg]);

  const data: Plotly.Data[] = [
    {
      type: "scattergeo",
      lon: cityAgg.map((c) => c.lon),
      lat: cityAgg.map((c) => c.lat),
      text: hoverText,
      mode: "markers",
      marker: {
        size: sizes,
        color: colors,
        opacity: 0.9,
        line: { width: 1, color: "rgba(255,255,255,0.35)" },
      },
      hoverinfo: "text",
    } as Plotly.Data,
  ];

  const layout: Partial<Plotly.Layout> = {
    geo: {
      projection: { type: "natural earth" } as { type: string },
      showland: true,
      landcolor: "#161a23",
      showocean: true,
      oceancolor: "#0b1020",
      showcountries: true,
      countrycolor: "rgba(255,255,255,0.12)",
      coastlinecolor: "rgba(255,255,255,0.12)",
      showlakes: true,
      lakecolor: "#0b1020",
      bgcolor: "rgba(0,0,0,0)",
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    margin: { l: 0, r: 0, t: 0, b: 0 },
    height: 520,
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10">
      {cityAgg.length === 0 ? (
        <div
          className="flex items-center justify-center text-white/40 text-sm"
          style={{ height: 520, background: "#0b1020" }}
        >
          No data in the selected window.
        </div>
      ) : (
        <Plot
          data={data}
          layout={layout}
          config={{ displayModeBar: false, responsive: true }}
          style={{ width: "100%" }}
        />
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-3 px-4 py-3 bg-black/30 border-t border-white/10">
        {EMOTIONS.map((emo) => (
          <div key={emo} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-sm border border-white/20"
              style={{ background: EMOTION_COLORS[emo] }}
            />
            <span className="text-xs text-white/70">{emo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
