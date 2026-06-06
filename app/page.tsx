"use client";

import { useState } from "react";

// ─── EMOTION DATA ───────────────────────────────────────────────────────────

const emotionFamilies = [
  {
    family: "Joy", color: "#EF9F27", light: "#FDF3E0",
    emotions: ["Happiness","Delight","Elation","Euphoria","Contentment","Amusement","Enthusiasm","Bliss","Serenity","Gratitude","Optimism"],
  },
  {
    family: "Love", color: "#D4537E", light: "#FAEDF3",
    emotions: ["Affection","Tenderness","Compassion","Adoration","Warmth","Longing","Devotion","Infatuation","Empathy","Sentimentality"],
  },
  {
    family: "Excitement", color: "#639922", light: "#EAF3DE",
    emotions: ["Anticipation","Eagerness","Thrill","Exhilaration","Curiosity","Wonder","Fascination","Inspiration","Zeal"],
  },
  {
    family: "Calm", color: "#1D9E75", light: "#E1F5EE",
    emotions: ["Tranquility","Peace","Relaxation","Equanimity","Mindfulness","Stillness","Comfort","Ease","Acceptance"],
  },
  {
    family: "Sadness", color: "#378ADD", light: "#E6F1FB",
    emotions: ["Grief","Sorrow","Melancholy","Despair","Loneliness","Regret","Disappointment","Heartache","Nostalgia","Hopelessness"],
  },
  {
    family: "Anxiety", color: "#7F77DD", light: "#EEEDFE",
    emotions: ["Worry","Nervousness","Dread","Apprehension","Unease","Panic","Tension","Restlessness","Hypervigilance"],
  },
  {
    family: "Anger", color: "#D85A30", light: "#FAECE7",
    emotions: ["Frustration","Irritation","Rage","Resentment","Contempt","Indignation","Hostility","Bitterness","Exasperation"],
  },
  {
    family: "Disgust", color: "#E24B4A", light: "#FCEBEB",
    emotions: ["Revulsion","Distaste","Repugnance","Aversion","Loathing","Discomfort"],
  },
  {
    family: "Shame", color: "#534AB7", light: "#EEEDFE",
    emotions: ["Embarrassment","Guilt","Humiliation","Remorse","Regret","Self-reproach","Mortification"],
  },
  {
    family: "Pride", color: "#BA7517", light: "#FAEEDA",
    emotions: ["Confidence","Achievement","Dignity","Self-respect","Honor","Triumph","Fulfillment"],
  },
  {
    family: "Confusion", color: "#888780", light: "#F1EFE8",
    emotions: ["Bewilderment","Uncertainty","Disorientation","Ambivalence","Doubt","Perplexity","Indecision"],
  },
  {
    family: "Apathy", color: "#5F5E5A", light: "#F1EFE8",
    emotions: ["Detachment","Indifference","Numbness","Disengagement","Boredom","Resignation","Listlessness"],
  },
];

const howItWorks = [
  { num: "00", name: "Declare", desc: "You submit how you feel directly via the pulse check. Anonymous. No account needed. Your signal joins the live atlas." },
  { num: "01", name: "Harvest", desc: "Sentira ingests tens of thousands of open web signals every 15 minutes from GDELT 2.0 and global news APIs." },
  { num: "02", name: "Classify", desc: "Each signal is assigned one of 82 named emotions and a topic — disaster, politics, economy, sports, culture, crime." },
  { num: "03", name: "Normalize", desc: "The key innovation. Every emotion is measured against the topic-specific city baseline to produce a deviation score." },
  { num: "04", name: "Visualize", desc: "Deviation scores render onto the live ROYGBIV world atlas with city drilldowns, timelines, and API access." },
];

const solutions = [
  {
    title: "News Intelligence",
    icon: "📡",
    quote: "\"We track civic emotional response to breaking events before editorial consensus forms.\"",
    desc: "Detect how cities emotionally diverge from global baseline the moment a story breaks. Move faster than the narrative.",
  },
  {
    title: "Financial Intelligence",
    icon: "📈",
    quote: "\"Pre-market emotional deviation signals that no traditional data provider offers.\"",
    desc: "City-level emotional deviation indexed against economic events. An independent signal for quantitative models.",
  },
  {
    title: "Institutional Research",
    icon: "🏛️",
    quote: "\"Longitudinal emotional data normalized by topic — a new lens on collective human response.\"",
    desc: "Academic-grade methodology with full audit trail. Topic-normalized baselines. Deviation scoring. City fingerprints.",
  },
  {
    title: "Campaign Intelligence",
    icon: "🎯",
    quote: "\"We time campaign activation against city emotional baselines, not gut instinct.\"",
    desc: "Know when a city is emotionally receptive before you spend. Sponsored pulse checks. Brand sentiment deviation.",
  },
];

const emotions_pulse = [
  { name: "Anger",      color: "#D85A30", def: "A high-energy response to perceived injustice or threat.",     city: "Frustrated"    },
  { name: "Anxiety",    color: "#7F77DD", def: "A state of unease directed at uncertain or unknown outcomes.",  city: "Anxious"       },
  { name: "Calm",       color: "#1D9E75", def: "A settled, low-arousal state of emotional equilibrium.",        city: "Calm"          },
  { name: "Disgust",    color: "#E24B4A", def: "A strong aversion to something perceived as wrong or harmful.", city: "Unsettled"     },
  { name: "Joy",        color: "#EF9F27", def: "A bright, expansive feeling of pleasure or contentment.",       city: "Joyful"        },
  { name: "Love",       color: "#D4537E", def: "A warm connective feeling directed toward others.",             city: "Warm"          },
  { name: "Sadness",    color: "#378ADD", def: "A quiet withdrawal in response to loss or disappointment.",     city: "Melancholic"   },
  { name: "Shame",      color: "#534AB7", def: "A painful awareness of falling short of one's own standards.", city: "Introspective" },
  { name: "Awe",        color: "#639922", def: "A feeling of wonder in response to something vast or profound.",city: "Moved"         },
];

const topics = ["Economy","Politics","Sports","Culture","Disaster","Personal"];

// ─── ROYGBIV color bar ────────────────────────────────────────────────────────

const roygbiv = [
  { label: "R", color: "#D85A30", emotions: "Anger · Disgust" },
  { label: "O", color: "#E87A3A", emotions: "Frustration · Irritation" },
  { label: "Y", color: "#EF9F27", emotions: "Joy · Pride" },
  { label: "G", color: "#1D9E75", emotions: "Calm · Excitement" },
  { label: "B", color: "#378ADD", emotions: "Sadness · Grief" },
  { label: "I", color: "#7F77DD", emotions: "Anxiety · Fear" },
  { label: "V", color: "#534AB7", emotions: "Awe · Shame" },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Home() {
  // Pulse check state
  const [pulseStep, setPulseStep] = useState<"entry" | "processing" | "reveal" | "tile-done">("entry");
  const [selectedTile, setSelectedTile] = useState<{ name: string; color: string; def: string; city: string } | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const [revealEmotion, setRevealEmotion] = useState<{ name: string; color: string; def: string; city: string } | null>(null);
  const [citySync, setCitySync] = useState("");
  const [processingMsg, setProcessingMsg] = useState("Reading your signal...");

  // Waitlist state
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistDone, setWaitlistDone] = useState(false);

  // Pulse check — tile path
  function submitTile() {
    if (!selectedTile) return;
    const msgs = ["Reading your signal...", "Classifying emotion...", "Matching city baseline..."];
    setPulseStep("processing");
    let i = 0;
    const t = setInterval(() => {
      if (i < msgs.length) { setProcessingMsg(msgs[i++]); }
      else { clearInterval(t); setPulseStep("tile-done"); }
    }, 650);
  }

  // Pulse check — text path
  function submitText() {
    const pool = emotions_pulse;
    const em = pool[Math.floor(Math.random() * pool.length)];
    setRevealEmotion(em);
    const syncs = ["You are in sync with your city.", "You are diverging from your city."];
    setCitySync(syncs[Math.floor(Math.random() * 2)]);
    const msgs = ["Reading your signal...", "Classifying emotion...", "Matching city baseline...", "Calculating deviation..."];
    setPulseStep("processing");
    let i = 0;
    const t = setInterval(() => {
      if (i < msgs.length) { setProcessingMsg(msgs[i++]); }
      else { clearInterval(t); setPulseStep("reveal"); }
    }, 650);
  }

  function resetPulse() {
    setPulseStep("entry");
    setSelectedTile(null);
    setSelectedTopic(null);
    setTextInput("");
    setRevealEmotion(null);
  }

  return (
    <main style={{ background: "#F4F0E8", minHeight: "100vh", color: "#0C0F1A" }}>

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.25rem 2rem", borderBottom: "0.5px solid rgba(12,15,26,0.1)",
        background: "#F4F0E8", position: "sticky", top: 0, zIndex: 50,
      }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: "0.05em" }}>
          SENTIRA™ · <span style={{ color: "#0D916A" }}>Deviation Intelligence Platform</span> · Privacy-First
        </span>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {["Check In","Product","How It Works","Solutions"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`}
              style={{ fontSize: 13, color: "#4E5A6E", textDecoration: "none" }}>{l}</a>
          ))}
          <a href="mailto:hello@sentira.net?subject=Enterprise Access Request — Sentira"
            style={{ fontSize: 12, background: "#0C0F1A", color: "#F4F0E8", padding: "8px 16px", borderRadius: 6, textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em" }}>
            Enterprise Access
          </a>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "6rem 2rem 4rem", textAlign: "center" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.12em", color: "#9AAAB8", marginBottom: "1rem", textTransform: "uppercase" }}>
          Sentira™ Emotion Intelligence Platform · Beta Access Open
        </div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1.15, marginBottom: "1.5rem", fontWeight: 400 }}>
          The world has feelings.<br />
          <em style={{ color: "#0D916A" }}>Divergent</em> feelings.
        </h1>
        <p style={{ fontSize: 18, color: "#4E5A6E", maxWidth: 560, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          Not what the world feels. How differently it feels.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "4rem" }}>
          <a href="mailto:hello@sentira.net?subject=Enterprise Access Request — Sentira"
            style={{ background: "#0C0F1A", color: "#F4F0E8", padding: "14px 28px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
            Request enterprise access
          </a>
          <a href="#check-in"
            style={{ background: "transparent", color: "#0C0F1A", padding: "14px 28px", borderRadius: 8, textDecoration: "none", fontSize: 14, border: "0.5px solid rgba(12,15,26,0.25)" }}>
            How are you feeling? →
          </a>
        </div>
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
          {[["82", "Emotions"], ["Global", "Coverage"], ["15m", "Updates"], ["Open Web", "Only"]].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: "#0C0F1A" }}>{val}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#9AAAB8", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PULSE CHECK (DUAL PATH) ──────────────────────────────────────── */}
      <section id="check-in" style={{ maxWidth: 960, margin: "0 auto", padding: "4rem 2rem" }}>

        {/* Demo banner */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10, background: "white",
          border: "0.5px solid rgba(239,159,39,0.4)", borderRadius: 8,
          padding: "10px 16px", marginBottom: "1.5rem", fontSize: 12, color: "#4E5A6E",
        }}>
          <span style={{ background: "#EF9F27", color: "white", borderRadius: 4, padding: "2px 8px", fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, letterSpacing: "0.06em", flexShrink: 0 }}>DEMO</span>
          <span>This is an interactive demo of the Sentira™ pulse check. Colors are illustrative — real-time AI classification launches with the full platform.</span>
        </div>

        <div style={{ background: "white", borderRadius: 12, border: "0.5px solid rgba(12,15,26,0.1)", overflow: "hidden" }}>

          {/* Header */}
          <div style={{ padding: "1.5rem 2rem", borderBottom: "0.5px solid rgba(12,15,26,0.08)" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.1em", color: "#9AAAB8", textTransform: "uppercase", marginBottom: "0.4rem" }}>Layer 0 · Declare</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: "#0C0F1A" }}>
              How are you feeling <em style={{ color: "#0D916A" }}>right now?</em>
            </div>
            <div style={{ fontSize: 13, color: "#4E5A6E", marginTop: "0.3rem" }}>Choose your path — both signals contribute anonymously to the Sentira™ atlas.</div>
          </div>

          {/* Entry step */}
          {pulseStep === "entry" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 0.5px 1fr" }}>

              {/* LEFT — tile path */}
              <div style={{ padding: "1.5rem 2rem" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.1em", color: "#9AAAB8", textTransform: "uppercase", marginBottom: "1rem", display: "flex", alignItems: "center", gap: 8 }}>
                  Choose an emotion
                  <span style={{ background: "#0C0F1A", color: "#F4F0E8", borderRadius: 999, padding: "2px 8px", fontSize: 9 }}>Quick</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: "1.25rem" }}>
                  {emotions_pulse.map(em => (
                    <button key={em.name} onClick={() => setSelectedTile(em)}
                      style={{
                        background: selectedTile?.name === em.name ? em.color + "18" : "white",
                        border: `0.5px solid ${selectedTile?.name === em.name ? em.color : "rgba(12,15,26,0.12)"}`,
                        borderRadius: 8, padding: "10px 6px", cursor: "pointer", textAlign: "center",
                        fontSize: 11, color: selectedTile?.name === em.name ? em.color : "#4E5A6E",
                        fontFamily: "'Manrope', sans-serif", transition: "all 0.12s",
                      }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: em.color, margin: "0 auto 5px" }} />
                      {em.name}
                    </button>
                  ))}
                </div>
                <button onClick={submitTile} disabled={!selectedTile}
                  style={{
                    width: "100%", background: selectedTile ? "#0C0F1A" : "rgba(12,15,26,0.15)",
                    color: selectedTile ? "#F4F0E8" : "#9AAAB8", border: "none", borderRadius: 8,
                    padding: "11px 18px", fontFamily: "'Manrope', sans-serif", fontSize: 13,
                    fontWeight: 500, cursor: selectedTile ? "pointer" : "not-allowed", transition: "all 0.15s",
                  }}>
                  Declare this signal →
                </button>
              </div>

              {/* Divider */}
              <div style={{ background: "rgba(12,15,26,0.1)" }} />

              {/* RIGHT — text path */}
              <div style={{ padding: "1.5rem 2rem" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.1em", color: "#9AAAB8", textTransform: "uppercase", marginBottom: "1rem", display: "flex", alignItems: "center", gap: 8 }}>
                  Describe it yourself
                  <span style={{ background: "#0D916A", color: "white", borderRadius: 999, padding: "2px 8px", fontSize: 9 }}>Expressive</span>
                </div>
                <textarea value={textInput} onChange={e => setTextInput(e.target.value)}
                  placeholder="e.g. I feel unsettled about the news today — nothing specific, just a low hum of dread."
                  style={{
                    width: "100%", background: "#F4F0E8", border: "0.5px solid rgba(12,15,26,0.15)",
                    borderRadius: 8, padding: "12px", fontFamily: "'Manrope', sans-serif",
                    fontSize: 13, color: "#0C0F1A", resize: "none", height: 80,
                    marginBottom: "0.75rem", boxSizing: "border-box",
                  }} />
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#9AAAB8", letterSpacing: "0.08em", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                  Topic (optional)
                </div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: "1rem" }}>
                  {topics.map(t => (
                    <button key={t} onClick={() => setSelectedTopic(selectedTopic === t ? null : t)}
                      style={{
                        padding: "4px 10px", borderRadius: 999, fontSize: 11,
                        border: "0.5px solid rgba(12,15,26,0.15)", cursor: "pointer",
                        fontFamily: "'Manrope', sans-serif", transition: "all 0.12s",
                        background: selectedTopic === t ? "#0C0F1A" : "white",
                        color: selectedTopic === t ? "#F4F0E8" : "#4E5A6E",
                      }}>{t}</button>
                  ))}
                </div>

                {/* Tier 2 — grayed out with coming soon */}
                <div style={{
                  display: "flex", alignItems: "flex-start", gap: 8,
                  background: "rgba(12,15,26,0.04)", border: "0.5px solid rgba(12,15,26,0.08)",
                  borderRadius: 8, padding: "10px 12px", marginBottom: "1rem", opacity: 0.5,
                }}>
                  <input type="checkbox" disabled style={{ width: 14, height: 14, flexShrink: 0, marginTop: 2, cursor: "not-allowed" }} />
                  <div style={{ fontSize: 11, color: "#4E5A6E", lineHeight: 1.6 }}>
                    <strong style={{ color: "#0C0F1A" }}>Save my color history</strong> — track your emotion fingerprint over time.
                    <span style={{ display: "inline-block", marginLeft: 6, background: "#9AAAB8", color: "white", borderRadius: 4, padding: "1px 6px", fontSize: 9, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em", verticalAlign: "middle" }}>COMING SOON</span>
                  </div>
                </div>

                <button onClick={submitText} disabled={!textInput.trim()}
                  style={{
                    width: "100%", background: textInput.trim() ? "#0D916A" : "rgba(12,15,26,0.15)",
                    color: textInput.trim() ? "white" : "#9AAAB8", border: "none", borderRadius: 8,
                    padding: "11px 18px", fontFamily: "'Manrope', sans-serif", fontSize: 13,
                    fontWeight: 500, cursor: textInput.trim() ? "pointer" : "not-allowed", transition: "all 0.15s",
                  }}>
                  Read my signal ✦
                </button>
              </div>
            </div>
          )}

          {/* Processing step */}
          {pulseStep === "processing" && (
            <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: selectedTile?.color || revealEmotion?.color || "#0D916A",
                margin: "0 auto 1.5rem",
                animation: "pulse 1.4s ease-in-out infinite",
              }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#9AAAB8", letterSpacing: "0.08em" }}>
                {processingMsg}
              </div>
              <style>{`@keyframes pulse{0%,100%{transform:scale(0.88);opacity:0.75}50%{transform:scale(1.1);opacity:1}}`}</style>
            </div>
          )}

          {/* Tile-done step */}
          {pulseStep === "tile-done" && selectedTile && (
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#9AAAB8", letterSpacing: "0.06em", marginBottom: "1rem" }}>
                declared · Sentira™ <span style={{ color: "#0D916A" }}>Layer 0</span>
              </div>
              <div style={{
                width: 96, height: 96, borderRadius: "50%", background: selectedTile.color,
                margin: "0 auto 1.25rem", animation: "bloom 0.5s ease-out",
              }} />
              <style>{`@keyframes bloom{from{transform:scale(0.3);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, color: "#0C0F1A", marginBottom: "0.25rem" }}>{selectedTile.name}</div>
              <div style={{ fontSize: 13, color: "#4E5A6E", fontStyle: "italic", marginBottom: "1.5rem" }}>"{selectedTile.def}"</div>
              <div style={{
                display: "flex", alignItems: "center", gap: 10, background: "#F4F0E8",
                border: "0.5px solid rgba(12,15,26,0.08)", borderRadius: 8,
                padding: "12px 16px", marginBottom: "1.5rem", textAlign: "left",
              }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: selectedTile.color, flexShrink: 0 }} />
                <div style={{ fontSize: 12, color: "#4E5A6E", lineHeight: 1.5 }}>
                  <strong style={{ color: "#0C0F1A" }}>Los Angeles is running {selectedTile.city} right now.</strong> Your anonymous signal has been added to the atlas.
                </div>
              </div>
              <button onClick={resetPulse} style={{ background: "transparent", color: "#4E5A6E", border: "0.5px solid rgba(12,15,26,0.15)", borderRadius: 8, padding: "9px 18px", fontSize: 12, cursor: "pointer", fontFamily: "'Manrope', sans-serif" }}>
                Submit another signal
              </button>
            </div>
          )}

          {/* Text reveal step */}
          {pulseStep === "reveal" && revealEmotion && (
            <div style={{ padding: "2rem" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#9AAAB8", letterSpacing: "0.06em", marginBottom: "1rem", textAlign: "center" }}>
                declared · Sentira™ <span style={{ color: "#0D916A" }}>Layer 0</span>
              </div>
              <div style={{
                width: 96, height: 96, borderRadius: "50%", background: revealEmotion.color,
                margin: "0 auto 1.25rem", animation: "bloom 0.5s ease-out",
              }} />
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, color: "#0C0F1A", marginBottom: "0.25rem" }}>{revealEmotion.name}</div>
                <div style={{ fontSize: 13, color: "#4E5A6E", fontStyle: "italic" }}>"{revealEmotion.def}"</div>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 10, background: "#F4F0E8",
                border: "0.5px solid rgba(12,15,26,0.08)", borderRadius: 8,
                padding: "12px 16px", marginBottom: "1rem",
              }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: revealEmotion.color, flexShrink: 0 }} />
                <div style={{ fontSize: 12, color: "#4E5A6E", lineHeight: 1.5 }}>
                  <strong style={{ color: "#0C0F1A" }}>Los Angeles is running {revealEmotion.city}.</strong> {citySync} Deviation: <strong style={{ color: "#0C0F1A" }}>+1.8σ above global baseline.</strong>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <div style={{ fontSize: 12, color: "#9AAAB8", marginBottom: "0.75rem" }}>Your anonymous signal has been added to the Los Angeles atlas.</div>
                <button onClick={resetPulse} style={{ background: "transparent", color: "#4E5A6E", border: "0.5px solid rgba(12,15,26,0.15)", borderRadius: 8, padding: "9px 18px", fontSize: 12, cursor: "pointer", fontFamily: "'Manrope', sans-serif" }}>
                  Submit another signal
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div style={{ padding: "0.75rem 2rem", borderTop: "0.5px solid rgba(12,15,26,0.08)", background: "rgba(12,15,26,0.02)", textAlign: "center", fontSize: 11, color: "#9AAAB8", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}>
            Anonymous signal collection · No personal data stored · No individual tracking
          </div>

        </div>
      </section>

      {/* ── WAITLIST ─────────────────────────────────────────────────────── */}
      <section id="waitlist" style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 2rem 4rem" }}>
        <div style={{ background: "#0C0F1A", borderRadius: 12, padding: "2.5rem", textAlign: "center" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#9AAAB8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Coming Soon</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: "#F4F0E8", marginBottom: "0.5rem" }}>Want your full Sentira™ emotion check-in?</div>
          <div style={{ fontSize: 13, color: "#9AAAB8", marginBottom: "1.5rem" }}>Personal emotion history · Your Emotion Fingerprint · City comparison · $7–12/mo</div>
          {!waitlistDone ? (
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <input type="email" value={waitlistEmail} onChange={e => setWaitlistEmail(e.target.value)}
                placeholder="hello@yourcompany.com"
                style={{ padding: "11px 16px", borderRadius: 8, border: "0.5px solid rgba(244,240,232,0.2)", background: "rgba(244,240,232,0.08)", color: "#F4F0E8", fontSize: 13, fontFamily: "'Manrope', sans-serif", minWidth: 260 }} />
              <button onClick={() => { if (waitlistEmail) setWaitlistDone(true); }}
                style={{ background: "#0D916A", color: "white", border: "none", borderRadius: 8, padding: "11px 20px", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Manrope', sans-serif" }}>
                Join the waitlist
              </button>
            </div>
          ) : (
            <div style={{ color: "#0D916A", fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>✓ You're on the list. We'll be in touch.</div>
          )}
        </div>
      </section>

      {/* ── PRODUCT SCREENSHOTS ─────────────────────────────────────────── */}
      <section id="product" style={{ maxWidth: 960, margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "#9AAAB8", textTransform: "uppercase", marginBottom: "1rem", textAlign: "center" }}>The Platform</div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, textAlign: "center", marginBottom: "3rem", fontWeight: 400 }}>Deviation intelligence, visualized.</h2>

        {/* Full width */}
        <div style={{ background: "white", borderRadius: 10, border: "0.5px solid rgba(12,15,26,0.1)", overflow: "hidden", marginBottom: "1rem" }}>
          <div style={{ background: "#F4F0E8", padding: "8px 14px", borderBottom: "0.5px solid rgba(12,15,26,0.08)", display: "flex", gap: 6 }}>
            {["#E24B4A","#EF9F27","#639922"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
          </div>
          <img src="/dashboard.png" alt="Sentira dashboard" style={{ width: "100%", display: "block" }} />
          <div style={{ padding: "10px 14px", fontSize: 11, color: "#9AAAB8", fontFamily: "'JetBrains Mono', monospace" }}>Live deviation atlas — city emotional fingerprints updated every 15 minutes</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          {[["worldmap.png","World atlas — ROYGBIV deviation map"],["analytics.png","City drilldown — topic-normalized deviation timeline"]].map(([src,cap]) => (
            <div key={src} style={{ background: "white", borderRadius: 10, border: "0.5px solid rgba(12,15,26,0.1)", overflow: "hidden" }}>
              <div style={{ background: "#F4F0E8", padding: "8px 14px", borderBottom: "0.5px solid rgba(12,15,26,0.08)", display: "flex", gap: 6 }}>
                {["#E24B4A","#EF9F27","#639922"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
              </div>
              <img src={`/${src}`} alt={cap} style={{ width: "100%", display: "block" }} />
              <div style={{ padding: "10px 14px", fontSize: 11, color: "#9AAAB8", fontFamily: "'JetBrains Mono', monospace" }}>{cap}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
          {[["mobile.png","Mobile — pulse check"],["comparison.png","City comparison"],["casestudy.png","Case study view"]].map(([src,cap]) => (
            <div key={src} style={{ background: "white", borderRadius: 10, border: "0.5px solid rgba(12,15,26,0.1)", overflow: "hidden" }}>
              <div style={{ background: "#F4F0E8", padding: "8px 14px", borderBottom: "0.5px solid rgba(12,15,26,0.08)", display: "flex", gap: 6 }}>
                {["#E24B4A","#EF9F27","#639922"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
              </div>
              <img src={`/${src}`} alt={cap} style={{ width: "100%", display: "block" }} />
              <div style={{ padding: "10px 14px", fontSize: 11, color: "#9AAAB8", fontFamily: "'JetBrains Mono', monospace" }}>{cap}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EMOTION SPECTRUM ─────────────────────────────────────────────── */}
      <section id="spectrum" style={{ maxWidth: 960, margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "#9AAAB8", textTransform: "uppercase", marginBottom: "1rem", textAlign: "center" }}>The Emotion System</div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, textAlign: "center", marginBottom: "1rem", fontWeight: 400 }}>82 emotions. 12 families. One spectrum.</h2>
        <p style={{ textAlign: "center", color: "#4E5A6E", fontSize: 14, marginBottom: "2.5rem" }}>Lighter shade = gentler emotion · Darker shade = more intense</p>

        {/* ROYGBIV bar */}
        <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", marginBottom: "3rem", height: 48 }}>
          {roygbiv.map(r => (
            <div key={r.label} style={{ flex: 1, background: r.color, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "white", fontWeight: 500 }}>{r.label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {emotionFamilies.map(f => (
            <div key={f.family} style={{ background: "white", borderRadius: 10, border: "0.5px solid rgba(12,15,26,0.08)", padding: "1rem", borderTop: `3px solid ${f.color}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: f.color }} />
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: 15, color: "#0C0F1A" }}>{f.family}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {f.emotions.map(em => (
                  <span key={em} style={{ fontSize: 10, background: f.light, color: f.color, borderRadius: 4, padding: "2px 6px", fontFamily: "'JetBrains Mono', monospace" }}>{em}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" style={{ maxWidth: 960, margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "#9AAAB8", textTransform: "uppercase", marginBottom: "1rem", textAlign: "center" }}>Methodology</div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, textAlign: "center", marginBottom: "0.5rem", fontWeight: 400 }}>Five layers. One truth.</h2>
        <p style={{ textAlign: "center", color: "#9AAAB8", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, marginBottom: "3rem" }}>— Sentira™</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
          {howItWorks.map(l => (
            <div key={l.num} style={{ background: "white", borderRadius: 10, border: "0.5px solid rgba(12,15,26,0.08)", padding: "1.25rem" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, color: "#0D916A", marginBottom: "0.5rem" }}>{l.num}</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, marginBottom: "0.5rem" }}>{l.name}</div>
              <div style={{ fontSize: 12, color: "#4E5A6E", lineHeight: 1.6 }}>{l.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SOLUTIONS ────────────────────────────────────────────────────── */}
      <section id="solutions" style={{ maxWidth: 960, margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "#9AAAB8", textTransform: "uppercase", marginBottom: "1rem", textAlign: "center" }}>Use Cases</div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, textAlign: "center", marginBottom: "3rem", fontWeight: 400 }}>Who buys deviation intelligence.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          {solutions.map(s => (
            <div key={s.title} style={{ background: "white", borderRadius: 10, border: "0.5px solid rgba(12,15,26,0.08)", padding: "1.5rem" }}>
              <div style={{ fontSize: 24, marginBottom: "0.75rem" }}>{s.icon}</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, marginBottom: "0.5rem" }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "#0D916A", fontStyle: "italic", marginBottom: "0.75rem", lineHeight: 1.6 }}>{s.quote}</div>
              <div style={{ fontSize: 13, color: "#4E5A6E", lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "4rem 2rem 6rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, marginBottom: "1rem", fontWeight: 400 }}>Request a demonstration</h2>
        <p style={{ fontSize: 14, color: "#4E5A6E", marginBottom: "2rem" }}>API access · Custom data packages · Enterprise pricing</p>
        <a href="mailto:hello@sentira.net?subject=Enterprise Access Request — Sentira"
          style={{ background: "#0C0F1A", color: "#F4F0E8", padding: "16px 36px", borderRadius: 8, textDecoration: "none", fontSize: 15, fontWeight: 500, display: "inline-block" }}>
          hello@sentira.net →
        </a>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ background: "#0C0F1A", color: "#F4F0E8", padding: "3rem 2rem", textAlign: "center" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, letterSpacing: "0.08em", marginBottom: "0.5rem" }}>SENTIRA™</div>
        <div style={{ fontSize: 12, color: "#9AAAB8", marginBottom: "1rem" }}>Deviation Intelligence Platform</div>
        <div style={{ fontSize: 11, color: "#4E5A6E", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}>
          Anonymous signal collection · No personal data stored · No individual tracking
        </div>
        <div style={{ marginTop: "1rem", fontSize: 11, color: "#4E5A6E" }}>
          © 2026 Andrew Wesley Blackman · hello@sentira.net · sentira.net
        </div>
      </footer>

    </main>
  );
}
