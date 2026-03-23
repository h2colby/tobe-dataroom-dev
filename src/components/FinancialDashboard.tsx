// @ts-nocheck
import { useState, useEffect } from "react";
import {
  PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar, ComposedChart, Line,
  LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { colors } from "@/lib/design-tokens";

// ═══════════════════════════════════════════════════════════
// DATA — All values sourced from v8.5.3 model (84-month engine)
// ═══════════════════════════════════════════════════════════

const FY = ["FY1","FY2","FY3","FY4","FY5","FY6","FY7"];

const pnl = {
  h2Rev:     [0, 11812500, 77812500, 141562500, 210937500, 264375000, 270000000],
  eqRev:     [875000, 4295000, 10260000, 33770000, 73950000, 129130000, 186060000],
  svcRev:    [0, 24609, 247313, 853560, 2430737, 5872518, 10855011],
  ptc:       [0, 1417500, 8887500, 10800000, 10800000, 10800000, 10800000],
  opRev:     [875000, 16132109, 88319813, 176186060, 287318237, 399377518, 466915011],
  totalCogs: [525000, 3785776, 15571600, 37501935, 67681516, 102656632, 129450960],
  gp:        [350000, 12346333, 72748212, 138684126, 219636721, 296720886, 337464052],
  gpMargin:  [40.0, 76.5, 82.4, 78.7, 76.4, 74.3, 72.3],
  salaries:  [1263500, 3509147, 7590438, 12907725, 18517065, 22488232, 24383658],
  benefits:  [472044, 1311017, 2835788, 4822326, 6917975, 8401604, 9109735],
  leases:    [262500, 580663, 848642, 1027354, 1450410, 1758208, 1802164],
  profFees:  [26250, 483963, 2649594, 5285582, 8619547, 11981326, 14007450],
  rdOther:   [980250, 2709642, 3916396, 4123721, 6496365, 8987550, 10588300],
  totalOpex: [3004544, 8594433, 17840859, 28166707, 42001362, 53616920, 59891307],
  headcount: [15, 50, 89, 144, 202, 240, 269],
  ebitda:    [-2654544, 3751901, 54907353, 110517419, 177635358, 243103966, 277572744],
  ebitdaM:   [-303.4, 23.3, 62.2, 62.7, 61.8, 60.9, 59.4],
  depr:      [0, -706250, -1581944, -2598611, -4640278, -5986111, -6236111],
  interest:  [-129909, -855453, -906767, -1515309, -2062446, -3737518, -5124500],
  taxes:     [0, -245261, -16529673, -31644945, -49067811, -65928691, -74793276],
  ni:        [-2784452, 3362436, 44776468, 85558554, 132664824, 178251646, 202218858],
  niMargin:  [-318.2, 20.8, 50.7, 48.6, 46.2, 44.6, 43.3],
  cash:      [1313701, 49630987, 139503282, 227794103, 494444130, 728148220, 921022629],
};

const fundraising = [
  { round:"Pre-Seed", timing:"Oct 2025", preMoney:8e6, equity:2.05e6, debt:0, postMoney:10.05e6, stepUp:"—", desc:"SAFEs — technology validation, patent filings, initial team." },
  { round:"Seed ★", timing:"May 2026", preMoney:40e6, equity:7.5e6, debt:2.5e6, postMoney:47.5e6, stepUp:"4.0x", desc:"Facility 1 (Tulsa) buildout · Mfg pilot · First T-125 units · Team → 20" },
  { round:"Series A", timing:"Jun 2027", preMoney:210e6, equity:40e6, debt:17e6, postMoney:250e6, stepUp:"4.4x", desc:"Facilities 2–3 · T-125 scale-up · T-2500 R&D kickoff · Team → 66" },
  { round:"Series B", timing:"Q1 2029", preMoney:500e6, equity:60e6, debt:30e6, postMoney:560e6, stepUp:"2.0x", desc:"Facilities 4–7 · T-125 commercial · T-2500 pilot · Team → 109" },
  { round:"Series C", timing:"Q1 2031", preMoney:1.5e9, equity:150e6, debt:75e6, postMoney:1.65e9, stepUp:"2.7x", desc:"Facilities 8–12 · T-2500 commercial · National footprint · Team → 223" },
  { round:"Series D", timing:"Q1 2033", preMoney:3.5e9, equity:250e6, debt:100e6, postMoney:3.75e9, stepUp:"2.1x", desc:"Pre-IPO acceleration · International expansion · Team → 326" },
];

const useOfFunds = [
  { cat:"R&D: T-125 + T-2500", amt:1100000, pct:14.7 },
  { cat:"Manufacturing Equipment", amt:1120000, pct:14.9 },
  { cat:"Personnel (15-mo)", amt:2211496, pct:29.5 },
  { cat:"Certifications", amt:475000, pct:6.3 },
  { cat:"Working Capital & G&A", amt:1831250, pct:24.4 },
  { cat:"Debt Service Reserve", amt:762254, pct:10.2 },
];

const unitEcon = {
  costStack: [
    { name:"Electricity (Production)", tobe:1.55, grey:1.25 },
    { name:"Compression & Purification", tobe:0.12, grey:0.75 },
    { name:"Transportation (50 mi)", tobe:0.90, grey:3.25 },
    { name:"RO Water", tobe:0.05, grey:0.05 },
  ],
  priceSens: [15,20,25,30,35].map(p => ({ price:p, cost:4.84, margin:+((p-4.84)/p*100).toFixed(1) })),
  products: [
    { name:"T-25", cap:"25 kg/day", power:"50 kW", price:35000, cogs:21000 },
    { name:"T-125", cap:"125 kg/day", power:"250 kW", price:167000, cogs:100000 },
    { name:"T-2500", cap:"2,500 kg/day", power:"5 MW", price:3000000, cogs:1650000 },
  ],
};

const bom = {
  t25:   [21.0, 20.16, 19.43, 18.38, 17.33, 16.80],
  t125:  [100.0, 96.0, 92.5, 87.5, 82.5, 77.5],
  t2500: [1650, 1650, 1650, 1584, 1526, 1444],
  years: ["Y2","Y3","Y4","Y5","Y6","Y7"],
};

// ═══════════════════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════════════════

const C = {
  bg: colors.bg.primary, surface: colors.bg.surface1, card: colors.bg.surface2, cardAlt: colors.bg.surface3,
  border:"#1C2736", borderLight:"#243244",
  accent: colors.accent.orange, accentDim: colors.accent.orangeDim, accentGlow: colors.accent.orangeGlow,
  gold: colors.chart.muted, goldDim:"rgba(255,179,128,0.08)",
  blue: colors.chart.tertiary, blueDim:"rgba(59,130,246,0.04)",
  purple:"#a855f7", purpleDim:"rgba(168,85,247,0.04)",
  red: colors.semantic.danger,
  white:"#E8ECF1", text:"#C9D1DB", muted:"#7B8A9E", dim:"#4A5568", faint:"#2A3444",
};

const UOF_COLORS = [C.accent, C.white, colors.text.secondary, colors.accent.orangeStrong, C.muted, "rgba(255,255,255,0.3)"];

const fmt = (v) => {
  if (v == null) return "—";
  const a = Math.abs(v), s = v < 0 ? "-" : "";
  if (a >= 1e9) return `${s}$${(a/1e9).toFixed(2)}B`;
  if (a >= 1e6) return `${s}$${(a/1e6).toFixed(1)}M`;
  if (a >= 1e3) return `${s}$${(a/1e3).toFixed(0)}K`;
  return `${s}$${a.toFixed(0)}`;
};
const fmtFull = (v) => v == null ? "—" : (v<0?"-":"") + "$" + Math.abs(v).toLocaleString("en-US",{maximumFractionDigits:0});
const pct = (v) => v == null ? "—" : `${v.toFixed(1)}%`;

// ═══════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════

const Tip = ({ active, payload, label, valFmt }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:"10px 16px", fontSize:12, lineHeight:1.8, boxShadow:"0 12px 40px rgba(0,0,0,0.6)" }}>
      <div style={{ color:C.white, fontWeight:700, marginBottom:2, fontSize:11, letterSpacing:"0.03em" }}>{label}</div>
      {payload.map((p,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:6, height:6, borderRadius:2, background:p.color }} />
          <span style={{ color:C.muted }}>{p.name}:</span>
          <span style={{ color:C.white, fontWeight:600, fontFamily:"'JetBrains Mono',monospace" }}>
            {valFmt ? valFmt(p.value, p.name) : (typeof p.value==="number" ? fmt(p.value*1e6) : p.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

const tipStyle = { background:C.card, border:`1px solid ${C.border}`, borderRadius:10, fontSize:12 };

const Nav = ({ active, setActive, sections }) => (
  <nav style={{
    position:"sticky", top:0, zIndex:100, background:"rgba(8,11,16,0.88)",
    backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
    borderBottom:`1px solid ${C.border}`, padding:"0 40px", display:"flex", alignItems:"center", height:52,
  }}>
    <div style={{ display:"flex", alignItems:"center", gap:10, marginRight:40 }}>
      <div style={{ width:8, height:8, borderRadius:2, background:C.accent, boxShadow:`0 0 12px ${C.accentGlow}` }} />
      <span style={{ fontSize:13, fontWeight:700, color:C.white, letterSpacing:"0.01em", fontFamily:"'Space Grotesk','Inter',sans-serif" }}>TOBE ENERGY</span>
    </div>
    <div style={{ display:"flex", gap:0 }}>
      {sections.map(s => (
        <button key={s.id} onClick={() => {
          document.getElementById(s.id)?.scrollIntoView({ behavior:"smooth" });
        }} style={{
          background:"none", border:"none", cursor:"pointer",
          padding:"16px 14px", fontSize:10.5, fontWeight:600, letterSpacing:"0.06em",
          color: active===s.id ? C.accent : C.muted,
          borderBottom: active===s.id ? `2px solid ${C.accent}` : "2px solid transparent",
          transition:"all 0.25s ease",
        }}>{s.label}</button>
      ))}
    </div>
  </nav>
);

const KPI = ({ label, value, sub, color=C.accent, delay=0 }) => {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), delay); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"22px 24px",
      position:"relative", overflow:"hidden",
      opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(20px)",
      transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${color}, transparent)` }} />
      <div style={{ fontSize:10, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:10 }}>{label}</div>
      <div style={{ fontSize:32, fontWeight:700, color:C.white, fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-0.03em", lineHeight:1 }}>{value}</div>
      {sub && <div style={{ fontSize:11, color:C.dim, marginTop:10, lineHeight:1.4 }}>{sub}</div>}
    </div>
  );
};

const Sec = ({ id, num, title, children }) => (
  <section id={id} style={{ marginTop:56, scrollMarginTop:68 }}>
    <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28 }}>
      <span style={{
        width:32, height:32, borderRadius:9, background:C.accentDim, border:`1px solid rgba(0,212,170,0.15)`,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:14, fontWeight:700, color:C.accent, fontFamily:"'JetBrains Mono',monospace",
      }}>{num}</span>
      <span style={{ fontSize:14, fontWeight:700, color:C.white, textTransform:"uppercase", letterSpacing:"0.08em" }}>{title}</span>
      <div style={{ flex:1, height:1, background:`linear-gradient(90deg, ${C.border}, transparent)` }} />
    </div>
    {children}
  </section>
);

const ChartCard = ({ title, height=300, children }) => (
  <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"22px 18px 14px 6px", marginTop:16 }}>
    {title && <div style={{ fontSize:11, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:14, paddingLeft:14 }}>{title}</div>}
    <ResponsiveContainer width="100%" height={height}>{children}</ResponsiveContainer>
  </div>
);

const Table = ({ headers, rows, highlight, compact }) => (
  <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, overflow:"hidden" }}>
    <table style={{ width:"100%", borderCollapse:"collapse", fontSize:compact?11:12 }}>
      <thead>
        <tr>{headers.map((h,i) => (
          <th key={i} style={{ padding:compact?"8px 10px":"12px 14px", textAlign:i===0?"left":"right", color:C.muted, fontWeight:700, fontSize:10, textTransform:"uppercase", letterSpacing:"0.06em", borderBottom:`1px solid ${C.border}`, background:C.surface }}>{h}</th>
        ))}</tr>
      </thead>
      <tbody>
        {rows.map((row,ri) => (
          <tr key={ri} style={{ background:highlight===ri ? C.accentDim : "transparent", borderBottom:`1px solid ${C.border}` }}>
            {row.map((cell,ci) => {
              const obj = typeof cell === "object" && cell !== null && !Array.isArray(cell);
              return (
                <td key={ci} style={{
                  padding:compact?"7px 10px":"10px 14px",
                  textAlign:ci===0?"left":"right",
                  fontFamily:ci>0?"'JetBrains Mono',monospace":"inherit",
                  fontWeight: (obj && cell.bold) ? 700 : (ci===0?500:400),
                  color: (obj && cell.color) || (highlight===ri && ci===0 ? C.accent : C.text),
                  fontSize:compact?11:12,
                }}>{obj ? cell.v : cell}</td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ═══════════════════════════════════════════════════════════
// SECTIONS LIST
// ═══════════════════════════════════════════════════════════

const sections = [
  { id:"overview", label:"OVERVIEW" },
  { id:"pnl", label:"P&L" },
  { id:"unit", label:"UNIT ECONOMICS" },
  { id:"fundraising", label:"FUNDRAISING" },
  { id:"funds", label:"USE OF FUNDS" },
  { id:"tax", label:"TAX CREDITS" },
  { id:"learning", label:"AI MANUFACTURING" },
  { id:"assumptions", label:"ASSUMPTIONS" },
];

// ═══════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════

export default function App() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin:"-80px 0px -55% 0px" });
    sections.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // ── Chart data transforms ──
  const revChart = FY.map((fy,i) => ({ fy, h2:pnl.h2Rev[i]/1e6, equip:pnl.eqRev[i]/1e6, svc:pnl.svcRev[i]/1e6 }));
  const profChart = FY.map((fy,i) => ({ fy, ebitda:pnl.ebitda[i]/1e6, ni:pnl.ni[i]/1e6, margin:pnl.ebitdaM[i] }));
  const cashChart = FY.map((fy,i) => ({ fy, cash:pnl.cash[i]/1e6 }));
  const fy7Pie = [{ name:"H₂ Production", value:270, color:C.accent },{ name:"Equipment", value:186.06, color:colors.chart.quaternary },{ name:"Services", value:10.86, color:C.blue }];
  const opexChart = FY.map((fy,i) => ({ fy, people:(pnl.salaries[i]+pnl.benefits[i])/1e6, leases:pnl.leases[i]/1e6, profFees:pnl.profFees[i]/1e6, rd:pnl.rdOther[i]/1e6 }));
  const costComp = unitEcon.costStack.map(c => ({ name:c.name, "Tobe (On-Site)":c.tobe, "Grey H₂ (Delivered)":c.grey }));
  const valChart = fundraising.map(f => ({ round:f.round.replace(" ★",""), post:f.postMoney/1e6 }));
  const bomChart = bom.years.map((y,i) => ({ year:y, "T-125":bom.t125[i], "T-25":bom.t25[i] }));
  const bomT2500 = bom.years.map((y,i) => ({ year:y, "T-2500":bom.t2500[i] }));

  const gridConf = { strokeDasharray:"3 3", stroke:C.border };
  const axTick = { fill:C.muted, fontSize:11 };
  const axLine = { stroke:C.border };
  const noLine = { stroke:"none" };

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.white, fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />

      <Nav active={active} setActive={setActive} sections={sections} />

      <div style={{ maxWidth:1120, margin:"0 auto", padding:"0 36px 96px" }}>

        {/* ════════════ OVERVIEW ════════════ */}
        <section id="overview" style={{ scrollMarginTop:68, paddingTop:44 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
            <div style={{ width:8, height:8, borderRadius:2, background:C.accent, boxShadow:`0 0 14px ${C.accentGlow}` }} />
            <span style={{ fontSize:10, fontWeight:700, color:C.accent, textTransform:"uppercase", letterSpacing:"0.16em" }}>Confidential · Investor Data Room</span>
          </div>
          <h1 style={{ fontSize:38, fontWeight:800, margin:"0 0 6px", letterSpacing:"-0.03em", fontFamily:"'Space Grotesk','Inter',sans-serif" }}>
            Tobe Energy — Financial Model
          </h1>
          <p style={{ fontSize:14, color:C.muted, margin:0, lineHeight:1.6 }}>
            $10M Seed Round&nbsp;&nbsp;·&nbsp;&nbsp;Green Hydrogen Electrolyzers&nbsp;&nbsp;·&nbsp;&nbsp;92% System Efficiency&nbsp;&nbsp;·&nbsp;&nbsp;v8.5.3 · March 2026
          </p>

          {/* KPI Cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginTop:32 }}>
            <KPI label="FY7 Revenue" value="$467M" sub="12 facilities · H₂ + Equipment + Services" color={C.accent} delay={100} />
            <KPI label="FY7 EBITDA" value="$278M" sub="59.4% margin · EBITDA positive from Year 2" color={C.gold} delay={200} />
            <KPI label="FY7 Net Income" value="$202M" sub="43.3% net margin" color={C.blue} delay={300} />
            <KPI label="45V PTC per Facility" value="$27M" sub="$3/kg × 900K kg/yr × 10 yrs · Construction by Dec 2027" color={C.purple} delay={400} />
          </div>

          {/* Revenue Growth */}
          <ChartCard title="Revenue Growth — Stacked by Stream ($M)" height={300}>
            <AreaChart data={revChart} margin={{ top:10,right:12,left:12,bottom:0 }}>
              <defs>
                {[["H2",C.accent],["Eq",colors.chart.quaternary],["Sv",C.blue]].map(([id,c]) => (
                  <linearGradient key={id} id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={c} stopOpacity={0.35}/>
                    <stop offset="100%" stopColor={c} stopOpacity={0.02}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid {...gridConf} />
              <XAxis dataKey="fy" tick={axTick} axisLine={axLine} tickLine={false} />
              <YAxis tick={axTick} axisLine={noLine} tickLine={false} tickFormatter={v=>`$${v}M`} />
              <Tooltip content={<Tip valFmt={v=>fmt(v*1e6)} />} />
              <Area type="monotone" dataKey="h2" name="H₂ Production" stackId="1" stroke={C.accent} fill="url(#gH2)" strokeWidth={2} />
              <Area type="monotone" dataKey="equip" name="Equipment Sales" stackId="1" stroke={colors.chart.quaternary} fill="url(#gEq)" strokeWidth={2} />
              <Area type="monotone" dataKey="svc" name="Services" stackId="1" stroke={C.blue} fill="url(#gSv)" strokeWidth={2} />
              <Legend wrapperStyle={{ fontSize:11, paddingTop:10 }} />
            </AreaChart>
          </ChartCard>

          {/* Pie + EBITDA row */}
          <div style={{ display:"grid", gridTemplateColumns:"320px 1fr", gap:16, marginTop:16 }}>
            {/* Pie */}
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"22px 20px" }}>
              <div style={{ fontSize:11, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:14 }}>FY7 Revenue Mix</div>
              <ResponsiveContainer width="100%" height={170}>
                <PieChart>
                  <Pie data={fy7Pie} cx="50%" cy="50%" innerRadius={44} outerRadius={70} dataKey="value" paddingAngle={3} strokeWidth={0}>
                    {fy7Pie.map((e,i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={v=>`$${v.toFixed(1)}M`} contentStyle={tipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ marginTop:8 }}>
                {fy7Pie.map((item,i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:11, padding:"4px 0" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:8, height:8, borderRadius:2, background:item.color }} />
                      <span style={{ color:C.muted }}>{item.name}</span>
                    </div>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:600, color:C.text }}>{(item.value/466.92*100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* EBITDA + NI combo */}
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"22px 14px 14px 6px" }}>
              <div style={{ fontSize:11, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:14, paddingLeft:14 }}>EBITDA & Net Income ($M) · EBITDA Margin %</div>
              <ResponsiveContainer width="100%" height={260}>
                <ComposedChart data={profChart} margin={{ top:10,right:8,left:8,bottom:0 }}>
                  <CartesianGrid {...gridConf} />
                  <XAxis dataKey="fy" tick={axTick} axisLine={axLine} tickLine={false} />
                  <YAxis yAxisId="l" tick={axTick} axisLine={noLine} tickLine={false} tickFormatter={v=>`$${v}M`} domain={[-20,300]} ticks={[0,50,100,150,200,250,300]} />
                  <YAxis yAxisId="r" orientation="right" tick={axTick} axisLine={noLine} tickLine={false} tickFormatter={v=>`${v}%`} domain={[-20,80]} ticks={[-20,0,20,40,60,80]} />
                  <Tooltip content={<Tip valFmt={(v,n) => n.includes("Margin") ? `${v.toFixed(1)}%` : fmt(v*1e6)} />} />
                  <Bar yAxisId="l" dataKey="ebitda" name="EBITDA" fill={C.gold} radius={[5,5,0,0]} barSize={28} fillOpacity={0.9} />
                  <Bar yAxisId="l" dataKey="ni" name="Net Income" fill={C.blue} radius={[5,5,0,0]} barSize={28} fillOpacity={0.9} />
                  <Line yAxisId="r" type="monotone" dataKey="margin" name="EBITDA Margin" stroke={C.accent} strokeWidth={2.5} dot={{ r:4, fill:C.accent, strokeWidth:0 }} />
                  <Legend wrapperStyle={{ fontSize:11, paddingTop:10 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* ════════════ P&L ════════════ */}
        <Sec id="pnl" num="1" title="P&L Summary — 7-Year Income Statement">
          <p style={{ fontSize:13, color:C.muted, marginBottom:22, lineHeight:1.6 }}>
            April–March fiscal years. Three product lines (T-25, T-125, T-2500) drive equipment sales. Services begin 12 months post-first equipment sale at 75% attach rate with 3% annual escalator.
          </p>
          <Table compact
            headers={["","FY1","FY2","FY3","FY4","FY5","FY6","FY7"]}
            rows={[
              ["H₂ Revenue",...pnl.h2Rev.map(v=>fmt(v))],
              ["Equipment Revenue",...pnl.eqRev.map(v=>fmt(v))],
              ["Services Revenue",...pnl.svcRev.map(v=>fmt(v))],
              [{v:"OPERATING REVENUE",bold:true},...pnl.opRev.map(v=>({v:fmt(v),bold:true}))],
              ["Total COGS",...pnl.totalCogs.map(v=>fmt(v))],
              [{v:"GROSS PROFIT",bold:true},...pnl.gp.map(v=>({v:fmt(v),bold:true}))],
              ["Gross Margin",...pnl.gpMargin.map(v=>({v:pct(v),color:C.accent}))],
              ["Total OpEx",...pnl.totalOpex.map(v=>fmt(v))],
              ["Headcount",...pnl.headcount.map(String)],
              [{v:"EBITDA",bold:true},...pnl.ebitda.map(v=>({v:fmt(v),bold:true,color:v<0?C.red:C.accent}))],
              ["EBITDA Margin",...pnl.ebitdaM.map(v=>({v:pct(v),color:v<0?C.red:C.accent}))],
              ["D&A",...pnl.depr.map(v=>fmt(v))],
              ["45V PTC",...pnl.ptc.map(v=>({v:fmt(v),color:C.purple}))],
              ["Interest",...pnl.interest.map(v=>fmt(v))],
              ["Taxes",...pnl.taxes.map(v=>fmt(v))],
              [{v:"NET INCOME",bold:true},...pnl.ni.map(v=>({v:fmt(v),bold:true,color:v<0?C.red:C.white}))],
              ["Net Margin",...pnl.niMargin.map(v=>({v:pct(v),color:v<0?C.red:C.muted}))],
              [{v:"YEAR-END CASH",bold:true},...pnl.cash.map(v=>({v:fmt(v),bold:true,color:C.purple}))],
            ]}
          />

          <ChartCard title="Operating Expense Buildup ($M)" height={250}>
            <BarChart data={opexChart} margin={{ top:10,right:12,left:12,bottom:0 }}>
              <CartesianGrid {...gridConf} />
              <XAxis dataKey="fy" tick={axTick} axisLine={axLine} tickLine={false} />
              <YAxis tick={axTick} axisLine={noLine} tickLine={false} tickFormatter={v=>`$${v}M`} />
              <Tooltip content={<Tip valFmt={v=>fmt(v*1e6)} />} />
              <Bar dataKey="people" name="People (Salary + Benefits)" stackId="1" fill={C.blue} />
              <Bar dataKey="leases" name="Facilities" stackId="1" fill={C.purple} />
              <Bar dataKey="profFees" name="Prof Fees + S&M" stackId="1" fill={C.gold} />
              <Bar dataKey="rd" name="R&D + Other" stackId="1" fill={C.accent} radius={[5,5,0,0]} />
              <Legend wrapperStyle={{ fontSize:11, paddingTop:10 }} />
            </BarChart>
          </ChartCard>

          <ChartCard title="Year-End Cash Position ($M)" height={210}>
            <AreaChart data={cashChart} margin={{ top:10,right:12,left:12,bottom:0 }}>
              <defs>
                <linearGradient id="gCash" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.purple} stopOpacity={0.35}/>
                  <stop offset="100%" stopColor={C.purple} stopOpacity={0.02}/>
                </linearGradient>
              </defs>
              <CartesianGrid {...gridConf} />
              <XAxis dataKey="fy" tick={axTick} axisLine={axLine} tickLine={false} />
              <YAxis tick={axTick} axisLine={noLine} tickLine={false} tickFormatter={v=>`$${v}M`} />
              <Tooltip content={<Tip valFmt={v=>fmt(v*1e6)} />} />
              <Area type="monotone" dataKey="cash" name="Cash" stroke={C.purple} fill="url(#gCash)" strokeWidth={2.5} dot={{ r:4, fill:C.purple, strokeWidth:0 }} />
            </AreaChart>
          </ChartCard>
        </Sec>

        {/* ════════════ UNIT ECONOMICS ════════════ */}
        <Sec id="unit" num="2" title="Unit Economics — Structural Cost Advantage">
          <p style={{ fontSize:13, color:C.muted, marginBottom:22, lineHeight:1.6 }}>
            Distributed on-site production eliminates the $2–4/kg transportation premium that centralized SMR producers pay. Tobe all-in: $4.84/kg vs. grey H₂ delivered at $5.30/kg.
          </p>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <ChartCard title="$/kg Cost Comparison — Tobe vs. Grey H₂ Delivered" height={250}>
              <BarChart data={costComp} layout="vertical" margin={{ top:8,right:24,left:8,bottom:0 }}>
                <CartesianGrid {...gridConf} horizontal={false} />
                <XAxis type="number" tick={axTick} axisLine={noLine} tickLine={false} tickFormatter={v=>`$${v}`} />
                <YAxis type="category" dataKey="name" tick={{ fill:C.muted, fontSize:10 }} axisLine={noLine} tickLine={false} width={110} />
                <Tooltip formatter={v=>`$${v.toFixed(2)}/kg`} contentStyle={tipStyle} />
                <Bar dataKey="Tobe (On-Site)" fill={C.accent} radius={[0,5,5,0]} barSize={12} />
                <Bar dataKey="Grey H₂ (Delivered)" fill={C.red} radius={[0,5,5,0]} barSize={12} fillOpacity={0.55} />
                <Legend wrapperStyle={{ fontSize:11, paddingTop:10 }} />
              </BarChart>
            </ChartCard>

            {/* Price sensitivity */}
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"22px 24px", marginTop:16 }}>
              <div style={{ fontSize:11, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6 }}>Margin Sensitivity Across H₂ Prices</div>
              <div style={{ fontSize:11, color:C.dim, marginBottom:20 }}>Full production (Year 3+) · All-in cost = $4.84/kg</div>
              {unitEcon.priceSens.map((row,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:14, marginBottom:12 }}>
                  <div style={{ width:56, fontSize:12, fontFamily:"'JetBrains Mono',monospace", color:C.text, fontWeight:500 }}>${row.price}/kg</div>
                  <div style={{ flex:1, height:22, background:C.faint, borderRadius:6, overflow:"hidden" }}>
                    <div style={{ height:"100%", borderRadius:6, width:`${row.margin}%`, background:`linear-gradient(90deg, ${C.accent}, ${C.blue})`, transition:"width 1.2s cubic-bezier(0.16,1,0.3,1)" }} />
                  </div>
                  <div style={{ width:50, textAlign:"right", fontSize:12, fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:C.accent }}>{row.margin}%</div>
                </div>
              ))}
              <div style={{ fontSize:11, color:C.dim, marginTop:16, borderTop:`1px solid ${C.border}`, paddingTop:12 }}>Profitable at every price point tested. Base case: $25/kg.</div>
            </div>
          </div>

          {/* Product line cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginTop:16 }}>
            {unitEcon.products.map((p,i) => {
              const margin = ((1 - p.cogs/p.price)*100).toFixed(0);
              return (
                <div key={i} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"22px 24px", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${[C.accent,C.blue,C.gold][i]}, transparent)` }} />
                  <div style={{ fontSize:20, fontWeight:700, color:C.white, fontFamily:"'JetBrains Mono',monospace", marginBottom:2 }}>{p.name}</div>
                  <div style={{ fontSize:11, color:C.muted, marginBottom:18 }}>{p.cap} · {p.power}</div>
                  {[["Unit Price",fmt(p.price)],["Mfg COGS",fmt(p.cogs)],["Gross Margin",`${margin}%`]].map(([l,v],j) => (
                    <div key={j} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderTop:j===0?`1px solid ${C.border}`:"none" }}>
                      <span style={{ fontSize:11, color:C.muted }}>{l}</span>
                      <span style={{ fontSize:13, fontWeight:j===2?700:600, fontFamily:"'JetBrains Mono',monospace", color:j===2?C.accent:C.text }}>{v}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </Sec>

        {/* ════════════ FUNDRAISING ════════════ */}
        <Sec id="fundraising" num="3" title="Fundraising — $510M Equity · $734M Total Capital">
          <Table
            headers={["Round","Timing","Pre-Money","Equity","Debt / PF","Total","Post-Money","Step-Up"]}
            highlight={1}
            rows={fundraising.map(f => [
              f.round, f.timing, fmt(f.preMoney), {v:fmt(f.equity),color:C.accent},
              f.debt>0?fmt(f.debt):"—", {v:fmt(f.equity+f.debt),bold:true}, {v:fmt(f.postMoney),bold:true},
              {v:f.stepUp, color:f.stepUp==="—"?C.dim:C.gold},
            ])}
          />

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginTop:16 }}>
            {fundraising.map((f,i) => (
              <div key={i} style={{
                background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"16px 18px",
                borderLeft: f.round.includes("★") ? `3px solid ${C.accent}` : `3px solid transparent`,
              }}>
                <div style={{ fontSize:12, fontWeight:700, color: f.round.includes("★") ? C.accent : C.white, marginBottom:6 }}>{f.round.replace(" ★","")}{f.round.includes("★") && <span style={{ color:C.accent }}> ★ Current</span>}</div>
                <div style={{ fontSize:10, color:C.muted, lineHeight:1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>

          <ChartCard title="Post-Money Valuation Path" height={240}>
            <BarChart data={valChart} margin={{ top:10,right:12,left:12,bottom:0 }}>
              <CartesianGrid {...gridConf} />
              <XAxis dataKey="round" tick={{ fill:C.muted, fontSize:10 }} axisLine={axLine} tickLine={false} />
              <YAxis tick={axTick} axisLine={noLine} tickLine={false} tickFormatter={v=>v>=1000?`$${(v/1000).toFixed(1)}B`:`$${v}M`} />
              <Tooltip formatter={v=>v>=1000?`$${(v/1000).toFixed(2)}B`:`$${v.toFixed(0)}M`} contentStyle={tipStyle} />
              <Bar dataKey="post" name="Post-Money Valuation" fill={C.accent} radius={[6,6,0,0]} barSize={40} fillOpacity={0.85} />
            </BarChart>
          </ChartCard>
        </Sec>

        {/* ════════════ USE OF FUNDS ════════════ */}
        <Sec id="funds" num="4" title="Use of Funds — $10M Seed ($7.5M Equity + $2.5M Debt)">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            {/* Pie + legend */}
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"22px 24px", display:"flex", flexDirection:"column" }}>
              <div style={{ fontSize:11, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:14 }}>Allocation Breakdown</div>
              <div style={{ display:"flex", alignItems:"center", gap:20, flex:1 }}>
                <div style={{ width:170, height:170, flexShrink:0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={useOfFunds} cx="50%" cy="50%" innerRadius={46} outerRadius={74} dataKey="amt" paddingAngle={2} strokeWidth={0}>
                        {useOfFunds.map((_,i) => <Cell key={i} fill={UOF_COLORS[i]} />)}
                      </Pie>
                      <Tooltip formatter={v=>fmtFull(v)} contentStyle={tipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:10, flex:1 }}>
                  {useOfFunds.map((u,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", fontSize:11 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ width:8, height:8, borderRadius:2, background:UOF_COLORS[i], flexShrink:0 }} />
                        <span style={{ color:C.muted }}>{u.cat}</span>
                      </div>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:600, color:C.text, marginLeft:8 }}>{u.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress bars */}
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"22px 24px" }}>
              <div style={{ fontSize:11, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:18 }}>Budget Detail</div>
              {useOfFunds.map((u,i) => (
                <div key={i} style={{ marginBottom:16 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <span style={{ fontSize:12, color:C.text, fontWeight:500 }}>{u.cat}</span>
                    <span style={{ fontSize:12, fontFamily:"'JetBrains Mono',monospace", fontWeight:600, color:C.text }}>{fmtFull(u.amt)}</span>
                  </div>
                  <div style={{ height:6, background:C.faint, borderRadius:4, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${u.pct}%`, background:UOF_COLORS[i], borderRadius:4, transition:"width 1s cubic-bezier(0.16,1,0.3,1)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Sec>

        {/* ════════════ TAX CREDITS ════════════ */}
        <Sec id="tax" num="5" title="45V Production Tax Credit — $3/kg Federal Credit">
          <p style={{ fontSize:13, color:C.muted, marginBottom:22, lineHeight:1.6 }}>
            IRA §45V: $3/kg credit for qualifying clean hydrogen. 10-year credit window per facility. Construction must begin by Dec 2027 — four facilities qualify (F1–F4). Pure margin with zero incremental COGS.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:22 }}>
            <KPI label="Credit Rate" value="$3/kg" sub="Federal clean hydrogen PTC" color={C.purple} />
            <KPI label="Eligible Facilities" value="4" sub="F1–F4 begin construction ≤ Dec 2027" color={C.purple} />
            <KPI label="Annual per Facility" value="$2.7M" sub="$3 × 900K kg/yr at nameplate" color={C.purple} />
            <KPI label="10-Year per Facility" value="$27M" sub="Cumulative over credit window" color={C.purple} />
          </div>
          <Table
            headers={["","FY1","FY2","FY3","FY4","FY5"]}
            rows={[
              ["PTC Revenue ($3/kg)",...[0,1417500,8887500,10800000,10800000].map(v=>({v:fmt(v),color:C.purple}))],
              ["H₂ Production (kg)",...[0,472500,3112500,5662500,8437500].map(v=>v===0?"—":v.toLocaleString())],
              [{v:"Cumulative PTC Cash",bold:true},...[0,1417500,10305000,21105000,31905000].map(v=>({v:fmt(v),bold:true}))],
            ]}
          />
        </Sec>

        {/* ════════════ AI MANUFACTURING ════════════ */}
        <Sec id="learning" num="6" title="AI-Embedded Manufacturing — Automation vs. Inflation">
          <p style={{ fontSize:13, color:C.muted, marginBottom:22, lineHeight:1.6 }}>
            Every generation of units gets cheaper — not because of a textbook curve, but because we systematically embed AI and automation into the production line. Computer vision replaces manual QC. Cobots replace hand assembly. ML optimizes break-in protocols. Materials inflation is real (2.5%/yr) — our automation roadmap outpaces it through Year 6, then holds cost nearly flat.
          </p>

          <ChartCard title="T-25 & T-125 Manufacturing Cost per Unit ($K)" height={270}>
            <LineChart data={bomChart} margin={{ top:10,right:12,left:12,bottom:0 }}>
              <CartesianGrid {...gridConf} />
              <XAxis dataKey="year" tick={axTick} axisLine={axLine} tickLine={false} />
              <YAxis tick={axTick} axisLine={noLine} tickLine={false} tickFormatter={v=>`$${v}K`} />
              <Tooltip formatter={v=>`$${v.toFixed(1)}K`} contentStyle={tipStyle} />
              <Line type="monotone" dataKey="T-125" stroke={C.blue} strokeWidth={2.5} dot={{ r:5, fill:C.blue, strokeWidth:0 }} />
              <Line type="monotone" dataKey="T-25" stroke={C.accent} strokeWidth={2.5} dot={{ r:5, fill:C.accent, strokeWidth:0 }} />
              <Legend wrapperStyle={{ fontSize:11, paddingTop:10 }} />
            </LineChart>
          </ChartCard>

          <ChartCard title="T-2500 Manufacturing Cost ($K) — Commercial Scale Begins Y4" height={200}>
            <LineChart data={bomT2500} margin={{ top:10,right:12,left:12,bottom:0 }}>
              <CartesianGrid {...gridConf} />
              <XAxis dataKey="year" tick={axTick} axisLine={axLine} tickLine={false} />
              <YAxis tick={axTick} axisLine={noLine} tickLine={false} tickFormatter={v=>`$${v}K`} />
              <Tooltip formatter={v=>`$${v.toFixed(0)}K`} contentStyle={tipStyle} />
              <Line type="monotone" dataKey="T-2500" stroke={C.gold} strokeWidth={2.5} dot={{ r:5, fill:C.gold, strokeWidth:0 }} />
              <Legend wrapperStyle={{ fontSize:11, paddingTop:10 }} />
            </LineChart>
          </ChartCard>

          {/* AI Roadmap */}
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"22px 24px", marginTop:16 }}>
            <div style={{ fontSize:11, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:16 }}>How We Stay Ahead of Inflation — AI & Automation Deployment Timeline</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
              {[
                { phase:"Y1–Y2", color:C.accent, items:["Computer vision weld inspection (−$1.2K/unit)","Dimensional verification via CMM + vision (−$800)","ML-optimized stack break-in protocols (−$1.5K)"] },
                { phase:"Y3–Y4", color:C.blue, items:["Predictive maintenance on production equipment (−$400)","AI-drafted certification packages (−$500)","First cobot sub-assembly station (−$800)"] },
                { phase:"Y5+", color:C.purple, items:["Full multi-cobot assembly line (−$1.5K)","End-to-end AI engineering pipeline (−$2K)","Lights-out sub-assembly cells"] },
                { phase:"Core Principle", color:C.gold, items:["AI generates, humans approve.","Every output built by hand first, then replicated by AI, then approved by a senior engineer.","Trust is earned, not assumed."] },
              ].map((p,i) => (
                <div key={i} style={{ background:C.surface, borderRadius:10, padding:"16px 18px", borderLeft:`3px solid ${p.color}` }}>
                  <div style={{ fontSize:12, fontWeight:700, color:p.color, marginBottom:8 }}>{p.phase}</div>
                  {p.items.map((item,j) => (
                    <div key={j} style={{ fontSize:11, color:C.muted, lineHeight:1.6, paddingLeft:10, position:"relative" }}>
                      <span style={{ position:"absolute", left:0, color:p.color }}>·</span>{item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Sec>

        {/* ════════════ ASSUMPTIONS ════════════ */}
        <Sec id="assumptions" num="7" title="Key Assumptions & Sensitivity Analysis">
          <p style={{ fontSize:13, color:C.muted, marginBottom:22, lineHeight:1.6 }}>
            Base-case inputs driving the 7-year financial model. All assumptions are adjustable in the downloadable Excel model.
          </p>
          <Table
            headers={["Assumption","Base Case","Notes"]}
            rows={[
              ["Electricity Rate","$0.03/kWh (prod) · $0.10/kWh (PPA)","Oklahoma industrial + 100% renewable PPA"],
              ["H₂ Selling Price","$25/kg (blended avg)","Range: $15–30/kg across customer segments"],
              ["Capacity Factor","85%","Conservative; industrial benchmark 90%+"],
              ["Facility CapEx","$8.5M per site","Containerized T-125 deployment, turnkey"],
              ["Specific Energy","42.8 kWh/kg","Conservative vs. 46 kWh/kg measured"],
              ["45V PTC","$3.00/kg for 10 years","100% renewable PPA qualifies for max tier"],
              ["Equipment Margin","40% gross (Y1) → 45%+ (Y5)","AI/automation learning curve"],
              ["Annual Escalator","2.5% revenue · 2.0% costs","Built into all multi-year offtakes"],
              ["Tax Rate","28.5%","Blended federal + Oklahoma state"],
            ]}
          />

          {/* Sensitivity table */}
          <div style={{ marginTop:28 }}>
            <div style={{ fontSize:11, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:16 }}>Scenario Analysis — FY3 Impact</div>
            <Table
              headers={["Scenario","Revenue","EBITDA","Margin","vs. Base"]}
              highlight={0}
              rows={[
                [{v:"Base Case",bold:true,color:C.accent},"$88.3M",{v:"$54.9M",bold:true,color:C.accent},"62.2%","—"],
                ["H₂ Price $30/kg","$103.8M","$70.4M","67.8%",{v:"+$15.5M",color:C.accent}],
                ["H₂ Price $20/kg","$72.8M","$39.4M","54.1%",{v:"-$15.5M",color:C.red}],
                ["H₂ Price $15/kg","$57.3M","$23.9M","41.7%",{v:"-$31.0M",color:C.red}],
                ["No 45V Credit","$79.4M","$46.0M","57.9%",{v:"-$8.9M",color:C.gold}],
                ["8 Facilities (vs. 4)","$176.6M","$109.8M","62.2%",{v:"+$54.9M",color:C.accent}],
              ]}
            />
          </div>
        </Sec>

        {/* ════════════ FOOTER ════════════ */}
        <div style={{ marginTop:72, paddingTop:28, borderTop:`1px solid ${C.border}` }}>
          {/* Download CTA */}
          <div style={{
            background:`linear-gradient(135deg, ${C.card} 0%, rgba(0,212,170,0.04) 100%)`,
            border:`1px solid ${C.border}`, borderRadius:14, padding:"24px 28px",
            display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24,
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:C.accentDim, border:`1px solid rgba(0,212,170,0.12)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1v9.5M8 10.5L4.5 7M8 10.5L11.5 7M2.5 13h11" stroke={C.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:C.white }}>Ready to dig into the formulas?</div>
                <div style={{ fontSize:12, color:C.muted }}>Full Excel model · 84-month engine · 15,400+ live formulas · Every assumption adjustable</div>
              </div>
            </div>
            <a
              href="/Tobe_Seed_Financial_Model_v853.xlsx"
              download="Tobe_Seed_Financial_Model_v853.xlsx"
              style={{
                display:"inline-flex", alignItems:"center", gap:8,
                background:C.accent, color:C.bg, padding:"11px 24px", borderRadius:9,
                fontSize:13, fontWeight:700, textDecoration:"none", letterSpacing:"0.02em",
                boxShadow:`0 0 24px ${C.accentGlow}`, cursor:"pointer", transition:"all 0.2s", flexShrink:0,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 4px 32px ${C.accentGlow}`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 0 24px ${C.accentGlow}`; }}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ flexShrink:0 }}>
                <path d="M8 1v9.5M8 10.5L4.5 7M8 10.5L11.5 7M2.5 13h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Excel Model
            </a>
          </div>

          {/* Footer line */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:11, color:C.dim }}>v8.5.3 · March 2026 · Confidential — Prepared for Investor Diligence</span>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:C.accent, boxShadow:`0 0 10px ${C.accentGlow}` }} />
              <span style={{ fontSize:11, fontWeight:500, color:C.muted }}>All integrity checks passing · 0 formula errors · BS balanced 84/84 months</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
