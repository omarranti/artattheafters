"use client";

import { useState, useEffect } from "react";

// ── Brand tokens ─────────────────────────────────────────────────
const PINK = "#FF3399";
const GREEN = "#39FF33";
const YELLOW = "#FFD600";
const BLUE = "#00D4FF";
const ORANGE = "#FF6B35";
const DARK = "#0A0A0A";
const DARK2 = "#111111";
const DARK3 = "#181818";
const CARD = "#141414";
const BORDER = "#242424";
const MUTED = "#555";
const DIM = "#888";
const WHITE = "#F5F5F5";

// ── Storage helpers (localStorage) ───────────────────────────────
function store(key: string, val: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
}
function load<T>(key: string, fallback: T): T {
  try {
    const r = localStorage.getItem(key);
    return r ? JSON.parse(r) : fallback;
  } catch {
    return fallback;
  }
}

// ── Hooks ────────────────────────────────────────────────────────
function useMounted(delay = 0) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return on;
}

// ── FUNNELS DATA ─────────────────────────────────────────────────
interface FunnelStep {
  id: string;
  label: string;
  note: string;
}
interface Funnel {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  color: string;
  revenue: string;
  steps: FunnelStep[];
}

const FUNNELS: Funnel[] = [
  {
    id: "art_drop",
    emoji: "\u{1F3A8}",
    title: "New Art Drop",
    subtitle: "Maximize every piece you finish",
    color: PINK,
    revenue: "+$200\u2013900 per drop",
    steps: [
      { id: "photo", label: "Photograph the piece", note: "Natural light, 3+ angles, flat lay + hanging shot" },
      { id: "website", label: "Upload to website gallery", note: "Title, size, medium, 1-line caption" },
      { id: "ig_post", label: "Post to Instagram @artattheafters", note: "Best: 6\u20139pm. Hashtags in comments, not caption" },
      { id: "ig_story", label: "Add to Instagram Stories", note: "Use DM me or poll sticker \u2014 drives direct inquiries" },
      { id: "reel", label: "Post a process Reel (if filmed)", note: "15s of painting footage = 3\u20135\u00D7 more reach" },
      { id: "avail", label: "Mark as Available on website", note: "Or mark SOLD immediately \u2014 social proof is gold" },
      { id: "pin", label: "Pin if it\u2019s your best recent work", note: "First impression = pin your most striking piece" },
    ],
  },
  {
    id: "commission",
    emoji: "\u{1F4AC}",
    title: "Commission Request",
    subtitle: "Turn a DM into a done deal",
    color: GREEN,
    revenue: "+$50\u2013900 per order",
    steps: [
      { id: "reply", label: "Reply within 2 hours", note: "Speed = conversion. Be first" },
      { id: "idea", label: "Confirm what they want painted", note: "Subject, mood, reference photos?" },
      { id: "size", label: "Agree on canvas size", note: "5\u00D77 ($50) \u2192 8\u00D710 \u2192 9\u00D712 \u2192 11\u00D714 \u2192 16\u00D720 \u2192 26\u00D732 ($600+)" },
      { id: "price", label: "Quote final price + add-ons", note: "Gold leaf, glow paint, impasto = +$25\u201375 each" },
      { id: "deposit", label: "Collect 50% deposit via Venmo @steviealger", note: "No deposit = no start. Full stop" },
      { id: "timeline", label: "Confirm delivery timeline", note: "Standard: 1\u20132 weeks. Rush 72hr = +$50\u2013100" },
      { id: "wip", label: "Send WIP photo halfway through", note: "Builds excitement, confirms direction" },
      { id: "final_pay", label: "Collect remaining 50% before shipping", note: "Venmo request the day it\u2019s finished" },
      { id: "pack", label: "Package carefully + photo the package", note: "Photo = proof if shipping damage claim needed" },
      { id: "ship", label: "Ship + send tracking number", note: "Message on IG \u2014 they\u2019re excited, keep energy up" },
      { id: "followup", label: "Follow up after delivery", note: "\u2018Did it arrive safe? Love to see it hung up!\u2019" },
    ],
  },
  {
    id: "postsale",
    emoji: "\u{1F4E6}",
    title: "Post-Sale Maximizer",
    subtitle: "Turn one buyer into five",
    color: BLUE,
    revenue: "+referrals + social proof",
    steps: [
      { id: "photo_req", label: "Ask for a photo in their space", note: "Your best marketing content \u2014 people LOVE showing off" },
      { id: "testimonial", label: "Ask for a 1-sentence testimonial", note: "Even \u2018It\u2019s awesome\u2019 is gold. Quote it on the site" },
      { id: "repost", label: "Repost any tags to your story", note: "Tag them back \u2014 alerts their followers to you" },
      { id: "sold_gallery", label: "Add to Sold gallery on website", note: "Sold pieces = social proof. Buyers want what others wanted" },
      { id: "location", label: "Update worldwide stats", note: "5 countries, 17 cities \u2014 update every new location" },
      { id: "repeat", label: "Plant the seed for next order", note: "\u2018Would you ever want a piece for your [room/friend/etc]?\u2019" },
      { id: "refer", label: "Ask if they know anyone", note: "Word of mouth is how you hit 75 paintings. Keep feeding it" },
    ],
  },
  {
    id: "growth",
    emoji: "\u{1F4C8}",
    title: "Weekly Growth",
    subtitle: "Stay top of mind, grow the audience",
    color: YELLOW,
    revenue: "Audience = pipeline",
    steps: [
      { id: "post3x", label: "Post at least 3\u00D7 to Instagram", note: "Consistency > perfection. A 20-sec story counts" },
      { id: "stories", label: "Post to Stories daily", note: "BTS, palette photos, WIP \u2014 anything behind the curtain" },
      { id: "engage", label: "Reply to all DMs + comments", note: "Every reply boosts reach algorithmically" },
      { id: "gallery", label: "Add 1+ new piece to website", note: "Fresh content = active site (Google + visitors)" },
      { id: "social_proof", label: "Share a customer tag or unboxing", note: "Other people\u2019s excitement sells better than your own posts" },
      { id: "poll", label: "Run a \u2018what should I paint?\u2019 poll", note: "High engagement + gives you content ideas" },
      { id: "forms", label: "Check website contact form", note: "Don\u2019t let warm leads go cold \u2014 respond within 24 hours" },
    ],
  },
  {
    id: "revenue",
    emoji: "\u{1F4B0}",
    title: "Revenue Levers",
    subtitle: "Price anchoring, urgency, upsells",
    color: ORANGE,
    revenue: "Higher AOV + repeat rate",
    steps: [
      { id: "anchor", label: "Feature 2\u20133 high-ticket sold pieces prominently", note: "Seeing a $900 piece sold makes $200 feel affordable" },
      { id: "bio", label: "Keep price range in IG bio or highlights", note: "\u2018Custom pieces from $50\u2019 removes the price-fear barrier" },
      { id: "urgency", label: "Use \u2018limited rush slots this week\u2019 messaging", note: "Scarcity is real for you. 1\u20132 slots creates real urgency" },
      { id: "gift", label: "Run a \u2018gift a piece\u2019 push around holidays", note: "Commissioned gifts are your #1 use case. Target gift-givers" },
      { id: "bundle", label: "Offer free pickup or shipping deal on 2+ pieces", note: "One happy buyer often wants a set. Make two pieces easy" },
      { id: "paypal", label: "Ensure PayPal is active for international buyers", note: "5 countries already. PayPal removes friction" },
      { id: "waitlist", label: "Build a waitlist when booked out", note: "Waitlist = free future revenue. Never turn someone away" },
    ],
  },
];

// ── PAINT KIT QUIZ DATA ──────────────────────────────────────────
interface QuizOption {
  value: string;
  label: string;
  desc: string;
  emoji: string;
}
interface QuizStep {
  id: string;
  question: string;
  emoji: string;
  subtitle: string;
  options: QuizOption[];
}

const QUIZ_STEPS: QuizStep[] = [
  {
    id: "level", question: "What's your painting experience?",
    emoji: "\u{1F58C}\uFE0F", subtitle: "No judgment \u2014 just helps us pick the right tools",
    options: [
      { value: "beginner", label: "Total Beginner", desc: "Never painted before, ready to try", emoji: "\u{1F331}" },
      { value: "hobbyist", label: "Casual Hobbyist", desc: "Painted a few times, love it", emoji: "\u{1F3A8}" },
      { value: "intermediate", label: "Getting Serious", desc: "Developing your own style", emoji: "\u{1F525}" },
      { value: "advanced", label: "Advanced Artist", desc: "Technique matters, quality is key", emoji: "\u26A1" },
    ],
  },
  {
    id: "style", question: "What kind of art calls to you?",
    emoji: "\u2728", subtitle: "Pick the vibe that speaks loudest",
    options: [
      { value: "abstract", label: "Abstract / Expressive", desc: "Free, chaotic, emotional", emoji: "\u{1F300}" },
      { value: "illustrative", label: "Characters & Illustration", desc: "Figures, animals, pop art", emoji: "\u{1F98B}" },
      { value: "landscape", label: "Landscapes & Nature", desc: "Outdoors, skies, dreamscapes", emoji: "\u{1F305}" },
      { value: "portrait", label: "Portraits & People", desc: "Faces, expressions, realism", emoji: "\u{1F464}" },
    ],
  },
  {
    id: "surface", question: "What do you want to paint on?",
    emoji: "\u{1F5BC}\uFE0F", subtitle: "Surfaces change everything about your technique",
    options: [
      { value: "canvas_stretched", label: "Stretched Canvas", desc: "Classic, ready to hang immediately", emoji: "\u{1F3AF}" },
      { value: "canvas_board", label: "Canvas Board", desc: "Firm, portable, great for practice", emoji: "\u{1F4CB}" },
      { value: "paper", label: "Mixed Media Paper", desc: "Budget-friendly, great for studies", emoji: "\u{1F4C4}" },
      { value: "wood", label: "Wood Panel", desc: "Smooth, archival, premium feel", emoji: "\u{1FAB5}" },
    ],
  },
  {
    id: "medium", question: "Which paint medium?",
    emoji: "\u{1F4A7}", subtitle: "Acrylic is Stevie\u2019s go-to \u2014 but it\u2019s your kit",
    options: [
      { value: "acrylic", label: "Acrylic", desc: "Fast-dry, vibrant, beginner-friendly", emoji: "\u26A1" },
      { value: "oil", label: "Oil Paint", desc: "Slow-dry, blendable, rich color", emoji: "\u{1F3AD}" },
      { value: "watercolor", label: "Watercolor", desc: "Transparent, luminous, fluid", emoji: "\u{1F4A7}" },
      { value: "gouache", label: "Gouache", desc: "Opaque watercolor, matte finish", emoji: "\u{1F33F}" },
    ],
  },
  {
    id: "workspace", question: "How's your workspace setup?",
    emoji: "\u{1F3E0}", subtitle: "Helps us pick the right easel and furniture",
    options: [
      { value: "floor", label: "Floor / Open Space", desc: "Lots of room, I like working big", emoji: "\u{1F3DF}\uFE0F" },
      { value: "desk", label: "Desk or Table", desc: "Seated setup, compact space", emoji: "\u{1F4BB}" },
      { value: "outdoor", label: "Outdoor / En Plein Air", desc: "I paint outside sometimes", emoji: "\u{1F324}\uFE0F" },
      { value: "portable", label: "On the Go", desc: "I travel with my supplies", emoji: "\u{1F392}" },
    ],
  },
  {
    id: "vibe", question: "What's your painting vibe?",
    emoji: "\u{1F319}", subtitle: "The afterparty question \u2014 when and how do you create?",
    options: [
      { value: "late_night", label: "Late Night Sessions", desc: "Painting at 2am with drinks", emoji: "\u{1F319}" },
      { value: "weekend", label: "Weekend Warrior", desc: "Saturday afternoon energy", emoji: "\u2600\uFE0F" },
      { value: "group", label: "Group / Party Painting", desc: "Painting with friends is more fun", emoji: "\u{1F942}" },
      { value: "solo_focus", label: "Solo Deep Focus", desc: "Headphones in, world out", emoji: "\u{1F3A7}" },
    ],
  },
  {
    id: "budget", question: "What's your kit budget?",
    emoji: "\u{1F4B8}", subtitle: "We'll recommend the best bang for your buck",
    options: [
      { value: "starter", label: "Starter \u2014 Under $50", desc: "Just getting my feet wet", emoji: "\u{1F331}" },
      { value: "mid", label: "Mid-Range \u2014 $50\u2013$120", desc: "Invest in quality fundamentals", emoji: "\u{1F3AF}" },
      { value: "serious", label: "Serious \u2014 $120\u2013$250", desc: "Building a real studio setup", emoji: "\u{1F525}" },
      { value: "pro", label: "Pro \u2014 $250+", desc: "No compromises, best of everything", emoji: "\u{1F451}" },
    ],
  },
];

// ── Kit recommendation engine ────────────────────────────────────
interface KitItem {
  name: string;
  why: string;
  link: string;
  price: string;
}
interface Kit {
  brushes: KitItem[];
  paints: KitItem[];
  surfaces: KitItem[];
  easels: KitItem[];
  stools: KitItem[];
  extras: KitItem[];
}

function buildKit(answers: Record<string, string>): Kit {
  const { level, surface, medium, workspace, vibe, budget } = answers;
  const isBeginnerOrHobbyist = level === "beginner" || level === "hobbyist";
  const isOil = medium === "oil";
  const isWatercolor = medium === "watercolor" || medium === "gouache";
  const isMobile = workspace === "portable" || workspace === "outdoor";
  const isGroup = vibe === "group" || vibe === "late_night";
  const bigBudget = budget === "serious" || budget === "pro";

  const brushes: KitItem[] = isWatercolor
    ? [
        { name: "Princeton Velvetouch Round Set", why: "Perfect for watercolor/gouache wash control", link: "https://www.amazon.com/s?k=Princeton+Velvetouch+Round+Brush+Set", price: "$18\u201328" },
        { name: "Flat Wash Brush 1\"", why: "Essential for large background washes", link: "https://www.amazon.com/s?k=flat+wash+brush+watercolor", price: "$8\u201315" },
      ]
    : isOil
    ? [
        { name: "Winsor & Newton Filbert Set", why: "Hog bristle filberts \u2014 classic for oil blending", link: "https://www.amazon.com/s?k=Winsor+Newton+hog+filbert+brush+set", price: "$25\u201345" },
        { name: "Robert Simmons Fan Brush", why: "Soft blending and texture effects", link: "https://www.amazon.com/s?k=Robert+Simmons+fan+brush+oil", price: "$10\u201318" },
      ]
    : [
        { name: isBeginnerOrHobbyist ? "Apple Barrel Acrylic Brush Set (24pc)" : "Artify Professional Acrylic Brush Set", why: isBeginnerOrHobbyist ? "Great value starter set, covers all shapes" : "Ergonomic handles, short bristles for control", link: isBeginnerOrHobbyist ? "https://www.amazon.com/s?k=Apple+Barrel+acrylic+brush+set" : "https://www.amazon.com/s?k=Artify+professional+acrylic+brush+set", price: isBeginnerOrHobbyist ? "$12\u201320" : "$25\u201345" },
        { name: "Princeton Select Artiste Flat Brush", why: "Best for Stevie-style expressive strokes", link: "https://www.amazon.com/s?k=Princeton+Select+Artiste+flat+brush", price: "$8\u201314" },
      ];

  const paints: KitItem[] = isWatercolor
    ? [{ name: "Winsor & Newton Cotman 45-Half Pan Set", why: "Best quality for price in watercolor", link: "https://www.amazon.com/s?k=Winsor+Newton+Cotman+watercolor+set", price: "$30\u201350" }]
    : isOil
    ? [{ name: bigBudget ? "Gamblin 1980 Oil Color Set" : "Winsor & Newton Winton Oil Set", why: bigBudget ? "Professional pigment density, artist grade" : "Best beginner oil set, great pigment load", link: bigBudget ? "https://www.amazon.com/s?k=Gamblin+1980+oil+color+set" : "https://www.amazon.com/s?k=Winsor+Newton+Winton+oil+paint+set", price: bigBudget ? "$60\u201390" : "$30\u201350" }]
    : [
        { name: bigBudget ? "Golden Heavy Body Acrylic Set" : "Liquitex Basics Acrylic Set (48pc)", why: bigBudget ? "Artist-grade, intense pigment \u2014 what serious painters use" : "Best bang for buck acrylic set on the market", link: bigBudget ? "https://www.amazon.com/s?k=Golden+heavy+body+acrylic+set" : "https://www.amazon.com/s?k=Liquitex+Basics+acrylic+48+set", price: bigBudget ? "$80\u2013130" : "$35\u201360" },
        { name: "Fluorescent Neon Acrylic Set", why: "The Stevie Alger secret weapon \u2014 neons pop on dark canvases", link: "https://www.amazon.com/s?k=fluorescent+neon+acrylic+paint+set", price: "$15\u201325" },
      ];

  const surfaces: KitItem[] = surface === "canvas_stretched"
    ? [{ name: isBeginnerOrHobbyist ? "Artlicious 12-Pack Stretched Canvas Set" : "Fredrix Stretched Canvas Multi-Pack", why: "Triple-primed, ready to paint. Stock up.", link: isBeginnerOrHobbyist ? "https://www.amazon.com/s?k=Artlicious+stretched+canvas+pack" : "https://www.amazon.com/s?k=Fredrix+stretched+canvas+multi+pack", price: "$20\u201355" }]
    : surface === "canvas_board"
    ? [{ name: "US Art Supply Canvas Boards (20-Pack)", why: "Rigid, portable, perfect for practice and gifting", link: "https://www.amazon.com/s?k=US+Art+Supply+canvas+boards+20+pack", price: "$18\u201330" }]
    : surface === "paper"
    ? [{ name: "Strathmore 400 Mixed Media Pad", why: "Takes acrylic, watercolor, and ink \u2014 bulletproof paper", link: "https://www.amazon.com/s?k=Strathmore+400+Mixed+Media+Pad", price: "$15\u201325" }]
    : [{ name: "Ampersand Gessobord Panel", why: "Archival wood panel \u2014 premium, gallery-quality surface", link: "https://www.amazon.com/s?k=Ampersand+Gessobord", price: "$20\u201360" }];

  const easels: KitItem[] = isMobile
    ? [{ name: "Mont Marte Tabletop Easel + Carry Case", why: "Folds flat, takes everywhere. Perfect for on-the-go", link: "https://www.amazon.com/s?k=Mont+Marte+tabletop+easel+carry+case", price: "$20\u201335" }]
    : workspace === "desk"
    ? [{ name: "MEEDEN Tabletop H-Frame Easel", why: "Sits on any desk, solid build, adjustable angle", link: "https://www.amazon.com/s?k=MEEDEN+tabletop+H-frame+easel", price: "$35\u201355" }]
    : bigBudget
    ? [{ name: "MEEDEN Heavy Duty A-Frame Studio Easel", why: "Full floor easel, holds canvases up to 59\". Built to last", link: "https://www.amazon.com/s?k=MEEDEN+heavy+duty+A-frame+studio+easel", price: "$90\u2013140" }]
    : [{ name: "US Art Supply Deluxe Wood H-Frame Easel", why: "Best mid-range floor easel, very stable and adjustable", link: "https://www.amazon.com/s?k=US+Art+Supply+H+frame+easel", price: "$55\u201385" }];

  const stools: KitItem[] = workspace === "desk"
    ? [{ name: "DRAGONN Ergonomic Kneeling Chair", why: "Keeps you comfortable through long painting sessions at a desk", link: "https://www.amazon.com/s?k=DRAGONN+ergonomic+kneeling+chair", price: "$70\u2013100" }]
    : isMobile
    ? [{ name: "Walkstool Compact Folding Stool", why: "Ultralight, fits in a bag, stable on any surface", link: "https://www.amazon.com/s?k=Walkstool+compact+folding+stool", price: "$35\u201365" }]
    : bigBudget
    ? [{ name: "IKEA DALFRED Bar Stool (Adjustable)", why: "Cheap, adjustable height, looks great in a studio", link: "https://www.amazon.com/s?k=adjustable+height+artist+stool", price: "$45\u201380" }]
    : [{ name: "Amazon Basics Adjustable Drafting Stool", why: "Spin, adjust, comfortable for hours of painting", link: "https://www.amazon.com/s?k=Amazon+Basics+drafting+stool", price: "$40\u201365" }];

  const extras: KitItem[] = [
    ...(isOil ? [{ name: "Gamblin Gamsol Odorless Mineral Spirits", why: "Essential for oil cleanup \u2014 low odor, reusable", link: "https://www.amazon.com/s?k=Gamblin+Gamsol+odorless+mineral+spirits", price: "$12\u201320" }] : []),
    ...(!isOil ? [{ name: "Golden Fluid Matte Medium", why: "Extends acrylic drying time \u2014 key for blending like oil", link: "https://www.amazon.com/s?k=Golden+fluid+matte+medium", price: "$12\u201320" }] : []),
    ...(isGroup ? [{ name: "Disposable Palette Paper Pad (50 sheets)", why: "No cleanup \u2014 perfect for group/party painting sessions", link: "https://www.amazon.com/s?k=palette+paper+pad+disposable", price: "$8\u201315" }] : [{ name: "Stay-Wet Palette by Masterson", why: "Keeps paints workable for days \u2014 zero waste", link: "https://www.amazon.com/s?k=Masterson+Stay-Wet+Palette", price: "$12\u201318" }]),
    { name: "Frog Tape + Drop Cloth", why: "Protect your surfaces and create clean masked edges", link: "https://www.amazon.com/s?k=frog+tape+drop+cloth+painting", price: "$10\u201320" },
    ...(bigBudget ? [{ name: "Daler-Rowney Varnish Spray (Gloss)", why: "Finish and protect your paintings before selling/gifting", link: "https://www.amazon.com/s?k=Daler+Rowney+varnish+spray+gloss", price: "$12\u201318" }] : []),
    ...(vibe === "late_night" ? [{ name: "LED Ring Light (10\")", why: "Paint at 2am without ruining your color mixing under bad light", link: "https://www.amazon.com/s?k=10+inch+LED+ring+light+art+studio", price: "$20\u201335" }] : []),
  ];

  return { brushes, paints, surfaces, easels, stools, extras };
}

// ── Paint Kit Builder Component ──────────────────────────────────
function PaintKitBuilder() {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"intro" | "quiz" | "results">("intro");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [kit, setKit] = useState<Kit | null>(null);
  const [animKey, setAnimKey] = useState(0);

  function startQuiz() { setPhase("quiz"); setStep(0); setAnimKey(k => k + 1); }

  function selectOption(val: string) {
    setSelected(val);
    setTimeout(() => {
      const newAnswers = { ...answers, [QUIZ_STEPS[step].id]: val };
      setAnswers(newAnswers);
      setSelected(null);
      if (step < QUIZ_STEPS.length - 1) {
        setStep(s => s + 1);
        setAnimKey(k => k + 1);
      } else {
        setKit(buildKit(newAnswers));
        setPhase("results");
        setAnimKey(k => k + 1);
      }
    }, 320);
  }

  function restart() { setPhase("intro"); setStep(0); setAnswers({}); setSelected(null); setKit(null); setAnimKey(k => k + 1); }

  const progress = phase === "quiz" ? (step / QUIZ_STEPS.length) * 100 : phase === "results" ? 100 : 0;
  const current = QUIZ_STEPS[step];

  const CATEGORY_COLORS: Record<string, string> = { brushes: PINK, paints: GREEN, surfaces: BLUE, easels: YELLOW, stools: ORANGE, extras: "#CC88FF" };
  const CATEGORY_LABELS: Record<string, string> = { brushes: "\u{1F58C}\uFE0F Brushes", paints: "\u{1F3A8} Paints", surfaces: "\u{1F5BC}\uFE0F Surfaces", easels: "\u{1F4D0} Easel", stools: "\u{1FA91} Stool", extras: "\u2728 Extras" };

  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
      {phase !== "intro" && (
        <div style={{ height: 3, background: BORDER, borderRadius: 100, marginBottom: 28 }}>
          <div style={{ height: "100%", borderRadius: 100, background: `linear-gradient(90deg, ${PINK}, ${GREEN})`, width: `${progress}%`, transition: "width 0.5s ease" }} />
        </div>
      )}

      {phase === "intro" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "20px 0", gap: 0 }}>
          <div style={{ fontSize: 64, marginBottom: 20, animation: "float 3s ease-in-out infinite" }}>{"\u{1F3A8}"}</div>
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: GREEN, marginBottom: 12, fontWeight: 600 }}>By Art at the Afters</p>
          <h2 style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 700, margin: "0 0 14px", lineHeight: 1.2 }}>
            Find Your Perfect<br /><span style={{ color: PINK, fontStyle: "italic" }}>Paint Kit</span>
          </h2>
          <p style={{ color: DIM, fontSize: 14, maxWidth: 380, lineHeight: 1.7, margin: "0 0 32px", fontWeight: 300 }}>
            7 quick questions. We&apos;ll build you a personalized kit &mdash; exactly the right brushes, paints, canvas, easel, and more for how <em>you</em> paint.
          </p>
          <button onClick={startQuiz} style={{
            padding: "16px 48px", background: PINK, border: "none", borderRadius: 100,
            color: WHITE, fontSize: 15, fontWeight: 700, cursor: "pointer",
            fontFamily: "var(--font-body), 'Outfit', sans-serif", letterSpacing: 1.5, textTransform: "uppercase",
            boxShadow: `0 0 30px ${PINK}44`, transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}>
            Build My Kit &rarr;
          </button>
          <p style={{ color: MUTED, fontSize: 11, marginTop: 16 }}>Takes about 2 minutes. No email required.</p>
        </div>
      )}

      {phase === "quiz" && current && (
        <div key={animKey} style={{ animation: "slideIn 0.4s cubic-bezier(.2,.8,.4,1) both" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{current.emoji}</div>
            <p style={{ fontSize: 11, color: MUTED, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
              Question {step + 1} of {QUIZ_STEPS.length}
            </p>
            <h3 style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 700, margin: "0 0 8px" }}>
              {current.question}
            </h3>
            <p style={{ color: MUTED, fontSize: 13, margin: 0 }}>{current.subtitle}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {current.options.map(opt => {
              const isSelected = selected === opt.value;
              return (
                <button key={opt.value} onClick={() => selectOption(opt.value)}
                  style={{
                    background: isSelected ? PINK + "20" : CARD,
                    border: `1.5px solid ${isSelected ? PINK : BORDER}`,
                    borderRadius: 14, padding: "16px 14px", cursor: "pointer",
                    textAlign: "left", transition: "all 0.2s", color: WHITE,
                    transform: isSelected ? "scale(0.97)" : "scale(1)",
                  }}
                  onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = PINK + "66"; e.currentTarget.style.background = PINK + "08"; } }}
                  onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.background = CARD; } }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{opt.emoji}</div>
                  <p style={{ fontWeight: 700, fontSize: 13.5, margin: "0 0 4px", fontFamily: "var(--font-body), 'Outfit', sans-serif" }}>{opt.label}</p>
                  <p style={{ color: MUTED, fontSize: 11.5, margin: 0, lineHeight: 1.5 }}>{opt.desc}</p>
                </button>
              );
            })}
          </div>

          {step > 0 && (
            <button onClick={() => { setStep(s => s - 1); setAnswers(a => { const n = { ...a }; delete n[QUIZ_STEPS[step].id]; return n; }); setAnimKey(k => k + 1); }}
              style={{ background: "transparent", border: "none", color: MUTED, fontSize: 12, cursor: "pointer", marginTop: 20, display: "block", margin: "20px auto 0", fontFamily: "var(--font-body), 'Outfit', sans-serif" }}>
              &larr; Back
            </button>
          )}
        </div>
      )}

      {phase === "results" && kit && (
        <div key={animKey} style={{ animation: "slideIn 0.5s cubic-bezier(.2,.8,.4,1) both" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>{"\u{1F389}"}</div>
            <h3 style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 700, margin: "0 0 8px" }}>
              Your <span style={{ color: PINK, fontStyle: "italic" }}>Perfect Kit</span>
            </h3>
            <p style={{ color: DIM, fontSize: 13, margin: "0 0 6px" }}>
              Curated by Stevie Alger &middot; Art at the Afters
            </p>
            <p style={{ color: MUTED, fontSize: 12, maxWidth: 340, margin: "0 auto" }}>
              Every item linked to Amazon. Buying through these links supports Art at the Afters. {"\u{1F3A8}"}
            </p>
          </div>

          {(Object.entries(kit) as [string, KitItem[]][]).map(([cat, items]) => items.length > 0 && (
            <div key={cat} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: CATEGORY_COLORS[cat] }} />
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: CATEGORY_COLORS[cat], margin: 0 }}>
                  {CATEGORY_LABELS[cat]}
                </p>
              </div>
              {items.map((item, i) => (
                <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "flex-start", justifyContent: "space-between",
                  padding: "14px 16px", background: CARD, border: `1px solid ${BORDER}`,
                  borderRadius: 12, marginBottom: 8, textDecoration: "none", gap: 12,
                  transition: "all 0.2s", color: WHITE,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = CATEGORY_COLORS[cat] + "55"; e.currentTarget.style.background = CATEGORY_COLORS[cat] + "08"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.background = CARD; }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 13.5, margin: "0 0 3px", fontFamily: "var(--font-body), 'Outfit', sans-serif" }}>{item.name}</p>
                    <p style={{ color: MUTED, fontSize: 12, margin: 0, lineHeight: 1.5 }}>{item.why}</p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ color: CATEGORY_COLORS[cat], fontWeight: 700, fontSize: 13, margin: "0 0 4px" }}>{item.price}</p>
                    <p style={{ color: MUTED, fontSize: 10, margin: 0 }}>Amazon &rarr;</p>
                  </div>
                </a>
              ))}
            </div>
          ))}

          <div style={{ padding: "16px 20px", background: PINK + "10", border: `1px solid ${PINK}33`, borderRadius: 12, marginBottom: 20, textAlign: "center" }}>
            <p style={{ fontSize: 13, color: WHITE, lineHeight: 1.7, margin: 0 }}>
              Want Stevie to personally pick and source your kit? <a href="https://www.instagram.com/artattheafters/" target="_blank" rel="noopener noreferrer" style={{ color: PINK, fontWeight: 700 }}>DM @artattheafters</a> and she&apos;ll build it for you. {"\u2728"}
            </p>
          </div>

          <button onClick={restart} style={{
            display: "block", margin: "0 auto", padding: "12px 32px",
            background: "transparent", border: `1.5px solid ${BORDER}`,
            borderRadius: 100, color: DIM, fontSize: 13, cursor: "pointer",
            fontFamily: "var(--font-body), 'Outfit', sans-serif", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = DIM; e.currentTarget.style.color = WHITE; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = DIM; }}>
            ↺ Start Over
          </button>
        </div>
      )}

      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
}

// ── AI Email Composer ────────────────────────────────────────────
function EmailComposer() {
  const [type, setType] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const EMAIL_TYPES = [
    { value: "commission_confirm", label: "\u2705 Commission Confirmed", fields: ["buyerName", "subject", "size", "price", "timeline"] },
    { value: "wip_update", label: "\u{1F58C}\uFE0F WIP Update", fields: ["buyerName", "subject", "wipNote"] },
    { value: "ready_to_ship", label: "\u{1F4E6} Ready to Ship", fields: ["buyerName", "subject", "size", "finalAmount", "venmoHandle"] },
    { value: "delivery_followup", label: "\u{1F389} Delivery Follow-Up", fields: ["buyerName", "subject", "location"] },
    { value: "new_drop", label: "\u{1F3A8} New Art Drop Announce", fields: ["pieceTitle", "size", "medium", "shortDesc"] },
    { value: "newsletter", label: "\u{1F4F0} Monthly Newsletter", fields: ["month", "highlight1", "highlight2", "ctaLink"] },
  ];

  const FIELD_LABELS: Record<string, string> = {
    buyerName: "Buyer's Name", subject: "What they ordered", size: "Canvas size",
    price: "Total price", timeline: "Delivery timeline", wipNote: "WIP progress note",
    finalAmount: "Final payment amount", venmoHandle: "Venmo handle (@steviealger)",
    location: "Buyer's city/state", pieceTitle: "Piece title", medium: "Medium",
    shortDesc: "1-line description of the piece", month: "Month (e.g. March 2026)",
    highlight1: "Highlight #1", highlight2: "Highlight #2", ctaLink: "CTA link (e.g. site URL)",
  };

  const selectedType = EMAIL_TYPES.find(t => t.value === type);

  async function generate() {
    if (!type || !selectedType) return;
    setLoading(true); setOutput("");
    const fieldList = selectedType.fields.map(f => `${FIELD_LABELS[f]}: ${fields[f] || "(not provided)"}`).join("\n");
    const prompts: Record<string, string> = {
      commission_confirm: `Write a warm, casual, enthusiastic commission confirmation email from Stevie Alger of Art at the Afters (artattheafters.com, @artattheafters). Tone: excited artist energy, personal, direct. Include: excited opener, order confirmation (what + size + price + timeline), next steps (WIP photo coming, Venmo for balance at end), thank them for supporting independent art. Sign off as Stevie. Fields:\n${fieldList}`,
      wip_update: `Write a fun, hype WIP (work-in-progress) update email from Stevie of Art at the Afters. Tone: party energy, brief, exciting. Include: "just wanted to show you where we're at!", description of progress, build anticipation for the finished piece. Fields:\n${fieldList}`,
      ready_to_ship: `Write a "your painting is DONE" email from Stevie of Art at the Afters. Tone: celebratory, like texting a friend. Include: excited announcement, final Venmo payment request (${fields.finalAmount || "remaining balance"} to @steviealger), what happens next (ships within 48hrs after payment), tracking will be sent. Fields:\n${fieldList}`,
      delivery_followup: `Write a 3-days-after-delivery follow-up email from Stevie of Art at the Afters. Tone: warm, curious, genuine. Include: hope it arrived safe, excited to hear if they love it, ask for a photo of it hanging up (tag @artattheafters), mention referrals casually. Fields:\n${fieldList}`,
      new_drop: `Write a punchy, exciting new art drop announcement email from Stevie of Art at the Afters. Tone: afterparty energy, confident, short. Include: new piece announcement, quick description, sizes available, how to inquire (DM on IG or website). End with "first come first served". Fields:\n${fieldList}`,
      newsletter: `Write a casual monthly newsletter from Stevie Alger of Art at the Afters. Tone: like a text from a cool friend — not corporate. Include: quick life/art update, 2 highlights from the month, a CTA to inquire about a commission or visit the site. Keep it short and punchy, under 200 words. Fields:\n${fieldList}`,
    };
    try {
      const res = await fetch("/api/admin/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompts[type] }),
      });
      const data = await res.json();
      setOutput(data.text || "Error generating email.");
    } catch {
      setOutput("Something went wrong. Try again.");
    }
    setLoading(false);
  }

  function copy() { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: GREEN, marginBottom: 10, fontWeight: 600 }}>Email Type</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {EMAIL_TYPES.map(t => (
            <button key={t.value} onClick={() => { setType(t.value); setFields({}); setOutput(""); }}
              style={{
                padding: "11px 14px", background: type === t.value ? GREEN + "15" : CARD,
                border: `1.5px solid ${type === t.value ? GREEN : BORDER}`,
                borderRadius: 10, color: type === t.value ? GREEN : DIM,
                fontSize: 12.5, fontWeight: type === t.value ? 700 : 400,
                cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                fontFamily: "var(--font-body), 'Outfit', sans-serif",
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {selectedType && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: PINK, fontWeight: 600, margin: 0 }}>Fill In Details</p>
          {selectedType.fields.map(f => (
            <div key={f}>
              <label style={{ display: "block", fontSize: 11.5, color: MUTED, marginBottom: 5 }}>{FIELD_LABELS[f]}</label>
              <input type="text" value={fields[f] || ""} onChange={e => setFields(p => ({ ...p, [f]: e.target.value }))}
                placeholder={`Enter ${FIELD_LABELS[f].toLowerCase()}\u2026`}
                style={{
                  width: "100%", background: DARK2, border: `1.5px solid ${BORDER}`, borderRadius: 9,
                  padding: "10px 13px", color: WHITE, fontSize: 13, fontFamily: "var(--font-body), 'Outfit', sans-serif",
                  outline: "none", caretColor: PINK, boxSizing: "border-box", transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = PINK}
                onBlur={e => e.target.style.borderColor = BORDER}
              />
            </div>
          ))}
          <button onClick={generate} disabled={loading}
            style={{
              padding: "13px", background: loading ? MUTED : PINK, border: "none",
              borderRadius: 10, color: WHITE, fontSize: 13.5, fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer", fontFamily: "var(--font-body), 'Outfit', sans-serif",
              letterSpacing: 1, textTransform: "uppercase", transition: "all 0.2s",
            }}>
            {loading ? "Writing\u2026" : "\u2728 Generate Email"}
          </button>
        </div>
      )}

      {output && (
        <div style={{ background: DARK2, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: PINK, fontWeight: 600, margin: 0 }}>Generated Email</p>
            <button onClick={copy} style={{
              padding: "6px 14px", background: copied ? GREEN + "20" : "transparent",
              border: `1px solid ${copied ? GREEN : BORDER}`, borderRadius: 8,
              color: copied ? GREEN : MUTED, fontSize: 11, cursor: "pointer",
              fontFamily: "var(--font-body), 'Outfit', sans-serif", transition: "all 0.2s",
            }}>{copied ? "\u2713 Copied!" : "Copy"}</button>
          </div>
          <pre style={{ color: DIM, fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-wrap", margin: 0, fontFamily: "var(--font-body), 'Outfit', sans-serif" }}>
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

// ── Blog Post Generator ──────────────────────────────────────────
interface BlogPost {
  id: number;
  type: string;
  hook: string;
  content: string;
  date: string;
}

function BlogTool() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [drafting, setDrafting] = useState(false);
  const [form, setForm] = useState({ type: "", hook: "", detail: "" });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setPosts(load("blog_posts", [])); }, []);

  const POST_TYPES = [
    { value: "drop", label: "\u{1F3A8} New Art Drop Story", placeholder: "What's the painting? Anything quirky about it?" },
    { value: "bts", label: "\u{1F3A5} Behind-the-Scenes", placeholder: "What happened during this painting session?" },
    { value: "commission", label: "\u{1F4AC} Commission Spotlight", placeholder: "Who ordered it and what was the concept?" },
    { value: "life", label: "\u{1F319} Life in LA / Afterparty", placeholder: "What's the story or vibe you want to share?" },
    { value: "tips", label: "\u{1F4A1} Painting Tips from Stevie", placeholder: "What's the tip or technique?" },
  ];

  const selectedType = POST_TYPES.find(t => t.value === form.type);

  async function generate() {
    setLoading(true); setOutput("");
    const prompts: Record<string, string> = {
      drop: `Write a short, punchy blog post for Art at the Afters about a new painting drop. Voice: Stevie Alger \u2014 casual, LA energy, confident, a little wild, like she's texting her friends. Not formal. Hook: "${form.hook}". Detail: "${form.detail}". Include: what the painting is, why it's cool, how to order. Max 180 words.`,
      bts: `Write a behind-the-scenes blog post for artattheafters.com. Stevie's voice: raw, honest, fun, not trying to be an "artist" in a pretentious way. Hook: "${form.hook}". Detail: "${form.detail}". Include: what the session was like, what was painted, a fun moment. Max 200 words.`,
      commission: `Write a commission spotlight blog post for Art at the Afters. Tone: proud, fun, storytelling. Hook: "${form.hook}". Detail: "${form.detail}". Include: what they ordered, how it came to life, a quote or reaction if possible, end with a CTA to DM for their own. Max 200 words.`,
      life: `Write a lifestyle/personality blog post for Art at the Afters. Stevie's voice: social butterfly, LA nightlife energy, authentic, paint-stained and proud. Hook: "${form.hook}". Detail: "${form.detail}". Max 180 words. End with something that invites the reader in.`,
      tips: `Write a quick "painting tips from Stevie" blog post for artattheafters.com. Voice: casual, experienced but approachable, like advice from a friend who paints. Hook: "${form.hook}". Tip detail: "${form.detail}". Make it useful, 3\u20135 tips max, keep it under 200 words.`,
    };
    try {
      const res = await fetch("/api/admin/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompts[form.type] }),
      });
      const data = await res.json();
      setOutput(data.text || "Error.");
    } catch {
      setOutput("Something went wrong.");
    }
    setLoading(false);
  }

  function savePost() {
    const newPost: BlogPost = { id: Date.now(), type: form.type, hook: form.hook, content: output, date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) };
    const updated = [newPost, ...posts];
    setPosts(updated);
    store("blog_posts", updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function deletePost(id: number) {
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    store("blog_posts", updated);
  }

  const TYPE_EMOJI: Record<string, string> = { drop: "\u{1F3A8}", bts: "\u{1F3A5}", commission: "\u{1F4AC}", life: "\u{1F319}", tips: "\u{1F4A1}" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {!drafting ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: YELLOW, fontWeight: 600, margin: 0 }}>
              Saved Posts ({posts.length})
            </p>
            <button onClick={() => { setDrafting(true); setOutput(""); setForm({ type: "", hook: "", detail: "" }); }}
              style={{ padding: "8px 18px", background: YELLOW + "15", border: `1.5px solid ${YELLOW}55`, borderRadius: 8, color: YELLOW, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body), 'Outfit', sans-serif" }}>
              + New Post
            </button>
          </div>

          {posts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: MUTED, fontSize: 13 }}>
              <p style={{ fontSize: 32, marginBottom: 12 }}>{"\u270D\uFE0F"}</p>
              No posts yet. Click &quot;New Post&quot; to generate your first one with AI.
            </div>
          ) : posts.map(p => (
            <div key={p.id} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 16 }}>{TYPE_EMOJI[p.type] || "\u{1F4DD}"}</span>
                  <p style={{ fontWeight: 700, fontSize: 13.5, margin: 0, color: WHITE }}>{p.hook}</p>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: MUTED }}>{p.date}</span>
                  <button onClick={() => deletePost(p.id)} style={{ background: "transparent", border: "none", color: MUTED, fontSize: 14, cursor: "pointer", padding: "2px 6px" }}>&times;</button>
                </div>
              </div>
              <p style={{ color: DIM, fontSize: 12.5, lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>
                {p.content.substring(0, 200)}&hellip;
              </p>
            </div>
          ))}
        </>
      ) : (
        <>
          <button onClick={() => setDrafting(false)} style={{ background: "transparent", border: "none", color: MUTED, fontSize: 12, cursor: "pointer", textAlign: "left", padding: 0, fontFamily: "var(--font-body), 'Outfit', sans-serif" }}>&larr; Back to posts</button>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {POST_TYPES.map(t => (
              <button key={t.value} onClick={() => setForm(f => ({ ...f, type: t.value }))}
                style={{
                  padding: "11px 12px", background: form.type === t.value ? YELLOW + "15" : CARD,
                  border: `1.5px solid ${form.type === t.value ? YELLOW : BORDER}`,
                  borderRadius: 10, color: form.type === t.value ? YELLOW : DIM,
                  fontSize: 12, fontWeight: form.type === t.value ? 700 : 400,
                  cursor: "pointer", textAlign: "left", fontFamily: "var(--font-body), 'Outfit', sans-serif", transition: "all 0.2s",
                }}>
                {t.label}
              </button>
            ))}
          </div>

          {form.type && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <label style={{ display: "block", fontSize: 11.5, color: MUTED, marginBottom: 5 }}>Hook / Title Idea</label>
                <input value={form.hook} onChange={e => setForm(f => ({ ...f, hook: e.target.value }))}
                  placeholder={selectedType?.placeholder || "What's the hook?"}
                  style={{ width: "100%", background: DARK2, border: `1.5px solid ${BORDER}`, borderRadius: 9, padding: "10px 13px", color: WHITE, fontSize: 13, fontFamily: "var(--font-body), 'Outfit', sans-serif", outline: "none", caretColor: YELLOW, boxSizing: "border-box" }}
                  onFocus={e => e.target.style.borderColor = YELLOW} onBlur={e => e.target.style.borderColor = BORDER}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11.5, color: MUTED, marginBottom: 5 }}>More Details (optional)</label>
                <textarea value={form.detail} onChange={e => setForm(f => ({ ...f, detail: e.target.value }))}
                  placeholder="Any extra context\u2026" rows={3}
                  style={{ width: "100%", background: DARK2, border: `1.5px solid ${BORDER}`, borderRadius: 9, padding: "10px 13px", color: WHITE, fontSize: 13, fontFamily: "var(--font-body), 'Outfit', sans-serif", outline: "none", caretColor: YELLOW, resize: "vertical", boxSizing: "border-box" }}
                  onFocus={e => e.target.style.borderColor = YELLOW} onBlur={e => e.target.style.borderColor = BORDER}
                />
              </div>
              <button onClick={generate} disabled={loading || !form.hook}
                style={{
                  padding: "13px", background: loading ? MUTED : YELLOW, border: "none", borderRadius: 10,
                  color: DARK, fontSize: 13.5, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-body), 'Outfit', sans-serif", letterSpacing: 1, textTransform: "uppercase",
                }}>
                {loading ? "Writing\u2026" : "\u2728 Generate Post"}
              </button>
            </div>
          )}

          {output && (
            <div style={{ background: DARK2, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <p style={{ fontSize: 11, letterSpacing: 2, color: YELLOW, fontWeight: 600, margin: 0, textTransform: "uppercase" }}>Draft</p>
                <button onClick={savePost} style={{
                  padding: "7px 16px", background: saved ? GREEN + "20" : YELLOW + "15",
                  border: `1.5px solid ${saved ? GREEN : YELLOW + "55"}`, borderRadius: 8,
                  color: saved ? GREEN : YELLOW, fontSize: 12, fontWeight: 700, cursor: "pointer",
                  fontFamily: "var(--font-body), 'Outfit', sans-serif",
                }}>{saved ? "\u2713 Saved!" : "Save Post"}</button>
              </div>
              <pre style={{ color: DIM, fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-wrap", margin: 0, fontFamily: "var(--font-body), 'Outfit', sans-serif" }}>{output}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ── Progress Ring ────────────────────────────────────────────────
function ProgressRing({ pct, color, size = 52, stroke = 4 }: { pct: number; color: string; size?: number; stroke?: number }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={BORDER} strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s ease" }} />
      <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central"
        fill={color} fontSize={size * 0.22} fontWeight="700" fontFamily="var(--font-body), 'Outfit', sans-serif"
        style={{ transform: "rotate(90deg)", transformOrigin: "center" }}>
        {Math.round(pct)}%
      </text>
    </svg>
  );
}

// ── Funnel Card ──────────────────────────────────────────────────
function FunnelCard({ funnel, checks, onToggle, idx }: { funnel: Funnel; checks: Record<string, boolean>; onToggle: (key: string) => void; idx: number }) {
  const [open, setOpen] = useState(false);
  const on = useMounted(80 + idx * 60);
  const completed = funnel.steps.filter(s => checks[`${funnel.id}_${s.id}`]).length;
  const total = funnel.steps.length;
  const pct = total ? (completed / total) * 100 : 0;
  const allDone = completed === total;

  return (
    <div style={{
      background: CARD, border: `1px solid ${open ? funnel.color + "44" : BORDER}`,
      borderRadius: 14, overflow: "hidden",
      opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.5s ease, transform 0.5s ease, border-color 0.3s",
      boxShadow: open ? `0 0 30px ${funnel.color}0d` : "none",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "18px 20px", background: "transparent", border: "none",
        display: "flex", alignItems: "center", gap: 14, cursor: "pointer", textAlign: "left",
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, background: funnel.color + "15",
          border: `1px solid ${funnel.color}33`, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 20, flexShrink: 0,
        }}>{funnel.emoji}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: WHITE }}>{funnel.title}</span>
            {allDone && <span style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: funnel.color, background: funnel.color + "15", padding: "2px 8px", borderRadius: 100, fontWeight: 600 }}>{"\u2713"} Done</span>}
          </div>
          <p style={{ color: MUTED, fontSize: 12, margin: "2px 0 8px" }}>{funnel.subtitle} &middot; <span style={{ color: funnel.color + "cc" }}>{funnel.revenue}</span></p>
          <div style={{ height: 2, borderRadius: 100, background: BORDER, width: "100%", maxWidth: 180 }}>
            <div style={{ height: "100%", borderRadius: 100, background: funnel.color, width: `${pct}%`, transition: "width 0.5s ease" }} />
          </div>
          <p style={{ color: MUTED, fontSize: 11, marginTop: 4 }}>{completed}/{total} steps</p>
        </div>
        <ProgressRing pct={pct} color={funnel.color} />
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s", flexShrink: 0 }}>
          <path d="M4 6l4 4 4-4" stroke={MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div style={{ borderTop: `1px solid ${funnel.color}22`, padding: "4px 20px 16px" }}>
          {funnel.steps.map((step, i) => {
            const key = `${funnel.id}_${step.id}`;
            const done = !!checks[key];
            return (
              <div key={step.id} onClick={() => onToggle(key)}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0",
                  borderBottom: i < funnel.steps.length - 1 ? `1px solid ${BORDER}33` : "none",
                  cursor: "pointer", opacity: done ? 0.5 : 1, transition: "opacity 0.2s",
                }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 1,
                  border: `2px solid ${done ? funnel.color : BORDER}`,
                  background: done ? funnel.color + "22" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
                }}>
                  {done && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 4-4" stroke={funnel.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 13.5, color: done ? MUTED : WHITE, textDecoration: done ? "line-through" : "none", margin: "0 0 3px", lineHeight: 1.4 }}>{step.label}</p>
                  <p style={{ fontSize: 11.5, color: MUTED, margin: 0, lineHeight: 1.5 }}>{step.note}</p>
                </div>
                <span style={{ fontSize: 10, color: MUTED, flexShrink: 0, marginTop: 3 }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
            );
          })}
          {allDone && (
            <div style={{ marginTop: 12, padding: "12px 16px", borderRadius: 10, background: funnel.color + "10", border: `1px solid ${funnel.color}33`, display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 16 }}>{"\u{1F525}"}</span>
              <p style={{ fontSize: 12.5, color: funnel.color, fontWeight: 600, margin: 0 }}>Funnel complete! Maximum revenue activated.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── LOGIN ────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [shake, setShake] = useState(false);
  const [focused, setFocused] = useState(false);
  const on = useMounted(60);

  function attempt() {
    if (pw.toLowerCase() === "afterparty") { onLogin(); }
    else { setShake(true); setPw(""); setTimeout(() => setShake(false), 600); }
  }

  return (
    <div style={{ minHeight: "100vh", background: DARK, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-body), 'Outfit', sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div style={{ position: "absolute", top: "15%", left: "8%", width: 350, height: 350, borderRadius: "50%", background: PINK, opacity: 0.04, filter: "blur(100px)" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "8%", width: 350, height: 350, borderRadius: "50%", background: GREEN, opacity: 0.04, filter: "blur(100px)" }} />

      <div style={{ opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s cubic-bezier(.2,.8,.4,1)", width: "100%", maxWidth: 400, padding: "0 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="26" height="32" viewBox="0 0 200 240"><g transform="translate(5,5)"><path d="M48 170Q52 135 60 95Q68 58 78 28Q84 12 90 5Q93 2 95 3" stroke={PINK} strokeWidth="16" fill="none" strokeLinecap="round" /><path d="M95 3Q97 2 100 5Q106 12 112 28Q122 58 130 95Q138 135 142 170" stroke={PINK} strokeWidth="16" fill="none" strokeLinecap="round" /><path d="M62 110Q78 104 95 108Q112 112 128 106" stroke={GREEN} strokeWidth="9" fill="none" strokeLinecap="round" /></g></svg>
          <span style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: WHITE }}>Art at the Afters</span>
        </div>
        <p style={{ color: MUTED, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 44, fontWeight: 500 }}>Admin Portal</p>

        <div style={{ width: "100%", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "34px 30px", animation: shake ? "shake 0.4s ease" : "none" }}>
          <h2 style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: WHITE, margin: "0 0 6px" }}>
            Welcome back, <span style={{ color: PINK, fontStyle: "italic" }}>Stevie</span>
          </h2>
          <p style={{ color: MUTED, fontSize: 13, margin: "0 0 26px", lineHeight: 1.6 }}>Your entire business, one dashboard.</p>

          <div style={{ border: `1.5px solid ${focused ? PINK : BORDER}`, borderRadius: 11, background: DARK2, marginBottom: 14, transition: "border-color 0.3s" }}>
            <input type="password" placeholder="Password" value={pw}
              onChange={e => setPw(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
              onKeyDown={e => e.key === "Enter" && attempt()}
              style={{ width: "100%", background: "transparent", border: "none", padding: "13px 15px", color: WHITE, fontSize: 14, fontFamily: "var(--font-body), 'Outfit', sans-serif", outline: "none", caretColor: PINK, boxSizing: "border-box" }} />
          </div>

          <button onClick={attempt} style={{ width: "100%", padding: "13px", background: PINK, border: "none", borderRadius: 11, color: WHITE, fontSize: 13.5, fontWeight: 700, fontFamily: "var(--font-body), 'Outfit', sans-serif", letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", boxShadow: `0 0 24px ${PINK}33`, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}>
            Enter &rarr;
          </button>
          <p style={{ color: MUTED, fontSize: 11, textAlign: "center", marginTop: 14, letterSpacing: 0.5 }}>Hint: what happens after the bar closes {"\u{1F37B}"}</p>
        </div>
      </div>

      <style>{`
        @keyframes shake { 0%,100% {transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
        * { box-sizing: border-box; }
        input::placeholder { color: ${MUTED}; }
      `}</style>
    </div>
  );
}

// ── DASHBOARD ────────────────────────────────────────────────────
const TABS = [
  { id: "funnels", label: "\u{1F4B0} Funnels", color: PINK },
  { id: "kit", label: "\u{1F3A8} Kit Builder", color: GREEN },
  { id: "email", label: "\u2709\uFE0F Emails", color: BLUE },
  { id: "blog", label: "\u270D\uFE0F Blog", color: YELLOW },
];

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState("funnels");
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  const on = useMounted(50);

  useEffect(() => {
    setChecks(load("admin_checks", {}));
    setLoaded(true);
  }, []);

  function toggle(key: string) {
    setChecks(prev => {
      const next = { ...prev, [key]: !prev[key] };
      store("admin_checks", next);
      return next;
    });
  }

  const totalSteps = FUNNELS.reduce((a, f) => a + f.steps.length, 0);
  const totalDone = FUNNELS.reduce((a, f) => a + f.steps.filter(s => checks[`${f.id}_${s.id}`]).length, 0);
  const overallPct = totalSteps ? Math.round((totalDone / totalSteps) * 100) : 0;

  if (!loaded) return <div style={{ minHeight: "100vh", background: DARK, display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ color: MUTED, fontFamily: "var(--font-body), 'Outfit', sans-serif" }}>Loading&hellip;</p></div>;

  return (
    <div style={{ minHeight: "100vh", background: DARK, fontFamily: "var(--font-body), 'Outfit', sans-serif", color: WHITE }}>
      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: DARK2 + "f0", backdropFilter: "blur(14px)", borderBottom: `1px solid ${BORDER}`, padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="20" height="24" viewBox="0 0 200 240"><g transform="translate(5,5)"><path d="M48 170Q52 135 60 95Q68 58 78 28Q84 12 90 5Q93 2 95 3" stroke={PINK} strokeWidth="18" fill="none" strokeLinecap="round" /><path d="M95 3Q97 2 100 5Q106 12 112 28Q122 58 130 95Q138 135 142 170" stroke={PINK} strokeWidth="18" fill="none" strokeLinecap="round" /><path d="M62 110Q78 104 95 108Q112 112 128 106" stroke={GREEN} strokeWidth="10" fill="none" strokeLinecap="round" /></g></svg>
          <span style={{ fontSize: 13, fontWeight: 700 }}>Art at the Afters</span>
          <span style={{ fontSize: 10, color: MUTED, letterSpacing: 2, textTransform: "uppercase", marginLeft: 4 }}>Admin</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 12px", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN, boxShadow: `0 0 6px ${GREEN}` }} />
            <span style={{ fontSize: 11, color: DIM }}>{overallPct}% complete</span>
          </div>
          <button onClick={onLogout} style={{ background: "transparent", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "6px 13px", color: MUTED, fontSize: 11, cursor: "pointer", fontFamily: "var(--font-body), 'Outfit', sans-serif", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = WHITE; e.currentTarget.style.borderColor = MUTED; }}
            onMouseLeave={e => { e.currentTarget.style.color = MUTED; e.currentTarget.style.borderColor = BORDER; }}>
            Log out
          </button>
        </div>
      </nav>

      {/* TABS */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "0 20px", background: DARK2, display: "flex", gap: 4, overflowX: "auto" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "14px 18px", background: "transparent", border: "none",
            borderBottom: `2px solid ${tab === t.id ? t.color : "transparent"}`,
            color: tab === t.id ? t.color : MUTED, fontSize: 13, fontWeight: tab === t.id ? 700 : 400,
            cursor: "pointer", whiteSpace: "nowrap", fontFamily: "var(--font-body), 'Outfit', sans-serif",
            transition: "all 0.2s", marginBottom: -1,
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "28px 20px 80px" }}>

        {/* FUNNELS TAB */}
        {tab === "funnels" && (
          <>
            <div style={{ opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s ease", marginBottom: 28 }}>
              <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: GREEN, marginBottom: 8, fontWeight: 600 }}>Revenue Playbook</p>
              <h1 style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 10px" }}>
                Every Funnel.<br /><span style={{ color: PINK, fontStyle: "italic" }}>Maximum</span> Revenue.
              </h1>
              <p style={{ color: DIM, fontSize: 13.5, maxWidth: 500, lineHeight: 1.7, fontWeight: 300 }}>
                Every situation you&apos;ll face &mdash; new drop, commission, post-sale, weekly growth, revenue tricks. Check every step. Never leave money on the table.
              </p>
            </div>

            {/* stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 10, marginBottom: 24 }}>
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "16px 18px", gridColumn: "span 2" }}>
                <p style={{ fontSize: 10, color: MUTED, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Overall Progress</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ height: 5, borderRadius: 100, background: BORDER }}>
                      <div style={{ height: "100%", borderRadius: 100, background: `linear-gradient(90deg, ${PINK}, ${GREEN})`, width: `${overallPct}%`, transition: "width 0.6s ease" }} />
                    </div>
                    <p style={{ fontSize: 11, color: DIM, marginTop: 6 }}>{totalDone}/{totalSteps} steps complete</p>
                  </div>
                  <span style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: WHITE }}>{overallPct}%</span>
                </div>
              </div>
              {FUNNELS.map(f => {
                const done = f.steps.filter(s => checks[`${f.id}_${s.id}`]).length;
                const pct = Math.round((done / f.steps.length) * 100);
                return (
                  <div key={f.id} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "14px" }}>
                    <p style={{ fontSize: 18, marginBottom: 5 }}>{f.emoji}</p>
                    <p style={{ fontSize: 10, color: MUTED, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>{f.title}</p>
                    <p style={{ fontWeight: 700, color: f.color, fontSize: 17 }}>{pct}%</p>
                    <p style={{ fontSize: 10.5, color: MUTED, marginTop: 1 }}>{done}/{f.steps.length}</p>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {FUNNELS.map((f, i) => <FunnelCard key={f.id} funnel={f} checks={checks} onToggle={toggle} idx={i} />)}
            </div>

            <div style={{ marginTop: 32, padding: "18px 20px", borderRadius: 12, background: DARK3, border: `1px solid ${BORDER}`, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{"\u{1F4A1}"}</span>
              <div>
                <p style={{ fontWeight: 600, fontSize: 13, color: WHITE, marginBottom: 5 }}>Stevie&apos;s Golden Rule</p>
                <p style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.7, margin: 0 }}>
                  You went from 0 to 75 paintings on pure energy. These funnels make sure every piece of that energy compounds into revenue. Work smarter, not harder.
                </p>
              </div>
            </div>
          </>
        )}

        {/* KIT BUILDER TAB */}
        {tab === "kit" && (
          <>
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: GREEN, marginBottom: 8, fontWeight: 600 }}>Affiliate Tool</p>
              <h1 style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 8px" }}>
                Paint Kit <span style={{ color: GREEN, fontStyle: "italic" }}>Builder</span>
              </h1>
              <p style={{ color: DIM, fontSize: 13, lineHeight: 1.7, fontWeight: 300 }}>
                This is the public-facing quiz on your website. Every recommended product links to Amazon with your affiliate tag. Answer a few questions &rarr; get a personalized kit &rarr; click to buy.
              </p>
            </div>
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "28px 24px" }}>
              <PaintKitBuilder />
            </div>
          </>
        )}

        {/* EMAIL TAB */}
        {tab === "email" && (
          <>
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: BLUE, marginBottom: 8, fontWeight: 600 }}>AI Email Drafts</p>
              <h1 style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 8px" }}>
                Write Emails in <span style={{ color: BLUE, fontStyle: "italic" }}>Seconds</span>
              </h1>
              <p style={{ color: DIM, fontSize: 13, lineHeight: 1.7, fontWeight: 300 }}>
                Pick an email type, fill in the details, and Claude writes it in your voice. Copy, paste, done.
              </p>
            </div>
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "24px" }}>
              <EmailComposer />
            </div>
          </>
        )}

        {/* BLOG TAB */}
        {tab === "blog" && (
          <>
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: YELLOW, marginBottom: 8, fontWeight: 600 }}>AI Blog Generator</p>
              <h1 style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 8px" }}>
                Content That Sounds <span style={{ color: YELLOW, fontStyle: "italic" }}>Like You</span>
              </h1>
              <p style={{ color: DIM, fontSize: 13, lineHeight: 1.7, fontWeight: 300 }}>
                Give Claude a hook and a few details. It writes in your voice &mdash; raw, confident, LA energy. Save posts, publish to your site.
              </p>
            </div>
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "24px" }}>
              <BlogTool />
            </div>
          </>
        )}
      </div>

      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: ${DARK}; }
        ::-webkit-scrollbar-thumb { background: ${BORDER}; border-radius: 100px; }
        input::placeholder, textarea::placeholder { color: ${MUTED}; }
      `}</style>
    </div>
  );
}

// ── ROOT ─────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  return authed
    ? <Dashboard onLogout={() => setAuthed(false)} />
    : <LoginScreen onLogin={() => setAuthed(true)} />;
}
