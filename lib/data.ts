export const EMOTIONS = [
  "Joy",
  "Sadness",
  "Anger",
  "Fear/Anxiety",
  "Calm",
  "Excitement",
  "Disgust",
  "Confusion",
] as const;

export type Emotion = (typeof EMOTIONS)[number];

export const EMOTION_COLORS: Record<Emotion, string> = {
  Joy: "#FFD54F",
  Sadness: "#42A5F5",
  Anger: "#EF5350",
  "Fear/Anxiety": "#7E57C2",
  Calm: "#26A69A",
  Excitement: "#FF7043",
  Disgust: "#8D6E63",
  Confusion: "#BDBDBD",
};

export const TOPICS = [
  "All Topics",
  "Politics",
  "Sports",
  "Markets",
  "Technology",
  "Weather",
  "Local News",
  "Entertainment",
] as const;

export type Topic = (typeof TOPICS)[number];

export interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export const CITIES: City[] = [
  { name: "Los Angeles", country: "USA", lat: 34.0522, lon: -118.2437 },
  { name: "New York", country: "USA", lat: 40.7128, lon: -74.006 },
  { name: "Chicago", country: "USA", lat: 41.8781, lon: -87.6298 },
  { name: "Miami", country: "USA", lat: 25.7617, lon: -80.1918 },
  { name: "London", country: "UK", lat: 51.5074, lon: -0.1278 },
  { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
  { name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503 },
  { name: "Seoul", country: "South Korea", lat: 37.5665, lon: 126.978 },
  { name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093 },
  { name: "São Paulo", country: "Brazil", lat: -23.5505, lon: -46.6333 },
  { name: "Mexico City", country: "Mexico", lat: 19.4326, lon: -99.1332 },
  { name: "Johannesburg", country: "South Africa", lat: -26.2041, lon: 28.0473 },
];

const RULE_KEYWORDS: Record<Emotion, string[]> = {
  Joy: ["love", "great", "amazing", "awesome", "happy", "grateful", "win", "beautiful", "excited"],
  Sadness: ["sad", "heartbroken", "miss", "grief", "depressed", "cry", "loss"],
  Anger: ["angry", "furious", "unacceptable", "outraged", "hate", "rage"],
  "Fear/Anxiety": ["worried", "scared", "terrified", "anxious", "panic", "nervous"],
  Calm: ["calm", "peaceful", "quiet", "relaxed", "serene", "breathe"],
  Excitement: ["can't wait", "hyped", "thrilled", "pumped", "let's go", "so ready"],
  Disgust: ["gross", "disgusting", "nasty", "sick", "repulsive"],
  Confusion: ["confused", "what", "huh", "doesn't make sense", "why", "lost"],
};

const TEMPLATES: Record<Emotion, string[]> = {
  Joy: [
    "Feeling {adj} today. {topic_line}",
    "That was {adj}! {topic_line}",
    "I love this. {topic_line}",
    "So grateful right now. {topic_line}",
  ],
  Sadness: [
    "Honestly feeling pretty down. {topic_line}",
    "This is heartbreaking. {topic_line}",
    "Not a great day. {topic_line}",
    "I miss how things used to be. {topic_line}",
  ],
  Anger: [
    "This is unacceptable. {topic_line}",
    "I am furious about this. {topic_line}",
    "How is this even allowed? {topic_line}",
    "Stop pretending this is fine. {topic_line}",
  ],
  "Fear/Anxiety": [
    "I'm really worried about what's happening. {topic_line}",
    "This is scary. {topic_line}",
    "My anxiety is through the roof. {topic_line}",
    "I don't feel safe about this. {topic_line}",
  ],
  Calm: [
    "Quiet morning. Feeling calm. {topic_line}",
    "Taking a breath. {topic_line}",
    "Trying to stay grounded. {topic_line}",
    "Peaceful moment right now. {topic_line}",
  ],
  Excitement: [
    "Can't wait for this! {topic_line}",
    "So hyped right now. {topic_line}",
    "Let's goooo. {topic_line}",
    "This is going to be huge. {topic_line}",
  ],
  Disgust: [
    "This is disgusting. {topic_line}",
    "Gross. I can't believe this. {topic_line}",
    "Absolutely sickening. {topic_line}",
    "This makes me feel nauseous. {topic_line}",
  ],
  Confusion: [
    "I'm confused. What is going on? {topic_line}",
    "This doesn't make sense to me. {topic_line}",
    "Wait, what? {topic_line}",
    "Can someone explain this? {topic_line}",
  ],
};

const ADJS = ["amazing", "awesome", "great", "wild", "beautiful", "unexpected", "incredible", "intense"];

const TOPIC_LINES: Record<string, string[]> = {
  Politics: [
    "Politics feels unreal lately.",
    "The debate today was something else.",
    "Policy decisions are affecting real people.",
  ],
  Sports: ["That game was insane.", "The team is on fire.", "This season keeps surprising me."],
  Markets: ["Markets are moving fast.", "Volatility is high today.", "Prices are all over the place."],
  Technology: [
    "AI is accelerating quickly.",
    "Tech updates keep rolling out.",
    "This new feature is changing everything.",
  ],
  Weather: ["The weather is intense right now.", "Storms are rolling in.", "Heat and wind are brutal today."],
  "Local News": [
    "Local news is heavy today.",
    "Things are changing in the neighborhood.",
    "City council decisions are affecting us.",
  ],
  Entertainment: [
    "That show was incredible.",
    "The new album is stuck in my head.",
    "Pop culture is moving fast.",
  ],
};

// Simple seeded PRNG (mulberry32)
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededChoice<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

function weightedChoice(weights: Record<Emotion, number>, rng: () => number): Emotion {
  const items = Object.entries(weights) as [Emotion, number][];
  const total = items.reduce((s, [, w]) => s + w, 0);
  let r = rng() * total;
  for (const [k, w] of items) {
    r -= w;
    if (r <= 0) return k;
  }
  return items[items.length - 1][0];
}

function emotionWave(minutesFromStart: number): Record<Emotion, number> {
  const m = Math.max(0, Math.min(minutesFromStart, 360));
  const w: Record<Emotion, number> = {} as Record<Emotion, number>;
  for (const e of EMOTIONS) w[e] = 0.6;
  if (m < 60) {
    w["Confusion"] += 2.5;
    w["Excitement"] += 0.8;
  } else if (m < 140) {
    w["Fear/Anxiety"] += 3.0;
    w["Confusion"] += 1.0;
  } else if (m < 220) {
    w["Anger"] += 3.0;
    w["Disgust"] += 1.2;
  } else if (m < 300) {
    w["Sadness"] += 2.2;
    w["Calm"] += 1.0;
  } else {
    w["Calm"] += 2.0;
    w["Joy"] += 1.4;
  }
  return w;
}

function cityBias(city: City): Record<Emotion, number> {
  const base: Record<Emotion, number> = {} as Record<Emotion, number>;
  for (const e of EMOTIONS) base[e] = 1.0;
  if (["New York", "London"].includes(city.name)) {
    base["Anger"] += 0.3;
    base["Confusion"] += 0.2;
  }
  if (["Los Angeles", "Sydney"].includes(city.name)) {
    base["Calm"] += 0.4;
    base["Joy"] += 0.2;
  }
  if (["Tokyo", "Seoul"].includes(city.name)) {
    base["Confusion"] += 0.3;
    base["Fear/Anxiety"] += 0.2;
  }
  if (["São Paulo", "Mexico City"].includes(city.name)) {
    base["Excitement"] += 0.3;
  }
  return base;
}

function classifyEmotion(text: string): Emotion {
  const t = text.toLowerCase();
  const scores: Record<Emotion, number> = {} as Record<Emotion, number>;
  for (const e of EMOTIONS) scores[e] = 0;
  for (const [emo, kws] of Object.entries(RULE_KEYWORDS) as [Emotion, string[]][]) {
    for (const kw of kws) {
      if (t.includes(kw)) scores[emo]++;
    }
  }
  const max = Math.max(...Object.values(scores));
  if (max === 0) return seededChoice(["Calm", "Confusion", "Joy"] as Emotion[], Math.random);
  return (Object.entries(scores) as [Emotion, number][]).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}

function synthPostText(topic: string, emotion: Emotion, rng: () => number): string {
  const topicLine = seededChoice(TOPIC_LINES[topic] || TOPIC_LINES["Entertainment"], rng);
  const tmpl = seededChoice(TEMPLATES[emotion], rng);
  const adj = seededChoice(ADJS, rng);
  return tmpl.replace("{adj}", adj).replace("{topic_line}", topicLine);
}

export interface Post {
  timestamp: Date;
  city: string;
  country: string;
  lat: number;
  lon: number;
  topic: string;
  text: string;
  emotion: Emotion;
}

export interface CityAggregate {
  city: string;
  country: string;
  lat: number;
  lon: number;
  count: number;
  dominantEmotion: Emotion;
  dominantPct: number;
  emotionCounts: Record<Emotion, number>;
}

export function generatePosts(nPosts: number, hours: number, seed: number): Post[] {
  const rng = mulberry32(seed);
  const start = new Date();
  start.setSeconds(0, 0);
  start.setTime(start.getTime() - hours * 60 * 60 * 1000);

  const rows: Post[] = [];
  const nonAllTopics = TOPICS.slice(1) as string[];

  for (let i = 0; i < nPosts; i++) {
    const city = seededChoice(CITIES, rng);
    const topic = seededChoice(nonAllTopics, rng);
    const minutesOffset = Math.floor(rng() * hours * 60);
    const t = new Date(start.getTime() + minutesOffset * 60 * 1000);

    const wave = emotionWave(minutesOffset);
    const bias = cityBias(city);
    const combined: Record<Emotion, number> = {} as Record<Emotion, number>;
    for (const e of EMOTIONS) combined[e] = wave[e] * bias[e];

    const emotion = weightedChoice(combined, rng);
    const text = synthPostText(topic, emotion, rng);

    rows.push({
      timestamp: t,
      city: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
      topic,
      text,
      emotion,
    });
  }

  return rows.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

export function aggregateByCity(posts: Post[]): CityAggregate[] {
  if (posts.length === 0) return [];

  const cityMap: Record<string, { city: Post; emotionCounts: Record<Emotion, number>; total: number }> = {};

  for (const post of posts) {
    if (!cityMap[post.city]) {
      cityMap[post.city] = {
        city: post,
        emotionCounts: Object.fromEntries(EMOTIONS.map((e) => [e, 0])) as Record<Emotion, number>,
        total: 0,
      };
    }
    cityMap[post.city].emotionCounts[post.emotion]++;
    cityMap[post.city].total++;
  }

  return Object.values(cityMap).map(({ city, emotionCounts, total }) => {
    const dominant = (Object.entries(emotionCounts) as [Emotion, number][]).reduce((a, b) =>
      b[1] > a[1] ? b : a
    )[0];
    return {
      city: city.city,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
      count: total,
      dominantEmotion: dominant,
      dominantPct: emotionCounts[dominant] / total,
      emotionCounts,
    };
  });
}

export function filterPosts(
  posts: Post[],
  cursor: Date,
  windowMinutes: number,
  topic: Topic
): Post[] {
  const windowStart = new Date(cursor.getTime() - windowMinutes * 60 * 1000);
  return posts.filter(
    (p) =>
      p.timestamp >= windowStart &&
      p.timestamp <= cursor &&
      (topic === "All Topics" || p.topic === topic)
  );
}
