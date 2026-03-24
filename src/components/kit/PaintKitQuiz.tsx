"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Quiz data ────────────────────────────────────────────────────
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
    id: "level",
    question: "What\u2019s your painting experience?",
    emoji: "\u{1F58C}\uFE0F",
    subtitle: "No judgment \u2014 just helps us pick the right tools",
    options: [
      { value: "beginner", label: "Total Beginner", desc: "Never painted before, ready to try", emoji: "\u{1F331}" },
      { value: "hobbyist", label: "Casual Hobbyist", desc: "Painted a few times, love it", emoji: "\u{1F3A8}" },
      { value: "intermediate", label: "Getting Serious", desc: "Developing your own style", emoji: "\u{1F525}" },
      { value: "advanced", label: "Advanced Artist", desc: "Technique matters, quality is key", emoji: "\u26A1" },
    ],
  },
  {
    id: "style",
    question: "What kind of art calls to you?",
    emoji: "\u2728",
    subtitle: "Pick the vibe that speaks loudest",
    options: [
      { value: "abstract", label: "Abstract / Expressive", desc: "Free, chaotic, emotional", emoji: "\u{1F300}" },
      { value: "illustrative", label: "Characters & Illustration", desc: "Figures, animals, pop art", emoji: "\u{1F98B}" },
      { value: "landscape", label: "Landscapes & Nature", desc: "Outdoors, skies, dreamscapes", emoji: "\u{1F305}" },
      { value: "portrait", label: "Portraits & People", desc: "Faces, expressions, realism", emoji: "\u{1F464}" },
    ],
  },
  {
    id: "surface",
    question: "What do you want to paint on?",
    emoji: "\u{1F5BC}\uFE0F",
    subtitle: "Surfaces change everything about your technique",
    options: [
      { value: "canvas_stretched", label: "Stretched Canvas", desc: "Classic, ready to hang immediately", emoji: "\u{1F3AF}" },
      { value: "canvas_board", label: "Canvas Board", desc: "Firm, portable, great for practice", emoji: "\u{1F4CB}" },
      { value: "paper", label: "Mixed Media Paper", desc: "Budget-friendly, great for studies", emoji: "\u{1F4C4}" },
      { value: "wood", label: "Wood Panel", desc: "Smooth, archival, premium feel", emoji: "\u{1FAB5}" },
    ],
  },
  {
    id: "medium",
    question: "Which paint medium?",
    emoji: "\u{1F4A7}",
    subtitle: "Acrylic is Stevie\u2019s go-to \u2014 but it\u2019s your kit",
    options: [
      { value: "acrylic", label: "Acrylic", desc: "Fast-dry, vibrant, beginner-friendly", emoji: "\u26A1" },
      { value: "oil", label: "Oil Paint", desc: "Slow-dry, blendable, rich color", emoji: "\u{1F3AD}" },
      { value: "watercolor", label: "Watercolor", desc: "Transparent, luminous, fluid", emoji: "\u{1F4A7}" },
      { value: "gouache", label: "Gouache", desc: "Opaque watercolor, matte finish", emoji: "\u{1F33F}" },
    ],
  },
  {
    id: "workspace",
    question: "How\u2019s your workspace setup?",
    emoji: "\u{1F3E0}",
    subtitle: "Helps us pick the right easel and furniture",
    options: [
      { value: "floor", label: "Floor / Open Space", desc: "Lots of room, I like working big", emoji: "\u{1F3DF}\uFE0F" },
      { value: "desk", label: "Desk or Table", desc: "Seated setup, compact space", emoji: "\u{1F4BB}" },
      { value: "outdoor", label: "Outdoor / En Plein Air", desc: "I paint outside sometimes", emoji: "\u{1F324}\uFE0F" },
      { value: "portable", label: "On the Go", desc: "I travel with my supplies", emoji: "\u{1F392}" },
    ],
  },
  {
    id: "vibe",
    question: "What\u2019s your painting vibe?",
    emoji: "\u{1F319}",
    subtitle: "The afterparty question \u2014 when and how do you create?",
    options: [
      { value: "late_night", label: "Late Night Sessions", desc: "Painting at 2am with drinks", emoji: "\u{1F319}" },
      { value: "weekend", label: "Weekend Warrior", desc: "Saturday afternoon energy", emoji: "\u2600\uFE0F" },
      { value: "group", label: "Group / Party Painting", desc: "Painting with friends is more fun", emoji: "\u{1F942}" },
      { value: "solo_focus", label: "Solo Deep Focus", desc: "Headphones in, world out", emoji: "\u{1F3A7}" },
    ],
  },
  {
    id: "budget",
    question: "What\u2019s your kit budget?",
    emoji: "\u{1F4B8}",
    subtitle: "We\u2019ll recommend the best bang for your buck",
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

// ── Category styling ─────────────────────────────────────────────
const CATEGORIES: Record<string, { label: string; color: string }> = {
  brushes: { label: "\u{1F58C}\uFE0F Brushes", color: "brand-pink" },
  paints: { label: "\u{1F3A8} Paints", color: "brand-green" },
  surfaces: { label: "\u{1F5BC}\uFE0F Surfaces", color: "brand-pink" },
  easels: { label: "\u{1F4D0} Easel", color: "brand-green" },
  stools: { label: "\u{1FA91} Stool", color: "brand-pink" },
  extras: { label: "\u2728 Extras", color: "brand-green" },
};

// ── Component ────────────────────────────────────────────────────
export default function PaintKitQuiz() {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"intro" | "quiz" | "results">("intro");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [kit, setKit] = useState<Kit | null>(null);

  function startQuiz() {
    setPhase("quiz");
    setStep(0);
  }

  function selectOption(val: string) {
    setSelected(val);
    setTimeout(() => {
      const newAnswers = { ...answers, [QUIZ_STEPS[step].id]: val };
      setAnswers(newAnswers);
      setSelected(null);
      if (step < QUIZ_STEPS.length - 1) {
        setStep(s => s + 1);
      } else {
        setKit(buildKit(newAnswers));
        setPhase("results");
      }
    }, 300);
  }

  function restart() {
    setPhase("intro");
    setStep(0);
    setAnswers({});
    setSelected(null);
    setKit(null);
  }

  const progress = phase === "quiz" ? (step / QUIZ_STEPS.length) * 100 : phase === "results" ? 100 : 0;
  const current = QUIZ_STEPS[step];

  return (
    <div className="min-h-[400px]">
      {/* Progress bar */}
      {phase !== "intro" && (
        <div className="h-[3px] rounded-full bg-brand-gray mb-8 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-pink to-brand-green"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      )}

      {/* INTRO */}
      {phase === "intro" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center py-8"
        >
          <div className="text-6xl mb-6 animate-bounce">{"\u{1F3A8}"}</div>
          <p className="text-brand-muted text-sm mb-8 max-w-sm leading-relaxed">
            Answer 7 quick questions and get a personalized recommendation for
            brushes, paints, canvas, easel, stool, and extras &mdash; all linked
            to Amazon so you can buy instantly.
          </p>
          <button
            onClick={startQuiz}
            className="px-12 py-4 bg-brand-pink rounded-full text-brand-white font-body font-bold text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(255,68,170,0.25)] hover:scale-105 active:scale-95 transition-transform press-scale"
          >
            Build My Kit &rarr;
          </button>
          <p className="text-brand-muted/60 text-xs mt-5">
            Takes about 2 minutes. No email required.
          </p>
        </motion.div>
      )}

      {/* QUIZ */}
      <AnimatePresence mode="wait">
        {phase === "quiz" && current && (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">{current.emoji}</div>
              <p className="text-[11px] text-brand-muted uppercase tracking-[3px] mb-2">
                Question {step + 1} of {QUIZ_STEPS.length}
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-brand-white mb-2">
                {current.question}
              </h3>
              <p className="text-brand-muted text-sm">{current.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {current.options.map(opt => {
                const isSelected = selected === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => selectOption(opt.value)}
                    className={`
                      text-left rounded-2xl p-4 border transition-all duration-200 press-scale
                      ${isSelected
                        ? "border-brand-pink bg-brand-pink/10 scale-[0.97]"
                        : "border-brand-gray bg-brand-dark2 hover:border-brand-pink/40 hover:bg-brand-pink/5"
                      }
                    `}
                  >
                    <div className="text-2xl mb-2">{opt.emoji}</div>
                    <p className="font-body font-bold text-[13px] text-brand-white mb-1">
                      {opt.label}
                    </p>
                    <p className="text-brand-muted text-[11px] leading-relaxed">
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {step > 0 && (
              <button
                onClick={() => {
                  setStep(s => s - 1);
                  setAnswers(a => {
                    const n = { ...a };
                    delete n[QUIZ_STEPS[step].id];
                    return n;
                  });
                }}
                className="block mx-auto mt-5 text-brand-muted text-xs hover:text-brand-white transition-colors"
              >
                &larr; Back
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* RESULTS */}
      {phase === "results" && kit && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">{"\u{1F389}"}</div>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-brand-white mb-2">
              Your <span className="text-brand-pink italic">Perfect Kit</span>
            </h3>
            <p className="text-brand-muted text-sm mb-1">
              Curated by Stevie Alger &middot; Art at the Afters
            </p>
            <p className="text-brand-muted/60 text-xs max-w-sm mx-auto">
              Every item linked to Amazon. Buying through these links supports
              Art at the Afters. {"\u{1F3A8}"}
            </p>
          </div>

          {(Object.entries(kit) as [string, KitItem[]][]).map(
            ([cat, items]) =>
              items.length > 0 && (
                <div key={cat} className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-1.5 h-1.5 rounded-full bg-${CATEGORIES[cat].color}`} />
                    <p className={`text-[11px] font-bold uppercase tracking-[2px] text-${CATEGORIES[cat].color}`}>
                      {CATEGORIES[cat].label}
                    </p>
                  </div>
                  {items.map((item, i) => (
                    <a
                      key={i}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start justify-between p-4 bg-brand-dark2 border border-brand-gray rounded-xl mb-2 no-underline gap-3 transition-all duration-200 hover:border-brand-pink/30 hover:bg-brand-pink/5 group"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-body font-semibold text-[13px] text-brand-white mb-1 group-hover:text-brand-pink transition-colors">
                          {item.name}
                        </p>
                        <p className="text-brand-muted text-xs leading-relaxed">
                          {item.why}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-brand-green font-bold text-[13px] mb-1">
                          {item.price}
                        </p>
                        <p className="text-brand-muted/50 text-[10px]">
                          Amazon &rarr;
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )
          )}

          {/* DM CTA */}
          <div className="p-5 bg-brand-pink/10 border border-brand-pink/20 rounded-xl text-center mb-6">
            <p className="text-brand-white text-sm leading-relaxed">
              Want Stevie to personally pick and source your kit?{" "}
              <a
                href="https://www.instagram.com/artattheafters/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-pink font-bold hover:underline"
              >
                DM @artattheafters
              </a>{" "}
              and she&apos;ll build it for you. {"\u2728"}
            </p>
          </div>

          <button
            onClick={restart}
            className="block mx-auto px-8 py-3 border border-brand-gray rounded-full text-brand-muted text-sm hover:border-brand-muted hover:text-brand-white transition-all press-scale"
          >
            ↺ Start Over
          </button>
        </motion.div>
      )}
    </div>
  );
}
