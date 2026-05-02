"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Post, EMOTIONS, EMOTION_COLORS } from "@/lib/data";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface EmotionBarProps {
  posts: Post[];
  city: string;
}

export default function EmotionBar({ posts, city }: EmotionBarProps) {
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const e of EMOTIONS) c[e] = 0;
    for (const p of posts) c[p.emotion]++;
    return c;
  }, [posts]);

  const data: Plotly.Data[] = [
    {
      type: "bar",
      x: EMOTIONS as unknown as string[],
      y: EMOTIONS.map((e) => counts[e]),
      marker: { color: EMOTIONS.map((e) => EMOTION_COLORS[e]) },
    } as Plotly.Data,
  ];

  const layout: Partial<Plotly.Layout> = {
    title: { text: `${city} — Emotion Breakdown`, font: { color: "#fff", size: 13 } },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    xaxis: { tickfont: { color: "#aaa", size: 11 }, gridcolor: "rgba(255,255,255,0.05)" },
    yaxis: { tickfont: { color: "#aaa" }, gridcolor: "rgba(255,255,255,0.05)" },
    margin: { l: 30, r: 10, t: 40, b: 60 },
    height: 260,
  };

  return (
    <Plot
      data={data}
      layout={layout}
      config={{ displayModeBar: false, responsive: true }}
      style={{ width: "100%" }}
    />
  );
}
