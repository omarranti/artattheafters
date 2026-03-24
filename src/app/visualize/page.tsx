"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const PINK = "#FF44AA";
const GREEN = "#5BFFA0";
const DARK = "#1A1825";
const DARK2 = "#221F30";
const DARK3 = "#2A2738";
const GRAY = "#3D3A4E";
const GRAY2 = "#504D63";
const MUTED = "#9490A8";
const WHITE = "#F8F6FF";

const SIZES = [
  { id: "5x7", label: "5×7", w: 5, h: 7, base: 50, tag: "Mini" },
  { id: "8x10", label: "8×10", w: 8, h: 10, base: 100, tag: "Classic" },
  { id: "9x12", label: "9×12", w: 9, h: 12, base: 150, tag: "Popular" },
  { id: "11x14", label: "11×14", w: 11, h: 14, base: 200, tag: "" },
  { id: "16x20", label: "16×20", w: 16, h: 20, base: 350, tag: "Statement" },
  { id: "26x32", label: "26×32", w: 26, h: 32, base: 600, tag: "Grand" },
  { id: "custom", label: "Custom", w: 0, h: 0, base: 0, tag: "You decide" },
];

const MOODS = [
  { id: "chaos", label: "Chaotic Energy", emoji: "⚡", colors: ["#FF3399", "#FF6B35", "#FFE66D", "#39FF33"], desc: "Wild, layered, untamed" },
  { id: "dark", label: "Dark & Moody", emoji: "🌙", colors: ["#1a0a2e", "#3d1f6d", "#8B5CF6", "#FF3399"], desc: "Deep, mysterious, intense" },
  { id: "pop", label: "Pop Culture", emoji: "🎮", colors: ["#FFE66D", "#FF6B35", "#39FF33", "#00D4FF"], desc: "Nostalgic, bold, fun" },
  { id: "serene", label: "Ocean Calm", emoji: "🌊", colors: ["#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"], desc: "Peaceful, flowing, blue" },
  { id: "fire", label: "On Fire", emoji: "🔥", colors: ["#FF0000", "#FF4500", "#FF8C00", "#FFD700"], desc: "Hot, passionate, alive" },
  { id: "custom_mood", label: "Surprise Me", emoji: "🎲", colors: ["#FF3399", "#39FF33", "#00D4FF", "#FFE66D"], desc: "Let Stevie decide" },
];

const ADDONS = [
  { id: "glow_paint", label: "Glow-in-the-Dark Paint", price: 40, icon: "✨", desc: "UV reactive accents that glow at night" },
  { id: "texture", label: "Heavy Texture / Impasto", price: 30, icon: "🪨", desc: "Thick, sculptural brushstrokes you can feel" },
  { id: "gold_leaf", label: "Gold Leaf Accents", price: 60, icon: "🥇", desc: "Real metallic gold leaf details" },
  { id: "custom_frame", label: "Custom Frame", price: 80, icon: "🖼️", desc: "Hand-selected frame to match your piece" },
  { id: "signed", label: "Signed + Numbered", price: 0, icon: "✍️", desc: "Certificate of authenticity included" },
  { id: "rush", label: "Rush Order (3 days)", price: 50, icon: "⏰", desc: "Jump the queue — painted in 72 hours" },
];

const QUESTIONS = [
  { id: "name", q: "What should we call you?", placeholder: "Your first name", type: "text" },
  { id: "vibe", q: "Pick a word that describes your space:", type: "pills", options: ["Minimal", "Eclectic", "Cozy", "Loud", "Dark", "Colorful"] },
  { id: "for_who", q: "Who's this piece for?", type: "pills", options: ["Me", "A gift", "My apartment", "My office", "Just vibes"] },
  { id: "fav", q: "What's your favorite thing to look at?", placeholder: "A sunset, anime, your dog, anything...", type: "text" },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function PaintCanvas({ mood, size, addons }: { mood: string; size: string; addons: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; r: number; color: string; vx: number; vy: number; opacity: number; phase: number; gold?: boolean }>>([]);

  const moodColors = MOODS.find(m => m.id === mood)?.colors || MOODS[0].colors;

  const createParticles = useCallback(() => {
    const p: Array<{ x: number; y: number; r: number; color: string; vx: number; vy: number; opacity: number; phase: number; gold?: boolean }> = [];
    for (let i = 0; i < 60; i++) {
      p.push({
        x: Math.random() * 400,
        y: Math.random() * 400,
        r: Math.random() * 30 + 5,
        color: moodColors[Math.floor(Math.random() * moodColors.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
      });
    }
    if (addons.includes("gold_leaf")) {
      for (let i = 0; i < 8; i++) {
        p.push({ x: Math.random() * 400, y: Math.random() * 400, r: Math.random() * 15 + 8, color: "#DAA520", vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2, opacity: 0.7, phase: Math.random() * Math.PI * 2, gold: true });
      }
    }
    return p;
  }, [moodColors, addons]);

  useEffect(() => {
    particlesRef.current = createParticles();
  }, [createParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.fillStyle = DARK;
      ctx.fillRect(0, 0, 400, 400);
      particlesRef.current.forEach((p) => {
        p.x += p.vx + Math.sin(t + p.phase) * 0.3;
        p.y += p.vy + Math.cos(t + p.phase) * 0.3;
        if (p.x < -40) p.x = 440;
        if (p.x > 440) p.x = -40;
        if (p.y < -40) p.y = 440;
        if (p.y > 440) p.y = -40;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
        if (p.gold) {
          ctx.strokeStyle = "#FFD70066";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
      if (addons.includes("glow_paint")) {
        ctx.globalCompositeOperation = "screen";
        for (let i = 0; i < 5; i++) {
          const gx = 200 + Math.sin(t * 2 + i) * 120;
          const gy = 200 + Math.cos(t * 2.5 + i * 1.3) * 120;
          ctx.beginPath();
          ctx.arc(gx, gy, 25, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(57,255,51,${0.15 + Math.sin(t * 3 + i) * 0.08})`;
          ctx.fill();
        }
        ctx.globalCompositeOperation = "source-over";
      }
      if (addons.includes("texture")) {
        for (let i = 0; i < 30; i++) {
          const tx = Math.random() * 400;
          const ty = Math.random() * 400;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(tx + (Math.random() - 0.5) * 20, ty + (Math.random() - 0.5) * 20);
          ctx.strokeStyle = `rgba(255,255,255,${Math.random() * 0.06})`;
          ctx.lineWidth = Math.random() * 3 + 1;
          ctx.stroke();
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [mood, addons]);

  const sizeObj = SIZES.find(s => s.id === size) || SIZES[1];
  const aspect = sizeObj.w && sizeObj.h ? sizeObj.h / sizeObj.w : 1;

  return (
    <div ref={containerRef} className="visualize-canvas-wrap">
      <div className="visualize-canvas-frame" style={{ aspectRatio: `${1} / ${aspect}` }}>
        <canvas ref={canvasRef} width={400} height={400} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div className="visualize-canvas-label">{sizeObj.label}&quot;</div>
      </div>
      <p className="visualize-canvas-note">
        Live preview — your actual piece will be hand-painted by Stevie with way more soul than any screen can show
      </p>
    </div>
  );
}

function Splatter({ style }: { style: React.CSSProperties }) {
  return (
    <div style={{ position: "absolute", pointerEvents: "none", ...style }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="30" fill={PINK} opacity="0.06" />
        <circle cx="40" cy="45" r="12" fill={GREEN} opacity="0.05" />
        <circle cx="80" cy="75" r="8" fill={PINK} opacity="0.04" />
        <circle cx="55" cy="85" r="5" fill={GREEN} opacity="0.06" />
      </svg>
    </div>
  );
}

export default function VisualizeYourPiece() {
  const [phase, setPhase] = useState("intro");
  const [qStep, setQStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [size, setSize] = useState("8x10");
  const [mood, setMood] = useState("chaos");
  const [idea, setIdea] = useState("");
  const [addons, setAddons] = useState(["signed"]);
  const [uploaded, setUploaded] = useState<{ name: string; url: string } | null>(null);
  const [builderTab, setBuilderTab] = useState("size");
  const [fadeIn, setFadeIn] = useState(true);
  const isMobile = useIsMobile();

  const transition = (next: string | (() => void)) => {
    setFadeIn(false);
    setTimeout(() => { if (typeof next === "function") next(); else setPhase(next); setFadeIn(true); }, 300);
  };

  const currentQ = QUESTIONS[qStep];
  const sizeObj = SIZES.find(s => s.id === size) || SIZES[1];
  const addonTotal = ADDONS.filter(a => addons.includes(a.id)).reduce((s, a) => s + a.price, 0);
  const total = sizeObj.base + addonTotal;

  const toggleAddon = (id: string) => {
    setAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploaded({ name: file.name, url: ev.target?.result as string });
      reader.readAsDataURL(file);
    }
  };

  // ============ INTRO ============
  if (phase === "intro") return (
    <div className="visualize-page">
      <style>{visualizeStyles}</style>
      <Splatter style={{ top: -20, right: -30 }} />
      <Splatter style={{ bottom: 40, left: -20 }} />
      <div className={`visualize-fade ${fadeIn ? "in" : ""} visualize-center-full`}>
        <div className="visualize-icon-circle">
          <svg width="28" height="28" viewBox="0 0 200 240"><g transform="translate(5,5)"><path d="M48 170Q52 135 60 95Q68 58 78 28Q84 12 90 5Q93 2 95 3" stroke={PINK} strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85"/><path d="M95 3Q97 2 100 5Q106 12 112 28Q122 58 130 95Q138 135 142 170" stroke={PINK} strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85"/><path d="M62 110Q78 104 95 108Q112 112 128 106" stroke={GREEN} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.75"/></g></svg>
        </div>
        <h1 className="visualize-hero-title">
          Visualize<br />
          <span style={{ color: PINK }}>Your Piece</span>
        </h1>
        <p className="visualize-hero-desc">
          Tell us a little about yourself, pick your vibe, and watch your custom artwork come to life. Every piece is one of a kind — painted by Stevie just for you.
        </p>
        <button onClick={() => transition("questions")} className="visualize-btn-go">
          Let&apos;s Go
        </button>
        <p className="visualize-credit">Art at the Afters &middot; by Stevie Alger</p>
      </div>
    </div>
  );

  // ============ QUESTIONS ============
  if (phase === "questions") return (
    <div className="visualize-page">
      <style>{visualizeStyles}</style>
      <Splatter style={{ top: 20, left: -40 }} />
      <div className={`visualize-fade ${fadeIn ? "in" : ""} visualize-center-full`}>
        <div className="visualize-progress-dots">
          {QUESTIONS.map((_, i) => (
            <div key={i} className={`visualize-dot ${i === qStep ? "active" : ""} ${i <= qStep ? "filled" : ""}`} />
          ))}
        </div>
        <p className="visualize-q-counter">Question {qStep + 1} of {QUESTIONS.length}</p>
        <h2 className="visualize-q-title">{currentQ.q}</h2>
        {currentQ.type === "text" && (
          <input
            type="text"
            placeholder={currentQ.placeholder}
            value={answers[currentQ.id] || ""}
            onChange={e => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
            onKeyDown={e => { if (e.key === "Enter" && answers[currentQ.id]) { if (qStep < QUESTIONS.length - 1) { transition(() => setQStep(qStep + 1)); } else { transition("builder"); } } }}
            autoFocus
            className="visualize-text-input"
          />
        )}
        {currentQ.type === "pills" && (
          <div className="visualize-pills-wrap">
            {currentQ.options?.map(opt => (
              <button key={opt} onClick={() => setAnswers({ ...answers, [currentQ.id]: opt })} className={`visualize-pill ${answers[currentQ.id] === opt ? "active" : ""}`}>{opt}</button>
            ))}
          </div>
        )}
        <div className="visualize-q-actions">
          {qStep > 0 && (
            <button onClick={() => transition(() => setQStep(qStep - 1))} className="visualize-btn-back">Back</button>
          )}
          <button
            disabled={!answers[currentQ.id]}
            onClick={() => { if (qStep < QUESTIONS.length - 1) { transition(() => setQStep(qStep + 1)); } else { transition("builder"); } }}
            className={`visualize-btn-next ${answers[currentQ.id] ? "enabled" : ""}`}>
            {qStep < QUESTIONS.length - 1 ? "Next" : "Build My Piece"}
          </button>
        </div>
      </div>
    </div>
  );

  // ============ BUILDER ============
  if (phase === "builder") return (
    <div className="visualize-page">
      <style>{visualizeStyles}</style>
      {/* Header */}
      <div className="visualize-builder-header">
        <div>
          <span className="visualize-builder-label">Building for </span>
          <span className="visualize-builder-name">{answers.name || "you"}</span>
        </div>
        <div className="visualize-builder-total-wrap">
          <span className="visualize-builder-total-label">TOTAL</span>
          <span className="visualize-builder-total-value">${total > 0 ? total : "—"}</span>
        </div>
      </div>
      <div className={`visualize-fade ${fadeIn ? "in" : ""}`} style={{ display: "flex", flexDirection: "column" }}>
        {/* Tabs */}
        <div className="visualize-tabs">
          {[
            { id: "size", label: "Size" },
            { id: "mood", label: "Mood" },
            { id: "idea", label: isMobile ? "Idea" : "Your Idea" },
            { id: "addons", label: "Extras" },
            { id: "preview", label: "Preview" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setBuilderTab(tab.id)} className={`visualize-tab ${builderTab === tab.id ? "active" : ""}`}>{tab.label}</button>
          ))}
        </div>
        <div className="visualize-tab-content">
          {/* SIZE TAB */}
          {builderTab === "size" && (
            <div>
              <h3 className="visualize-section-title">Choose Your Canvas</h3>
              <p className="visualize-section-desc">Bigger canvas = more room for Stevie to go wild</p>
              <div className="visualize-size-grid">
                {SIZES.map(s => (
                  <button key={s.id} onClick={() => setSize(s.id)} className={`visualize-size-card ${size === s.id ? "active" : ""}`}>
                    {s.tag && <span className={`visualize-size-tag ${size === s.id ? "active" : ""}`}>{s.tag}</span>}
                    <div className={`visualize-size-label ${size === s.id ? "active" : ""}`}>{s.label}{s.id !== "custom" && "&quot;"}</div>
                    {s.base > 0 && <div className={`visualize-size-price ${size === s.id ? "active" : ""}`}>from ${s.base}</div>}
                    {s.id === "custom" && <div style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>DM for pricing</div>}
                    {s.w > 0 && <div className={`visualize-size-shape ${size === s.id ? "active" : ""}`} style={{ width: Math.min(s.w * 4, 60), height: Math.min(s.h * 4, 80) }} />}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* MOOD TAB */}
          {builderTab === "mood" && (
            <div>
              <h3 className="visualize-section-title">Set the Mood</h3>
              <p className="visualize-section-desc">Pick the energy — Stevie will bring it to life</p>
              <div className="visualize-mood-grid">
                {MOODS.map(m => (
                  <button key={m.id} onClick={() => setMood(m.id)} className={`visualize-mood-card ${mood === m.id ? "active" : ""}`}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{m.emoji}</div>
                    <div className={`visualize-mood-label ${mood === m.id ? "active" : ""}`}>{m.label}</div>
                    <div style={{ fontSize: 11, color: MUTED, marginBottom: 10 }}>{m.desc}</div>
                    <div style={{ display: "flex", gap: 4 }}>
                      {m.colors.map((c, i) => <div key={i} style={{ width: 18, height: 18, borderRadius: "50%", background: c, border: `1px solid ${GRAY2}` }} />)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* IDEA TAB */}
          {builderTab === "idea" && (
            <div>
              <h3 className="visualize-section-title">Describe Your Vision</h3>
              <p className="visualize-section-desc">Go crazy — a bull eating Adderall, SpongeBob doing yoga, your cat as a renaissance painting</p>
              <textarea
                placeholder="Tell Stevie what you want..."
                value={idea}
                onChange={e => setIdea(e.target.value)}
                className="visualize-textarea"
              />
              <div className="visualize-upload-zone">
                <input type="file" accept="image/*" onChange={handleFileUpload} className="visualize-upload-input" />
                {uploaded ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
                    <img src={uploaded.url} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }} />
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontSize: 13, color: GREEN, fontWeight: 600 }}>Uploaded!</div>
                      <div style={{ fontSize: 11, color: MUTED }}>{uploaded.name}</div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>📎</div>
                    <div style={{ fontSize: 14, color: MUTED, fontWeight: 500 }}>Upload inspo or reference photo</div>
                    <div style={{ fontSize: 11, color: GRAY2, marginTop: 4 }}>JPG, PNG, or anything visual</div>
                  </>
                )}
              </div>
            </div>
          )}
          {/* ADDONS TAB */}
          {builderTab === "addons" && (
            <div>
              <h3 className="visualize-section-title">Make It Extra</h3>
              <p className="visualize-section-desc">Premium upgrades to take your piece to the next level</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {ADDONS.map(a => {
                  const active = addons.includes(a.id);
                  return (
                    <button key={a.id} onClick={() => toggleAddon(a.id)} className={`visualize-addon-card ${active ? "active" : ""}`}>
                      <div className="visualize-addon-icon">{a.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className={`visualize-addon-label ${active ? "active" : ""}`}>{a.label}</div>
                        <div className="visualize-addon-desc">{a.desc}</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div className={`visualize-addon-price ${active ? "active" : ""}`} style={{ color: a.price > 0 ? (active ? GREEN : MUTED) : GREEN }}>{a.price > 0 ? `+$${a.price}` : "FREE"}</div>
                        <div className={`visualize-checkbox ${active ? "active" : ""}`}>
                          {active && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M5 12l5 5L20 7" /></svg>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {/* PREVIEW TAB */}
          {builderTab === "preview" && (
            <div>
              <h3 className="visualize-section-title">Your Piece, Visualized</h3>
              <p className="visualize-section-desc">A living preview of the energy — {answers.name ? `made for ${answers.name}` : "made for you"}</p>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
                <PaintCanvas mood={mood} size={size} addons={addons} />
                {/* Summary card */}
                <div className="visualize-summary-card">
                  <div className="visualize-summary-row">
                    <span style={{ color: MUTED, fontSize: 13 }}>Canvas</span>
                    <span style={{ color: WHITE, fontWeight: 600, fontFamily: "monospace" }}>{sizeObj.label}&quot;</span>
                  </div>
                  <div className="visualize-summary-row">
                    <span style={{ color: MUTED, fontSize: 13 }}>Mood</span>
                    <span style={{ color: WHITE, fontWeight: 600 }}>{MOODS.find(m => m.id === mood)?.label}</span>
                  </div>
                  {idea && (
                    <div className="visualize-summary-row" style={{ flexDirection: "column", alignItems: "flex-start" }}>
                      <span style={{ color: MUTED, fontSize: 13 }}>Your idea</span>
                      <p style={{ color: WHITE, fontSize: 14, marginTop: 6, lineHeight: 1.5, fontStyle: "italic", wordBreak: "break-word" }}>&ldquo;{idea}&rdquo;</p>
                    </div>
                  )}
                  {uploaded && (
                    <div className="visualize-summary-row">
                      <span style={{ color: MUTED, fontSize: 13 }}>Reference</span>
                      <img src={uploaded.url} alt="" style={{ width: 36, height: 36, borderRadius: 6, objectFit: "cover" }} />
                    </div>
                  )}
                  {addons.filter(a => a !== "signed").length > 0 && (
                    <div className="visualize-summary-row" style={{ flexDirection: "column", alignItems: "flex-start" }}>
                      <span style={{ color: MUTED, fontSize: 13 }}>Extras</span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                        {addons.filter(a => a !== "signed").map(id => {
                          const a = ADDONS.find(x => x.id === id);
                          return a && <span key={id} className="visualize-extra-badge">{a.icon} {a.label}</span>;
                        })}
                      </div>
                    </div>
                  )}
                  <div className="visualize-summary-total">
                    <div>
                      <div style={{ color: MUTED, fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>Starting at</div>
                      <div className="visualize-total-big">${total}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 10, color: MUTED }}>Signed + numbered</div>
                      <div style={{ fontSize: 10, color: MUTED }}>Certificate of authenticity</div>
                    </div>
                  </div>
                </div>
                {/* CTA */}
                <div className="visualize-cta-wrap">
                  <a href="https://www.instagram.com/artattheafters/" target="_blank" rel="noopener noreferrer" className="visualize-cta-primary">DM Stevie on Instagram</a>
                  <a href="https://venmo.com/u/Steviealger" target="_blank" rel="noopener noreferrer" className="visualize-cta-secondary">Pay via Venmo @steviealger</a>
                  <p className="visualize-cta-note">
                    Final price confirmed after chatting with Stevie.<br />Every piece is custom — no two are ever the same.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Bottom nav for builder */}
        {builderTab !== "preview" && (
          <div className="visualize-builder-footer">
            <div className="visualize-builder-footer-info">
              {size !== "custom" && <span>Canvas <strong style={{ color: WHITE }}>${sizeObj.base}</strong></span>}
              {addonTotal > 0 && <span> + extras <strong style={{ color: GREEN }}>${addonTotal}</strong></span>}
            </div>
            <button onClick={() => {
              const tabs = ["size", "mood", "idea", "addons", "preview"];
              const next = tabs[tabs.indexOf(builderTab) + 1];
              if (next) setBuilderTab(next);
            }} className="visualize-btn-step">
              {builderTab === "addons" ? "See Preview" : "Next Step"}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return null;
}

const visualizeStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');

  .visualize-page {
    min-height: 100vh;
    background: ${DARK};
    color: ${WHITE};
    font-family: 'Outfit', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .visualize-fade {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.35s ease, transform 0.35s ease;
  }
  .visualize-fade.in {
    opacity: 1;
    transform: translateY(0);
  }

  .visualize-center-full {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 80px 20px 40px;
    text-align: center;
  }

  /* INTRO */
  .visualize-icon-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${PINK}33, ${GREEN}22);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32px;
    border: 1px solid ${GRAY2};
  }

  .visualize-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 8vw, 42px);
    font-weight: 700;
    margin: 0;
    line-height: 1.1;
    letter-spacing: -1px;
  }

  .visualize-hero-desc {
    color: ${MUTED};
    font-size: clamp(14px, 3.5vw, 16px);
    max-width: 360px;
    margin: 20px 0 40px;
    line-height: 1.7;
    font-weight: 300;
    padding: 0 8px;
  }

  .visualize-btn-go {
    padding: 16px 48px;
    min-height: 52px;
    background: transparent;
    border: 1.5px solid ${GREEN};
    color: ${GREEN};
    border-radius: 100px;
    font-size: 15px;
    cursor: pointer;
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    transition: all 0.3s ease;
    -webkit-tap-highlight-color: transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .visualize-btn-go:active {
    background: ${GREEN}15;
    box-shadow: 0 0 30px ${GREEN}20;
  }
  @media (hover: hover) {
    .visualize-btn-go:hover {
      background: ${GREEN}15;
      box-shadow: 0 0 30px ${GREEN}20;
    }
  }

  .visualize-credit {
    color: ${GRAY2};
    font-size: 11px;
    margin-top: 32px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  /* QUESTIONS */
  .visualize-progress-dots {
    display: flex;
    gap: 6px;
    margin-bottom: 48px;
  }
  .visualize-dot {
    width: 8px;
    height: 4px;
    border-radius: 2px;
    background: ${GRAY2};
    transition: all 0.4s ease;
  }
  .visualize-dot.active { width: 32px; }
  .visualize-dot.filled { background: ${PINK}; }

  .visualize-q-counter {
    color: ${MUTED};
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .visualize-q-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px, 6vw, 30px);
    font-weight: 700;
    margin: 0 0 32px;
    text-align: center;
    max-width: 400px;
    line-height: 1.3;
    padding: 0 8px;
  }

  .visualize-text-input {
    background: transparent;
    border: none;
    border-bottom: 2px solid ${GRAY2};
    color: ${WHITE};
    font-size: clamp(18px, 5vw, 24px);
    font-family: 'Outfit', sans-serif;
    font-weight: 300;
    padding: 12px 4px;
    width: 100%;
    max-width: 360px;
    text-align: center;
    outline: none;
    caret-color: ${PINK};
    transition: border-color 0.3s;
  }
  .visualize-text-input:focus {
    border-bottom-color: ${PINK};
  }

  .visualize-pills-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    max-width: 400px;
    padding: 0 8px;
  }

  .visualize-pill {
    padding: 12px 20px;
    min-height: 48px;
    border-radius: 100px;
    border: 1.5px solid ${GRAY2};
    background: transparent;
    color: ${MUTED};
    cursor: pointer;
    font-size: 14px;
    font-family: 'Outfit', sans-serif;
    transition: all 0.25s ease;
    font-weight: 400;
    -webkit-tap-highlight-color: transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .visualize-pill.active {
    border-color: ${PINK};
    background: ${PINK}18;
    color: ${PINK};
    font-weight: 600;
  }

  .visualize-q-actions {
    display: flex;
    gap: 16px;
    margin-top: 48px;
  }

  .visualize-btn-back {
    padding: 12px 28px;
    min-height: 48px;
    background: transparent;
    border: 1px solid ${GRAY2};
    color: ${MUTED};
    border-radius: 100px;
    font-size: 13px;
    cursor: pointer;
    font-family: 'Outfit', sans-serif;
    -webkit-tap-highlight-color: transparent;
    display: inline-flex;
    align-items: center;
  }

  .visualize-btn-next {
    padding: 12px 36px;
    min-height: 48px;
    background: ${GRAY};
    border: none;
    color: ${MUTED};
    border-radius: 100px;
    font-size: 13px;
    cursor: default;
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    letter-spacing: 1px;
    transition: all 0.3s;
    -webkit-tap-highlight-color: transparent;
    display: inline-flex;
    align-items: center;
  }
  .visualize-btn-next.enabled {
    background: ${PINK};
    color: ${WHITE};
    cursor: pointer;
  }

  /* BUILDER */
  .visualize-builder-header {
    padding: 80px 16px 16px;
    border-bottom: 1px solid ${GRAY}22;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media (min-width: 640px) {
    .visualize-builder-header { padding: 84px 24px 20px; }
  }

  .visualize-builder-label {
    font-size: 11px;
    color: ${MUTED};
    letter-spacing: 3px;
    text-transform: uppercase;
  }
  .visualize-builder-name {
    font-size: 13px;
    color: ${PINK};
    font-weight: 600;
  }
  .visualize-builder-total-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .visualize-builder-total-label {
    font-size: 11px;
    color: ${MUTED};
  }
  .visualize-builder-total-value {
    font-size: 20px;
    font-weight: 700;
    color: ${GREEN};
    font-family: monospace;
  }
  @media (min-width: 640px) {
    .visualize-builder-total-value { font-size: 22px; }
  }

  .visualize-tabs {
    display: flex;
    gap: 2px;
    padding: 12px 12px;
    overflow-x: auto;
    border-bottom: 1px solid ${GRAY}22;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .visualize-tabs::-webkit-scrollbar { display: none; }
  @media (min-width: 640px) {
    .visualize-tabs { gap: 4px; padding: 16px 24px; }
  }

  .visualize-tab {
    padding: 10px 14px;
    min-height: 44px;
    background: transparent;
    color: ${MUTED};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
    font-family: 'Outfit', sans-serif;
    font-weight: 400;
    transition: all 0.2s ease;
    letter-spacing: 0.5px;
    white-space: nowrap;
    flex-shrink: 0;
    -webkit-tap-highlight-color: transparent;
    display: inline-flex;
    align-items: center;
  }
  .visualize-tab.active {
    background: ${GRAY};
    color: ${WHITE};
    font-weight: 600;
  }
  @media (min-width: 640px) {
    .visualize-tab { padding: 10px 18px; font-size: 13px; }
  }

  .visualize-tab-content {
    padding: 20px 16px;
    min-height: 420px;
  }
  @media (min-width: 640px) {
    .visualize-tab-content { padding: 28px 24px; }
  }

  .visualize-section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(20px, 5vw, 24px);
    font-weight: 700;
    margin: 0 0 6px;
  }
  .visualize-section-desc {
    color: ${MUTED};
    font-size: 13px;
    margin: 0 0 24px;
    font-weight: 300;
  }

  /* SIZE GRID */
  .visualize-size-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  @media (min-width: 480px) {
    .visualize-size-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; }
  }
  @media (min-width: 768px) {
    .visualize-size-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
  }

  .visualize-size-card {
    background: ${DARK2};
    border: 1.5px solid ${GRAY2};
    border-radius: 12px;
    padding: 16px 12px;
    cursor: pointer;
    text-align: left;
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
  }
  .visualize-size-card.active {
    background: ${PINK}12;
    border-color: ${PINK};
  }
  @media (min-width: 640px) {
    .visualize-size-card { padding: 20px 16px; }
  }

  .visualize-size-tag {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 8px;
    color: ${MUTED};
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-weight: 600;
  }
  .visualize-size-tag.active { color: ${PINK}; }
  @media (min-width: 640px) {
    .visualize-size-tag { font-size: 9px; }
  }

  .visualize-size-label {
    font-size: 18px;
    font-weight: 700;
    color: ${MUTED};
    font-family: monospace;
  }
  .visualize-size-label.active { color: ${WHITE}; }
  @media (min-width: 640px) {
    .visualize-size-label { font-size: 22px; }
  }

  .visualize-size-price {
    font-size: 12px;
    color: ${MUTED};
    margin-top: 4px;
    font-family: monospace;
  }
  .visualize-size-price.active { color: ${PINK}; }
  @media (min-width: 640px) {
    .visualize-size-price { font-size: 13px; }
  }

  .visualize-size-shape {
    margin-top: 10px;
    border: 1px solid ${GRAY2};
    border-radius: 2px;
    transition: all 0.3s;
  }
  .visualize-size-shape.active {
    border-color: ${PINK}55;
  }

  /* MOOD GRID */
  .visualize-mood-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  @media (min-width: 640px) {
    .visualize-mood-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; }
  }

  .visualize-mood-card {
    background: ${DARK2};
    border: 1.5px solid ${GRAY2};
    border-radius: 12px;
    padding: 16px 12px;
    cursor: pointer;
    text-align: left;
    transition: all 0.25s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .visualize-mood-card.active {
    background: ${DARK3};
    border-color: ${PINK};
  }
  @media (min-width: 640px) {
    .visualize-mood-card { padding: 20px 16px; }
  }

  .visualize-mood-label {
    font-size: 14px;
    font-weight: 600;
    color: ${MUTED};
    margin-bottom: 4px;
  }
  .visualize-mood-label.active { color: ${WHITE}; }
  @media (min-width: 640px) {
    .visualize-mood-label { font-size: 15px; }
  }

  /* IDEA TAB */
  .visualize-textarea {
    width: 100%;
    min-height: 120px;
    background: ${DARK2};
    border: 1.5px solid ${GRAY2};
    border-radius: 12px;
    color: ${WHITE};
    font-size: 15px;
    font-family: 'Outfit', sans-serif;
    padding: 16px;
    resize: vertical;
    outline: none;
    caret-color: ${PINK};
    line-height: 1.6;
    box-sizing: border-box;
    transition: border-color 0.3s;
  }
  .visualize-textarea:focus {
    border-color: ${PINK};
  }
  @media (min-width: 640px) {
    .visualize-textarea { min-height: 140px; font-size: 16px; }
  }

  .visualize-upload-zone {
    margin-top: 20px;
    padding: 20px;
    background: ${DARK2};
    border-radius: 12px;
    border: 1px dashed ${GRAY2};
    text-align: center;
    cursor: pointer;
    position: relative;
    transition: border-color 0.3s;
  }
  .visualize-upload-input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }

  /* ADDONS */
  .visualize-addon-card {
    background: ${DARK2};
    border: 1.5px solid ${GRAY2};
    border-radius: 12px;
    padding: 14px 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.25s ease;
    text-align: left;
    -webkit-tap-highlight-color: transparent;
  }
  .visualize-addon-card.active {
    background: ${PINK}0C;
    border-color: ${PINK};
  }
  @media (min-width: 640px) {
    .visualize-addon-card { padding: 16px 20px; gap: 16px; }
  }

  .visualize-addon-icon {
    font-size: 22px;
    width: 32px;
    text-align: center;
    flex-shrink: 0;
  }
  @media (min-width: 640px) {
    .visualize-addon-icon { font-size: 24px; width: 36px; }
  }

  .visualize-addon-label {
    font-size: 14px;
    font-weight: 600;
    color: ${MUTED};
  }
  .visualize-addon-label.active { color: ${WHITE}; }
  @media (min-width: 640px) {
    .visualize-addon-label { font-size: 15px; }
  }

  .visualize-addon-desc {
    font-size: 11px;
    color: ${MUTED};
    margin-top: 2px;
  }

  .visualize-addon-price {
    font-size: 14px;
    font-weight: 700;
    font-family: monospace;
  }
  @media (min-width: 640px) {
    .visualize-addon-price { font-size: 15px; }
  }

  .visualize-checkbox {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 1.5px solid ${GRAY2};
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 4px;
    margin-left: auto;
    transition: all 0.2s;
  }
  .visualize-checkbox.active {
    border-color: ${PINK};
    background: ${PINK};
  }

  /* CANVAS */
  .visualize-canvas-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 320px;
  }

  .visualize-canvas-frame {
    position: relative;
    width: 100%;
    max-width: 320px;
    max-height: 400px;
    border: 2px solid ${GRAY2};
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 0 40px ${PINK}15, 0 20px 60px rgba(0,0,0,0.5);
  }

  .visualize-canvas-label {
    position: absolute;
    bottom: 12px;
    right: 12px;
    background: rgba(0,0,0,0.7);
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 11px;
    color: ${MUTED};
    font-family: monospace;
  }

  .visualize-canvas-note {
    margin-top: 12px;
    font-size: 11px;
    color: ${MUTED};
    text-align: center;
    font-style: italic;
    max-width: 280px;
    padding: 0 8px;
  }

  /* PREVIEW SUMMARY */
  .visualize-summary-card {
    width: 100%;
    max-width: 400px;
    background: ${DARK2};
    border-radius: 16px;
    padding: 20px;
    border: 1px solid ${GRAY2};
  }
  @media (min-width: 640px) {
    .visualize-summary-card { padding: 24px; }
  }

  .visualize-summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${GRAY}22;
  }

  .visualize-summary-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .visualize-total-big {
    font-size: clamp(26px, 7vw, 32px);
    font-weight: 800;
    color: ${GREEN};
    font-family: monospace;
  }

  .visualize-extra-badge {
    padding: 4px 12px;
    background: ${PINK}15;
    border: 1px solid ${PINK}33;
    border-radius: 100px;
    font-size: 11px;
    color: ${PINK};
  }

  /* CTA */
  .visualize-cta-wrap {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    width: 100%;
    max-width: 400px;
    padding: 0 4px;
  }

  .visualize-cta-primary {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 16px;
    min-height: 52px;
    background: ${PINK};
    color: ${WHITE};
    border-radius: 100px;
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
    font-family: 'Outfit', sans-serif;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s;
    -webkit-tap-highlight-color: transparent;
  }

  .visualize-cta-secondary {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 16px;
    min-height: 52px;
    background: transparent;
    border: 1.5px solid ${GREEN};
    color: ${GREEN};
    border-radius: 100px;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    font-family: 'Outfit', sans-serif;
    letter-spacing: 1px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .visualize-cta-note {
    font-size: 11px;
    color: ${MUTED};
    text-align: center;
    margin-top: 4px;
  }

  /* BUILDER FOOTER */
  .visualize-builder-footer {
    padding: 16px;
    border-top: 1px solid ${GRAY}22;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    bottom: 0;
    background: ${DARK};
    z-index: 10;
  }
  @media (min-width: 640px) {
    .visualize-builder-footer { padding: 16px 24px; position: static; }
  }

  .visualize-builder-footer-info {
    font-size: 11px;
    color: ${MUTED};
  }

  .visualize-btn-step {
    padding: 12px 28px;
    min-height: 48px;
    background: ${PINK};
    border: none;
    color: ${WHITE};
    border-radius: 100px;
    font-size: 13px;
    cursor: pointer;
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    letter-spacing: 1px;
    -webkit-tap-highlight-color: transparent;
    display: inline-flex;
    align-items: center;
  }
  @media (min-width: 640px) {
    .visualize-btn-step { padding: 12px 32px; }
  }

  /* Safe area padding for bottom of page on notched phones */
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    .visualize-builder-footer {
      padding-bottom: calc(16px + env(safe-area-inset-bottom));
    }
    .visualize-cta-wrap {
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
`;
