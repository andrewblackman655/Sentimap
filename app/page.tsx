import Link from "next/link";

// ── 12 emotion families · 82 total emotions ─────────────────────────────────
const emotionFamilies = [
  { family: "Joy", color: "#EF9F27", light: "#FAEEDA", dark: "#633806", emotions: ["Bliss", "Contentment", "Cheerfulness", "Delight", "Joy", "Elation", "Euphoria"] },
  { family: "Love", color: "#D4537E", light: "#FBEAF0", dark: "#4B1528", emotions: ["Fondness", "Warmth", "Tenderness", "Affection", "Compassion", "Love", "Devotion"] },
  { family: "Excitement", color: "#639922", light: "#EAF3DE", dark: "#173404", emotions: ["Curiosity", "Interest", "Wonder", "Enthusiasm", "Excitement", "Awe", "Exhilaration"] },
  { family: "Calm", color: "#1D9E75", light: "#E1F5EE", dark: "#04342C", emotions: ["Openness", "Ease", "Hope", "Serenity", "Calm", "Tranquility", "Peace"] },
  { family: "Sadness", color: "#378ADD", light: "#E6F1FB", dark: "#042C53", emotions: ["Wistfulness", "Longing", "Nostalgia", "Sadness", "Melancholy", "Grief", "Despair"] },
  { family: "Anxiety", color: "#7F77DD", light: "#EEEDFE", dark: "#26215C", emotions: ["Unease", "Nervousness", "Worry", "Anxiety", "Apprehension", "Fear", "Dread"] },
  { family: "Anger", color: "#D85A30", light: "#FAECE7", dark: "#4A1B0C", emotions: ["Irritation", "Annoyance", "Frustration", "Anger", "Indignation", "Rage", "Fury"] },
  { family: "Disgust", color: "#E24B4A", light: "#FCEBEB", dark: "#501313", emotions: ["Distaste", "Displeasure", "Aversion", "Disgust", "Contempt", "Loathing"] },
  { family: "Shame", color: "#534AB7", light: "#EEEDFE", dark: "#26215C", emotions: ["Awkwardness", "Embarrassment", "Regret", "Guilt", "Shame", "Humiliation"] },
  { family: "Pride", color: "#BA7517", light: "#FAEEDA", dark: "#412402", emotions: ["Satisfaction", "Confidence", "Dignity", "Pride", "Achievement", "Triumph"] },
  { family: "Confusion", color: "#888780", light: "#F1EFE8", dark: "#2C2C2A", emotions: ["Uncertainty", "Doubt", "Perplexity", "Confusion", "Bewilderment", "Disorientation"] },
  { family: "Apathy", color: "#5F5E5A", light: "#F1EFE8", dark: "#2C2C2A", emotions: ["Detachment", "Disinterest", "Boredom", "Numbness", "Apathy", "Emptiness"] },
];

const steps = [
  { number: "01", title: "Harvest", color: "#378ADD", desc: "Every 15 minutes, Sentira ingests from GDELT 2.0, Bluesky Jetstream, multilingual news APIs, and Telegram — over 500,000 signals per day in 100+ languages across 247 cities." },
  { number: "02", title: "Classify", color: "#7F77DD", desc: "Each signal is assigned one of 82 nuanced emotions across 12 families using AI-powered language models. Every classification also receives a topic label: disaster, sports, politics, culture, or economy." },
  { number: "03", title: "Normalize", color: "#1D9E75", desc: "Raw scores are measured against Sentira's topic baselines — the expected emotional distribution for that event type. The deviation score is the real signal. This is what makes city-to-city comparison valid." },
  { number: "04", title: "Visualize", color: "#EF9F27", desc: "Deviation scores render onto the live ROYGBIV emotion atlas — the world map of human feeling — with city drilldowns, timeline comparisons, event tracking, and enterprise API access." },
];

const useCases = [
  { icon: "📰", accent: "#378ADD", title: "Media & Journalism", desc: "Track collective emotional response to breaking events as they unfold. Know how the world actually feels — not just what it says — before you publish.", quote: "Sentira flagged a +22pt frustration spike in LA 40 minutes before the story broke nationally." },
  { icon: "📈", accent: "#EF9F27", title: "Financial Intelligence", desc: "Macro sentiment shifts — fear cascades, hope surges, collective apathy — routinely precede market movements. Sentira's deviation signals provide proprietary early-warning intelligence.", quote: "The Shanghai anxiety signal was 2.4σ above baseline three days before the index correction." },
  { icon: "🔬", accent: "#639922", title: "Academic Research", desc: "Population-scale emotional data, ethically sourced and depersonalized. Historical baselines going back to 2015 enable longitudinal studies at global scale.", quote: "The first platform to distinguish Dread from Fear in real-time population data." },
  { icon: "📣", accent: "#D4537E", title: "Brand Strategy", desc: "Know when your target market is in a receptive emotional state. Measure how your campaign lands relative to the emotional baseline — not just the noise floor.", quote: "We delayed the campaign 9 days based on Sentira's signal. The re-timed launch outperformed by 34%." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F4F0E8] text-[#0C0F1A] font-sans">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-black/[0.07] bg-white/92 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-base font-bold tracking-[0.35em] text-[#0C0F1A] uppercase">Sentira</span>
          <div className="flex items-center gap-6 text-sm text-[#4E5A6E]">
            <a href="#product" className="hover:text-[#0C0F1A] transition">Product</a>
            <a href="#how-it-works" className="hover:text-[#0C0F1A] transition">How It Works</a>
            <a href="#spectrum" className="hover:text-[#0C0F1A] transition">Spectrum</a>
            <a href="#use-cases" className="hover:text-[#0C0F1A] transition">Use Cases</a>
            <Link href="/demo" className="bg-[#0C0F1A] text-[#F4F0E8] font-semibold px-4 py-1.5 rounded-full text-sm hover:bg-[#1a2240] transition">
              Try Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-36 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[420px] bg-[#1D9E75]/[0.07] rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#1D9E75]/10 border border-[#1D9E75]/25 text-[#0D916A] text-xs px-4 py-1.5 rounded-full mb-8 font-semibold tracking-[0.15em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0D916A] animate-pulse" />
            Beta Waitlist — Now Open
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6 text-[#0C0F1A]">
            The world has<br />
            <span className="text-[#0D916A] font-light italic">feelings.</span>
          </h1>
          <p className="text-lg text-[#4E5A6E] leading-relaxed max-w-xl mx-auto mb-3 font-light">Now you can read them.</p>
          <p className="text-base text-[#9AAAB8] leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Sentira maps collective human emotion across 247 cities in real time — 82 nuanced emotions, updated every 15 minutes, normalized against global topic baselines so every comparison is valid.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link href="/demo" className="bg-[#0C0F1A] text-[#F4F0E8] font-bold px-8 py-3.5 rounded-full text-base hover:bg-[#1a2240] transition shadow-lg">
              Try the Demo
            </Link>
            <a href="#product" className="border border-black/20 text-[#4E5A6E] px-8 py-3.5 rounded-full text-base hover:bg-black/5 transition">
              See the Product
            </a>
          </div>
          <div className="flex justify-center items-center gap-8 sm:gap-12">
            <div className="text-center"><div className="text-3xl font-bold text-[#0C0F1A]">82</div><div className="text-[10px] uppercase tracking-widest text-[#9AAAB8] mt-1">Emotions</div></div>
            <div className="w-px h-10 bg-black/10" />
            <div className="text-center"><div className="text-3xl font-bold text-[#0C0F1A]">247</div><div className="text-[10px] uppercase tracking-widest text-[#9AAAB8] mt-1">Cities</div></div>
            <div className="w-px h-10 bg-black/10" />
            <div className="text-center"><div className="text-3xl font-bold text-[#0C0F1A]">15m</div><div className="text-[10px] uppercase tracking-widest text-[#9AAAB8] mt-1">Updates</div></div>
            <div className="w-px h-10 bg-black/10" />
            <div className="text-center"><div className="text-3xl font-bold text-[#0C0F1A]">4</div><div className="text-[10px] uppercase tracking-widest text-[#9AAAB8] mt-1">Sources</div></div>
          </div>
        </div>
      </section>

      {/* PRODUCT SCREENSHOTS */}
      <section id="product" className="py-20 px-6 bg-white border-y border-black/[0.07]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#0D916A] font-semibold mb-3">Product Preview</p>
            <h2 className="text-3xl font-bold mb-3 text-[#0C0F1A]">See Sentira in action.</h2>
            <p className="text-[#4E5A6E] max-w-xl mx-auto font-light">A live emotional atlas of the world — 247 cities, 82 emotions, every 15 minutes.</p>
          </div>

          {/* Image 1 — dashboard — full width */}
          <div className="rounded-2xl overflow-hidden border border-black/[0.07] shadow-xl shadow-black/[0.06] mb-5">
            <div className="bg-[#F4F0E8] border-b border-black/[0.07] px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="ml-3 text-xs text-[#9AAAB8] font-mono">app.sentira.net/dashboard</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/dashboard.png"
              alt="Sentira main dashboard — live global emotion map with real-time city data"
              style={{ width: "100%", display: "block" }}
            />
            <div className="px-5 py-3 bg-white border-t border-black/[0.07] flex items-center justify-between">
              <p className="text-xs font-semibold text-[#0C0F1A]">Main Dashboard</p>
              <p className="text-xs text-[#9AAAB8] font-light">Live map · Global Index · Signal feed · Mobile views</p>
            </div>
          </div>

          {/* Images 2 & 3 — worldmap + analytics — side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div className="rounded-2xl overflow-hidden border border-black/[0.07] shadow-md shadow-black/[0.04]">
              <div className="bg-[#F4F0E8] border-b border-black/[0.07] px-4 py-3 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                <span className="ml-2 text-xs text-[#9AAAB8] font-mono">World Map</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/worldmap.png"
                alt="Sentira cartographic world map with vivid emotion-colored city dots"
                style={{ width: "100%", display: "block" }}
              />
              <div className="px-4 py-3 bg-white border-t border-black/[0.07]">
                <p className="text-xs font-semibold text-[#0C0F1A] mb-0.5">Cartographic Emotion Map</p>
                <p className="text-xs text-[#9AAAB8] font-light">Parchment aesthetic · Live city dots · ROYGBIV emotion colors</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-black/[0.07] shadow-md shadow-black/[0.04]">
              <div className="bg-[#F4F0E8] border-b border-black/[0.07] px-4 py-3 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                <span className="ml-2 text-xs text-[#9AAAB8] font-mono">Analytics</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/analytics.png"
                alt="Sentira emotion analytics showing deviation scoring and city comparison"
                style={{ width: "100%", display: "block" }}
              />
              <div className="px-4 py-3 bg-white border-t border-black/[0.07]">
                <p className="text-xs font-semibold text-[#0C0F1A] mb-0.5">Emotion Analytics</p>
                <p className="text-xs text-[#9AAAB8] font-light">Deviation scoring · City comparison · ROYGBIV spectrum</p>
              </div>
            </div>
          </div>

          {/* Images 4, 5, 6 — mobile + comparison + casestudy — three columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="rounded-2xl overflow-hidden border border-black/[0.07] shadow-md shadow-black/[0.04]">
              <div className="bg-[#F4F0E8] border-b border-black/[0.07] px-4 py-3 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                <span className="ml-2 text-xs text-[#9AAAB8] font-mono">Mobile</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/mobile.png"
                alt="Sentira mobile app on iPhone"
                style={{ width: "100%", display: "block" }}
              />
              <div className="px-4 py-3 bg-white border-t border-black/[0.07]">
                <p className="text-xs font-semibold text-[#0C0F1A] mb-0.5">Mobile App</p>
                <p className="text-xs text-[#9AAAB8] font-light">iOS · Emotion map · Live feed</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-black/[0.07] shadow-md shadow-black/[0.04]">
              <div className="bg-[#F4F0E8] border-b border-black/[0.07] px-4 py-3 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                <span className="ml-2 text-xs text-[#9AAAB8] font-mono">Comparison</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/comparison.png"
                alt="3 basic emotions vs 82 Sentira emotions"
                style={{ width: "100%", display: "block" }}
              />
              <div className="px-4 py-3 bg-white border-t border-black/[0.07]">
                <p className="text-xs font-semibold text-[#0C0F1A] mb-0.5">Why Sentira</p>
                <p className="text-xs text-[#9AAAB8] font-light">3 emotions vs 82 · The difference</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-black/[0.07] shadow-md shadow-black/[0.04]">
              <div className="bg-[#F4F0E8] border-b border-black/[0.07] px-4 py-3 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                <span className="ml-2 text-xs text-[#9AAAB8] font-mono">Case Study</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/casestudy.png"
                alt="Los Angeles April vs May 2026 emotional shift"
                style={{ width: "100%", display: "block" }}
              />
              <div className="px-4 py-3 bg-white border-t border-black/[0.07]">
                <p className="text-xs font-semibold text-[#0C0F1A] mb-0.5">Live Case Study</p>
                <p className="text-xs text-[#9AAAB8] font-light">Los Angeles · April vs May 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMOTION SPECTRUM */}
      <section id="spectrum" className="py-16 px-6 border-b border-black/[0.07] bg-[#F4F0E8]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#9AAAB8] mb-1 font-semibold">The Sentira Spectrum</p>
          <p className="text-xs text-[#9AAAB8] mb-8">82 emotions · 12 families · ROYGBIV color system · lighter shade = gentler · darker shade = more intense</p>
          <div className="flex h-1.5 rounded-full overflow-hidden max-w-2xl mx-auto mb-8 gap-0.5">
            {["#E24B4A","#D85A30","#EF9F27","#BA7517","#639922","#1D9E75","#5DCAA5","#378ADD","#7F77DD","#D4537E"].map((c) => (
              <div key={c} className="flex-1 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <div className="flex flex-col gap-3 text-left max-w-4xl mx-auto">
            {emotionFamilies.map((f) => (
              <div key={f.family} className="flex items-start gap-3">
                <span className="text-[10px] uppercase tracking-widest min-w-[80px] pt-1 font-semibold" style={{ color: f.color }}>
                  {f.family}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {f.emotions.map((e, i) => (
                    <span key={e} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{
                      background: i < 3 ? f.light : i < 5 ? f.color + "50" : f.color,
                      color: i < 3 ? f.dark : i < 5 ? f.dark : "#fff",
                      border: `1px solid ${f.color}25`,
                    }}>
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6 bg-white border-b border-black/[0.07]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#0D916A] font-semibold mb-3">How Sentira Works</p>
            <h2 className="text-3xl font-bold mb-3 text-[#0C0F1A]">Four layers. One truth.</h2>
            <p className="text-[#4E5A6E] max-w-xl mx-auto font-light">From raw digital noise to a live emotional atlas of the world.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div key={s.number} className="bg-[#F4F0E8] border border-black/[0.07] rounded-2xl p-6 flex flex-col gap-3 hover:shadow-md hover:border-black/15 transition">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-[10px] uppercase tracking-widest text-[#9AAAB8] font-semibold">Layer {s.number}</span>
                </div>
                <span className="text-4xl font-black text-[#0C0F1A]/[0.08]">{s.number}</span>
                <h3 className="text-base font-semibold text-[#0C0F1A]">{s.title}</h3>
                <p className="text-sm text-[#4E5A6E] leading-relaxed font-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section id="use-cases" className="py-24 px-6 bg-[#F4F0E8] border-b border-black/[0.07]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#0D916A] font-semibold mb-3">Who It&apos;s For</p>
            <h2 className="text-3xl font-bold mb-3 text-[#0C0F1A]">Built for those who need to understand humanity.</h2>
            <p className="text-[#4E5A6E] max-w-xl mx-auto font-light">From breaking news to market intelligence — Sentira gives you the emotional signal nobody else has.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {useCases.map((u) => (
              <div key={u.title} className="bg-white border border-black/[0.07] rounded-2xl p-6 hover:border-black/15 hover:shadow-sm transition relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] opacity-0 hover:opacity-100 transition" style={{ background: u.accent }} />
                <div className="flex gap-4 mb-4">
                  <span className="text-3xl">{u.icon}</span>
                  <div>
                    <h3 className="font-semibold mb-1 text-[#0C0F1A]">{u.title}</h3>
                    <p className="text-sm text-[#4E5A6E] leading-relaxed font-light">{u.desc}</p>
                  </div>
                </div>
                <div className="rounded-lg px-4 py-3 text-sm italic font-light text-[#4E5A6E] border-l-2" style={{ background: u.accent + "10", borderColor: u.accent }}>
                  &ldquo;{u.quote}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center bg-white">
        <div className="max-w-2xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#0D916A] font-semibold mb-4">Early Access</p>
          <h2 className="text-4xl font-extrabold mb-4 text-[#0C0F1A]">
            See the world&apos;s mood,{" "}
            <span className="text-[#0D916A] italic font-light">right now.</span>
          </h2>
          <p className="text-[#4E5A6E] mb-10 font-light leading-relaxed">
            Explore the interactive demo — city-level emotion aggregation, timeline playback, and topic filters, running live in your browser.
          </p>
          <Link href="/demo" className="inline-block bg-[#0C0F1A] text-[#F4F0E8] font-bold px-10 py-4 rounded-full text-lg hover:bg-[#1a2240] transition shadow-xl">
            Launch Demo
          </Link>
          <p className="text-xs text-[#9AAAB8] mt-6">
            Enterprise inquiries:{" "}
            <a href="mailto:hello@sentira.net" className="text-[#0D916A] hover:underline">hello@sentira.net</a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/[0.07] py-10 px-6 bg-[#0C0F1A]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[#F4F0E8] font-bold tracking-[0.35em] text-sm uppercase mb-1">Sentira</p>
            <p className="text-white/30 text-xs">Signal · Emotion · Nuance · Trends · Insight · Real-time · Atlas</p>
          </div>
          <p className="text-white/25 text-xs text-center sm:text-right">
            © {new Date().getFullYear()} Sentira — Andrew Wesley Blackman<br />
            Simulated data demo · Data sourced ethically · No individual tracking
          </p>
        </div>
      </footer>

    </div>
  );
}

