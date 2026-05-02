import Link from "next/link";

const emotions = [
  { label: "Joy", color: "#FFD54F" },
  { label: "Sadness", color: "#42A5F5" },
  { label: "Anger", color: "#EF5350" },
  { label: "Fear / Anxiety", color: "#7E57C2" },
  { label: "Calm", color: "#26A69A" },
  { label: "Excitement", color: "#FF7043" },
  { label: "Disgust", color: "#8D6E63" },
  { label: "Confusion", color: "#BDBDBD" },
];

const steps = [
  {
    number: "01",
    title: "Ingest",
    desc: "Public digital signals — social posts, news feeds — are collected in real time across the globe.",
  },
  {
    number: "02",
    title: "Classify",
    desc: "Each signal is classified into one of eight nuanced emotional categories using AI-powered language models.",
  },
  {
    number: "03",
    title: "Aggregate",
    desc: "Signals are grouped by geography and time window, producing weighted emotional distributions per region.",
  },
  {
    number: "04",
    title: "Visualize",
    desc: "The result is a live, color-coded world map — an emotional weather layer over the information ecosystem.",
  },
];

const useCases = [
  {
    icon: "📰",
    title: "Media & Newsrooms",
    desc: "Instant visual context for breaking events. See how audiences react as stories unfold.",
  },
  {
    icon: "📈",
    title: "Financial Analysts",
    desc: "Aggregate sentiment tied to economic topics may surface early signals of volatility or confidence shifts.",
  },
  {
    icon: "🔬",
    title: "Research Institutions",
    desc: "Structured, aggregated datasets for computational social science, political science, and psychology.",
  },
  {
    icon: "📣",
    title: "Brands & Agencies",
    desc: "Geographic emotional layers that complement traditional dashboards and reveal regional nuance.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0b1020] text-white font-sans">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0b1020]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight">
            <span className="text-[#FFD54F]">Mood</span>Ring
          </span>
          <div className="flex items-center gap-6 text-sm text-white/60">
            <a href="#how-it-works" className="hover:text-white transition">
              How It Works
            </a>
            <a href="#use-cases" className="hover:text-white transition">
              Use Cases
            </a>
            <Link
              href="/demo"
              className="bg-[#FFD54F] text-black font-semibold px-4 py-1.5 rounded-full text-sm hover:bg-yellow-300 transition"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#FFD54F]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 text-xs px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#26A69A] animate-pulse" />
            Real-time emotional intelligence
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            The world&apos;s emotional
            <br />
            <span className="text-[#FFD54F]">weather map</span>
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mb-10">
            Mood Ring transforms public digital expression into a live, color-coded map of
            collective human sentiment — by city, region, and topic — in real time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="bg-[#FFD54F] text-black font-bold px-8 py-3.5 rounded-full text-base hover:bg-yellow-300 transition shadow-lg shadow-yellow-500/20"
            >
              Try the Demo
            </Link>
            <a
              href="#how-it-works"
              className="border border-white/20 text-white px-8 py-3.5 rounded-full text-base hover:bg-white/5 transition"
            >
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Emotion Spectrum */}
      <section className="py-16 px-6 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-6">
            Eight emotional states. One map.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {emotions.map((e) => (
              <div
                key={e.label}
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full"
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} />
                <span className="text-sm text-white/80">{e.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-white/50 max-w-xl mx-auto">
              A four-step pipeline from raw digital noise to intuitive geographic insight.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div
                key={s.number}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3"
              >
                <span className="text-3xl font-black text-[#FFD54F]/30">{s.number}</span>
                <h3 className="text-base font-semibold">{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-24 px-6 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-3">Who It&apos;s For</h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Built for organizations that need fast, intuitive understanding of public sentiment at scale.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {useCases.map((u) => (
              <div
                key={u.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4"
              >
                <span className="text-3xl">{u.icon}</span>
                <div>
                  <h3 className="font-semibold mb-1">{u.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4">
            See the world&apos;s mood,{" "}
            <span className="text-[#FFD54F]">right now</span>
          </h2>
          <p className="text-white/50 mb-10">
            Explore the interactive demo — city-level emotion aggregation, timeline playback, and
            topic filters, running live in your browser.
          </p>
          <Link
            href="/demo"
            className="bg-[#FFD54F] text-black font-bold px-10 py-4 rounded-full text-lg hover:bg-yellow-300 transition shadow-xl shadow-yellow-500/20"
          >
            Launch Demo
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 text-center text-white/30 text-sm">
        <p>© {new Date().getFullYear()} Mood Ring — Andrew Wesley Blackman · Simulated data demo</p>
      </footer>
    </div>
  );
}
