"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MoodMap from "@/components/MoodMap";
import EmotionBar from "@/components/EmotionBar";
import {
  CITIES,
  EMOTION_COLORS,
  TOPICS,
  Topic,
  aggregateByCity,
  filterPosts,
  generatePosts,
  Post,
} from "@/lib/data";

const N_POSTS = 200;
const HOURS = 6;
const SEED = 20250302;

export default function DemoPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [topic, setTopic] = useState<Topic>("All Topics");
  const [windowMinutes, setWindowMinutes] = useState(90);
  const [cursorOffset, setCursorOffset] = useState(HOURS * 60); // minutes from start
  const [autoplay, setAutoplay] = useState(false);
  const [selectedCity, setSelectedCity] = useState("(auto) Top city");
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Generate posts once on mount
  useEffect(() => {
    setPosts(generatePosts(N_POSTS, HOURS, SEED));
  }, []);

  const startMs = useMemo(() => {
    if (posts.length === 0) return Date.now() - HOURS * 3600 * 1000;
    return posts[0].timestamp.getTime();
  }, [posts]);

  const totalMinutes = HOURS * 60;

  const cursor = useMemo(
    () => new Date(startMs + cursorOffset * 60 * 1000),
    [startMs, cursorOffset]
  );

  const filtered = useMemo(
    () => filterPosts(posts, cursor, windowMinutes, topic),
    [posts, cursor, windowMinutes, topic]
  );

  const cityAgg = useMemo(() => aggregateByCity(filtered), [filtered]);

  // Autoplay
  useEffect(() => {
    if (autoplay) {
      autoRef.current = setInterval(() => {
        setCursorOffset((prev) => {
          const next = prev + 15;
          return next > totalMinutes ? 0 : next;
        });
      }, 700);
    } else {
      if (autoRef.current) clearInterval(autoRef.current);
    }
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [autoplay, totalMinutes]);

  const topCity = cityAgg[0]?.city ?? null;
  const activeCityName = selectedCity === "(auto) Top city" ? topCity : selectedCity;
  const cityPosts = filtered.filter((p) => p.city === activeCityName);
  const dominantEmotion = cityPosts.length
    ? cityPosts.reduce((acc, p) => {
        acc[p.emotion] = (acc[p.emotion] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    : null;
  const dominant = dominantEmotion
    ? Object.entries(dominantEmotion).sort((a, b) => b[1] - a[1])[0][0]
    : null;
  const dominantPct = dominant && dominantEmotion
    ? Math.round((dominantEmotion[dominant] / cityPosts.length) * 100)
    : 0;

  const windowStart = new Date(cursor.getTime() - windowMinutes * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().slice(11, 16);

  return (
    <div className="min-h-screen bg-[#0b1020] text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-[#FFD54F]">Mood</span>Ring
          </span>
        </a>
        <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">
          Simulated Data Demo
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Left: map + controls */}
        <div className="flex flex-col gap-4">
          <MoodMap cityAgg={cityAgg} />

          {/* Timeline */}
          <div className="bg-white/5 rounded-xl border border-white/10 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>
                Window: {fmt(windowStart)} → {fmt(cursor)} UTC
              </span>
              <span>{filtered.length} posts</span>
            </div>

            <input
              type="range"
              min={windowMinutes}
              max={totalMinutes}
              step={15}
              value={cursorOffset}
              onChange={(e) => setCursorOffset(Number(e.target.value))}
              className="w-full accent-[#FFD54F]"
            />

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setAutoplay((v) => !v)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  autoplay
                    ? "bg-[#FFD54F] text-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {autoplay ? "⏸ Pause" : "▶ Autoplay"}
              </button>

              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value as Topic)}
                className="bg-white/10 border border-white/10 text-white text-sm rounded-lg px-3 py-1.5 outline-none"
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t} className="bg-[#161a23]">
                    {t}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2 text-sm text-white/60">
                <span>Window:</span>
                <select
                  value={windowMinutes}
                  onChange={(e) => setWindowMinutes(Number(e.target.value))}
                  className="bg-white/10 border border-white/10 text-white text-sm rounded-lg px-2 py-1.5 outline-none"
                >
                  {[15, 30, 60, 90, 120, 180].map((m) => (
                    <option key={m} value={m} className="bg-[#161a23]">
                      {m}m
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right: city drilldown */}
        <div className="flex flex-col gap-4">
          <div className="bg-white/5 rounded-xl border border-white/10 p-4 flex flex-col gap-4">
            <div>
              <h2 className="text-sm font-semibold text-white/80 mb-2">City Spotlight</h2>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-white/10 border border-white/10 text-white text-sm rounded-lg px-3 py-2 outline-none"
              >
                <option value="(auto) Top city" className="bg-[#161a23]">
                  (auto) Top city
                </option>
                {CITIES.map((c) => (
                  <option key={c.name} value={c.name} className="bg-[#161a23]">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {activeCityName && dominant ? (
              <>
                <div>
                  <p className="text-lg font-bold">{activeCityName}</p>
                  <p className="text-sm text-white/50 mt-0.5">
                    Dominant:{" "}
                    <span
                      className="font-semibold"
                      style={{
                        color: EMOTION_COLORS[dominant as keyof typeof EMOTION_COLORS],
                      }}
                    >
                      {dominant}
                    </span>{" "}
                    ({dominantPct}%)
                  </p>
                </div>

                <EmotionBar posts={cityPosts} city={activeCityName} />

                <div>
                  <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">
                    Recent Posts
                  </p>
                  <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
                    {cityPosts
                      .slice()
                      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                      .slice(0, 8)
                      .map((p, i) => (
                        <div key={i} className="bg-white/5 rounded-lg p-2.5 text-xs">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white/40">{fmt(p.timestamp)}</span>
                            <span className="text-white/40">[{p.topic}]</span>
                            <span
                              className="font-semibold"
                              style={{
                                color: EMOTION_COLORS[p.emotion],
                              }}
                            >
                              {p.emotion}
                            </span>
                          </div>
                          <p className="text-white/70 leading-relaxed">{p.text}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-white/40">No posts in current window.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
