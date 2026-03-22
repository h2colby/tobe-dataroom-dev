import { useState, useMemo } from "react";
import { AreaChart, Area, BarChart, Bar, ComposedChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const C = { bg:'#0a0a0f', card:'rgba(255,255,255,0.02)', cb:'rgba(255,255,255,0.1)', g:'#00ff88', o:'#ff6b35', b:'#00d4ff', r:'#ff4444', w:'#fff', w6:'rgba(255,255,255,0.6)', w4:'rgba(255,255,255,0.4)', w1:'rgba(255,255,255,0.1)', gr:'rgba(255,255,255,0.05)' };
const TABS = ['THESIS','REVENUE','PROFIT','UNIT ECON','FACILITIES','45V PTC','SENSITIVITY','CAP TABLE'];

// All data from Tobe_Energy_Financial_Model_FINAL.xlsx
const Y = ['FY1','FY2','FY3','FY4','FY5','FY6','FY7'];
const h2R = [0,11812500,77812500,141562500,210937500,264375000,270000000];
const eqR = [875000,4295000,10260000,18770000,28950000,39130000,51060000];
const svR = [0,32813,242113,848205,2092281,4204952,6594846];
const opR = [875000,16140313,88314613,161180705,241979781,307709952,327654846];
const ebitda = [-2653198,3695245,54545917,104487910,158169878,201719640,209431119];
const ebitdaM = [-3.032,0.229,0.618,0.648,0.654,0.656,0.639];
const ni = [-2783107,2592261,44489636,81157013,118455022,148041088,152475471];
const niM = [-3.181,0.161,0.504,0.504,0.489,0.481,0.465];
const gm = [0.40,0.761,0.820,0.812,0.808,0.802,0.786];
const cash = [1289092,49613513,139487718,224151798,478384683,684959946,832781983];
const ptcRev = [0,1417500,8887500,10800000,10800000,10800000,10800000];
const cumPTC = [0,1417500,10305000,21105000,31905000,42705000,53505000];
const capNP = [0,900000,3600000,3600000,5400000,9000000,10800000];
const capAct = [0,472500,3112500,5662500,8437500,10575000,10800000];

const fmt = (n) => { if(Math.abs(n)>=1e9) return `$${(n/1e9).toFixed(1)}B`; if(Math.abs(n)>=1e6) return `$${(n/1e6).toFixed(1)}M`; if(Math.abs(n)>=1e3) return `$${(n/1e3).toFixed(0)}K`; return `$${n.toFixed(2)}`; };

const Card = ({children,style}) => <div style={{background:C.card,border:`1px solid ${C.cb}`,borderRadius:8,padding:16,...style}}>{children}</div>;
const SL = ({children}) => <div style={{color:C.o,textTransform:'uppercase',letterSpacing:'0.15em',fontSize:'0.6rem',fontWeight:600,marginBottom:6,fontFamily:'monospace'}}>{children}</div>;
const GN = ({v,c,s}) => <div><div style={{fontSize:'1.6rem',fontWeight:700,color:c,fontFamily:'monospace',textShadow:`0 0 20px ${c}40`,lineHeight:1.1}}>{v}</div>{s&&<div style={{color:C.w6,fontSize:'0.65rem',marginTop:3,fontFamily:'monospace'}}>{s}</div>}</div>;

const CT = ({active,payload,label}) => { if(!active||!payload?.length) return null; return <div style={{background:'#111118',border:`1px solid ${C.cb}`,borderRadius:6,padding:'8px 12px',fontFamily:'monospace',fontSize:'0.7rem'}}><div style={{color:C.w6,marginBottom:4}}>{label}</div>{payload.map((p,i)=><div key={i} style={{color:p.color}}>{p.name}: {typeof p.value==='number'&&Math.abs(p.value)>=1000?fmt(p.value):p.value}</div>)}</div>; };

const Tab1 = () => {
  const hm = [{l:'FY7 REVENUE',v:fmt(opR[6]),s:'12 facilities × 3 streams',c:C.g},{l:'FY7 EBITDA',v:fmt(ebitda[6]),s:`${(ebitdaM[6]*100).toFixed(1)}% margin`,c:C.g},{l:'FY7 NET INCOME',v:fmt(ni[6]),s:`${(niM[6]*100).toFixed(1)}% margin`,c:C.b},{l:'45V PTC UPSIDE',v:'$324M',s:'12 fac × $27M over 10yr',c:C.o}];
  const tp = [
    {t:'$226B global market. First electrolyzer under DOE $2/kg target (LCOH $2.06 optimized).',c:C.g},
    {t:'79.7% gross margin at $25/kg — all-in cost $5.08/kg, 92% system efficiency.',c:C.g},
    {t:'12 facilities by FY7, 100+ domestic sites addressable. $37.1M total CapEx.',c:C.b},
    {t:'$20M+ signed LOIs. First deployment Q4 2026 at Zeeco ARC.',c:C.b},
    {t:'45V tax credit: $3/kg for 10 years. Conservative $108M → Full $324M cumulative.',c:C.o},
  ];
  return <div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:24}}>
      {hm.map((m,i)=><Card key={i} style={{textAlign:'center',position:'relative',overflow:'hidden'}}><div style={{position:'absolute',top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${m.c},transparent)`}}/><SL>{m.l}</SL><GN v={m.v} c={m.c} s={m.s}/></Card>)}
    </div>
    <SL>WHY THIS INVESTMENT</SL>
    <div style={{display:'flex',flexDirection:'column',gap:8}}>
      {tp.map((p,i)=><Card key={i} style={{display:'flex',alignItems:'flex-start',gap:10,padding:12}}><span style={{color:p.c,fontSize:'0.75rem',marginTop:1,flexShrink:0}}>◆</span><span style={{color:C.w,fontSize:'0.78rem',fontFamily:'monospace',lineHeight:1.5}}>{p.t}</span></Card>)}
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:20}}>
      <Card><SL>SEED ROUND</SL><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>{[['Pre-Money','$40M'],['Round Size','$10M'],['Equity','$7.5M'],['Debt','$2.5M']].map(([l,v],i)=><div key={i}><div style={{color:C.w4,fontSize:'0.6rem',fontFamily:'monospace'}}>{l}</div><div style={{color:C.w,fontSize:'1rem',fontWeight:600,fontFamily:'monospace'}}>{v}</div></div>)}</div></Card>
      <Card><SL>SEED INVESTOR RETURNS (FY7)</SL><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>{[['Bear (8x Rev)','28.3x'],['Base (10x Rev)','35.4x'],['Bull (12x Rev)','42.5x'],['20x EBITDA','46.7x']].map(([l,v],i)=><div key={i}><div style={{color:C.w4,fontSize:'0.6rem',fontFamily:'monospace'}}>{l}</div><div style={{color:C.g,fontSize:'1rem',fontWeight:600,fontFamily:'monospace'}}>{v}</div></div>)}</div></Card>
    </div>
  </div>;
};

const Tab2 = () => {
  const d = Y.map((y,i)=>({year:y,h2:h2R[i]/1e6,eq:eqR[i]/1e6,sv:svR[i]/1e6}));
  const mix = [{name:'H₂ Production',value:270000000,pct:82.4},{name:'Equipment',value:51060000,pct:15.6},{name:'Services',value:6594846,pct:2.0}];
  const pc = [C.g,C.o,C.b];
  const cagr = ((opR[6]/opR[1])**(1/5)-1)*100;
  return <div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 180px',gap:16,marginBottom:20}}>
      <Card><SL>REVENUE BY STREAM ($M)</SL><ResponsiveContainer width="100%" height={340}><AreaChart data={d}><CartesianGrid strokeDasharray="3 3" stroke={C.gr}/><XAxis dataKey="year" tick={{fill:C.w6,fontSize:11,fontFamily:'monospace'}}/><YAxis tick={{fill:C.w6,fontSize:11,fontFamily:'monospace'}} tickFormatter={v=>`$${v}M`}/><Tooltip content={<CT/>}/><Area type="monotone" dataKey="h2" stackId="1" fill={C.g} fillOpacity={0.6} stroke={C.g} name="H₂ ($M)"/><Area type="monotone" dataKey="eq" stackId="1" fill={C.o} fillOpacity={0.6} stroke={C.o} name="Equipment ($M)"/><Area type="monotone" dataKey="sv" stackId="1" fill={C.b} fillOpacity={0.6} stroke={C.b} name="Services ($M)"/></AreaChart></ResponsiveContainer></Card>
      <Card style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}><SL>REVENUE CAGR</SL><GN v={`${cagr.toFixed(0)}%`} c={C.g} s="FY2 → FY7"/><div style={{marginTop:20}}><SL>FY7 TOTAL</SL><GN v={fmt(opR[6])} c={C.g}/></div></Card>
    </div>
    <Card><SL>FY7 REVENUE MIX</SL><div style={{display:'flex',alignItems:'center',gap:24}}><ResponsiveContainer width={200} height={200}><PieChart><Pie data={mix} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>{mix.map((_,i)=><Cell key={i} fill={pc[i]}/>)}</Pie></PieChart></ResponsiveContainer><div style={{display:'flex',flexDirection:'column',gap:10}}>{mix.map((m,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:8}}><div style={{width:10,height:10,borderRadius:2,background:pc[i],flexShrink:0}}/><span style={{color:C.w,fontFamily:'monospace',fontSize:'0.78rem'}}>{m.name}: {m.pct}% ({fmt(m.value)})</span></div>)}</div></div></Card>
  </div>;
};

const Tab3 = () => {
  const d = Y.map((y,i)=>({year:y,eb:ebitda[i]/1e6,ebm:ebitdaM[i]>-1?+(ebitdaM[i]*100).toFixed(1):null,ni:ni[i]/1e6,gm:+(gm[i]*100).toFixed(1)}));
  return <div style={{display:'grid',gridTemplateColumns:'1fr 200px',gap:16}}>
    <Card><SL>EBITDA ($M) + MARGINS</SL><ResponsiveContainer width="100%" height={380}><ComposedChart data={d}><CartesianGrid strokeDasharray="3 3" stroke={C.gr}/><XAxis dataKey="year" tick={{fill:C.w6,fontSize:11,fontFamily:'monospace'}}/><YAxis yAxisId="l" tick={{fill:C.w6,fontSize:11,fontFamily:'monospace'}} tickFormatter={v=>`$${v}M`}/><YAxis yAxisId="r" orientation="right" tick={{fill:C.w6,fontSize:11,fontFamily:'monospace'}} tickFormatter={v=>`${v}%`} domain={[0,100]}/><Tooltip content={<CT/>}/><Bar yAxisId="l" dataKey="eb" fill={C.g} fillOpacity={0.7} name="EBITDA ($M)" radius={[4,4,0,0]}/><Line yAxisId="r" type="monotone" dataKey="ebm" stroke={C.o} strokeWidth={2} dot={{fill:C.o,r:3}} name="EBITDA Margin %" connectNulls/><Line yAxisId="l" type="monotone" dataKey="ni" stroke={C.b} strokeWidth={2} dot={{fill:C.b,r:3}} name="Net Income ($M)"/><Line yAxisId="r" type="monotone" dataKey="gm" stroke={C.w4} strokeWidth={1} strokeDasharray="5 5" dot={false} name="Gross Margin %"/></ComposedChart></ResponsiveContainer></Card>
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      <Card style={{textAlign:'center'}}><SL>EBITDA POSITIVE</SL><GN v="FY2" c={C.g} s="$3.7M Year 2"/></Card>
      <Card style={{textAlign:'center'}}><SL>FY7 EBITDA MARGIN</SL><GN v="63.9%" c={C.o} s={fmt(ebitda[6])}/></Card>
      <Card style={{textAlign:'center'}}><SL>FY7 NET MARGIN</SL><GN v="46.5%" c={C.b} s={fmt(ni[6])}/></Card>
      <Card><SL>NOTE</SL><div style={{color:C.w6,fontSize:'0.65rem',fontFamily:'monospace',lineHeight:1.4}}>Gross margins moderate 82%→79% as equipment sales grow in mix. H₂ production margins stay 85%+.</div></Card>
    </div>
  </div>;
};

const Tab4 = () => {
  const wf = [{n:'Electricity',v:1.777,b:0},{n:'Compression',v:0.14,b:1.777},{n:'Transport',v:0.90,b:1.917},{n:'Water',v:0.05,b:2.817},{n:'Labor',v:1.389,b:2.867},{n:'CapEx',v:0.407,b:4.256},{n:'Maint.',v:0.420,b:4.663}].map(w=>({name:w.n,base:+w.b.toFixed(3),cost:+w.v.toFixed(3)}));
  const mg = [{p:'$15',c:5.08,m:9.92},{p:'$20',c:5.08,m:14.92},{p:'$25',c:5.08,m:19.92},{p:'$30',c:5.08,m:24.92},{p:'$47',c:5.08,m:41.92}];
  return <div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
      <Card><SL>COST BUILD-UP ($/KG)</SL><ResponsiveContainer width="100%" height={260}><BarChart data={wf} barSize={32}><CartesianGrid strokeDasharray="3 3" stroke={C.gr}/><XAxis dataKey="name" tick={{fill:C.w6,fontSize:9,fontFamily:'monospace'}}/><YAxis tick={{fill:C.w6,fontSize:11,fontFamily:'monospace'}} tickFormatter={v=>`$${v}`} domain={[0,6]}/><Tooltip content={<CT/>}/><Bar dataKey="base" stackId="a" fill="transparent"/><Bar dataKey="cost" stackId="a" fill={C.o} fillOpacity={0.8} name="$/kg" radius={[3,3,0,0]}/></BarChart></ResponsiveContainer><div style={{textAlign:'center',marginTop:6}}><span style={{color:C.o,fontSize:'1.1rem',fontWeight:700,fontFamily:'monospace'}}>$5.08/kg all-in</span><span style={{color:C.w4,fontSize:'0.7rem',fontFamily:'monospace',marginLeft:8}}>(Direct: $2.87)</span></div></Card>
      <Card><SL>ON-SITE VS. DELIVERED</SL><div style={{display:'flex',flexDirection:'column',gap:14,marginTop:12}}>{[{l:'Tobe On-Site',c:'$5.08/kg',cl:C.g,w:'8%'},{l:'Grey H₂ (50mi)',c:'$5.25/kg',cl:C.w4,w:'8.5%'},{l:'Grey H₂ (150+mi)',c:'$10.30/kg',cl:C.w4,w:'17%'},{l:'Market Bulk',c:'$15-36/kg',cl:C.o,w:'45%'},{l:'Airgas Cylinder',c:'$121.31/kg',cl:C.r,w:'100%'}].map((x,i)=><div key={i}><div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}><span style={{color:C.w6,fontSize:'0.68rem',fontFamily:'monospace'}}>{x.l}</span><span style={{color:x.cl,fontSize:'0.75rem',fontWeight:600,fontFamily:'monospace'}}>{x.c}</span></div><div style={{height:5,background:'rgba(255,255,255,0.05)',borderRadius:3}}><div style={{height:'100%',width:x.w,background:x.cl,borderRadius:3,opacity:0.7}}/></div></div>)}</div></Card>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16}}>
      <Card><SL>MARGIN AT PRICE POINTS</SL><ResponsiveContainer width="100%" height={240}><BarChart data={mg} barSize={40}><CartesianGrid strokeDasharray="3 3" stroke={C.gr}/><XAxis dataKey="p" tick={{fill:C.w6,fontSize:11,fontFamily:'monospace'}}/><YAxis tick={{fill:C.w6,fontSize:11,fontFamily:'monospace'}} tickFormatter={v=>`$${v}`}/><Tooltip content={<CT/>}/><Bar dataKey="c" stackId="a" fill={C.r} fillOpacity={0.5} name="Cost ($/kg)"/><Bar dataKey="m" stackId="a" fill={C.g} fillOpacity={0.7} name="Margin ($/kg)" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer></Card>
      <Card><SL>CUSTOMER PRICES</SL><div style={{display:'flex',flexDirection:'column',gap:14,marginTop:8}}>{[{n:'Zeeco ARC',p:30,s:'Contracted'},{n:'Tulsa Industrial',p:47,s:'LOI'},{n:'Airgas Cylinder',p:121.31,s:'Market Ref'}].map((c,i)=><div key={i} style={{borderBottom:`1px solid ${C.w1}`,paddingBottom:10}}><div style={{color:C.w,fontSize:'0.78rem',fontFamily:'monospace',fontWeight:600}}>{c.n}</div><div style={{display:'flex',justifyContent:'space-between',marginTop:3}}><span style={{color:C.g,fontSize:'1.2rem',fontWeight:700,fontFamily:'monospace'}}>${c.p}/kg</span><span style={{color:C.w4,fontSize:'0.6rem',fontFamily:'monospace',alignSelf:'flex-end'}}>{c.s}</span></div></div>)}</div></Card>
    </div>
  </div>;
};

const facs = [{id:'F1',n:'Tulsa',l:'OK',is:'Apr 27',t:'T1',ptc:true},{id:'F2',n:'OKC',l:'OK',is:'Oct 27',t:'T2',ptc:true},{id:'F3',n:'Seattle',l:'WA',is:'Apr 28',t:'T2',ptc:true},{id:'F4',n:'Spokane',l:'WA',is:'Jul 28',t:'T2',ptc:true},{id:'F5',n:'Albuquerque',l:'NM',is:'Dec 28',t:'T3',ptc:false},{id:'F6',n:'Des Moines',l:'IA',is:'May 29',t:'T3',ptc:false},{id:'F7',n:'TBD',l:'—',is:'Aug 29',t:'T4',ptc:false},{id:'F8',n:'TBD',l:'—',is:'Dec 29',t:'T4',ptc:false},{id:'F9',n:'TBD',l:'—',is:'Apr 30',t:'T4',ptc:false},{id:'F10',n:'TBD',l:'—',is:'Aug 30',t:'T4',ptc:false},{id:'F11',n:'TBD',l:'—',is:'Dec 30',t:'T4',ptc:false},{id:'F12',n:'TBD',l:'—',is:'Apr 31',t:'T4',ptc:false}];

const Tab5 = () => {
  const cd = Y.map((y,i)=>({year:y,np:capNP[i]/1e6,act:capAct[i]/1e6}));
  return <div>
    <Card style={{marginBottom:16,overflowX:'auto'}}><SL>12-FACILITY DEPLOYMENT TIMELINE</SL><div style={{display:'grid',gridTemplateColumns:'repeat(12,1fr)',gap:5,marginTop:10}}>{facs.map((f,i)=><div key={i} style={{background:f.ptc?`${C.g}12`:`rgba(255,255,255,0.03)`,border:`1px solid ${f.ptc?C.g+'35':C.w1}`,borderRadius:5,padding:'8px 4px',textAlign:'center',minWidth:68}}><div style={{color:f.ptc?C.g:C.w6,fontSize:'0.65rem',fontWeight:700,fontFamily:'monospace'}}>{f.id}</div><div style={{color:C.w,fontSize:'0.58rem',fontFamily:'monospace',marginTop:1}}>{f.n}</div><div style={{color:C.w4,fontSize:'0.52rem',fontFamily:'monospace'}}>{f.l}</div><div style={{color:C.o,fontSize:'0.55rem',fontFamily:'monospace',marginTop:3}}>{f.is}</div>{f.ptc&&<div style={{color:C.g,fontSize:'0.5rem',fontFamily:'monospace',marginTop:1}}>45V ✓</div>}</div>)}</div></Card>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
      <Card><SL>CUMULATIVE CAPACITY (M KG/YR)</SL><ResponsiveContainer width="100%" height={260}><AreaChart data={cd}><CartesianGrid strokeDasharray="3 3" stroke={C.gr}/><XAxis dataKey="year" tick={{fill:C.w6,fontSize:11,fontFamily:'monospace'}}/><YAxis tick={{fill:C.w6,fontSize:11,fontFamily:'monospace'}} tickFormatter={v=>`${v}M`}/><Tooltip content={<CT/>}/><Area type="monotone" dataKey="np" fill={C.b} fillOpacity={0.15} stroke={C.b} strokeDasharray="5 5" name="Nameplate (M)"/><Area type="monotone" dataKey="act" fill={C.g} fillOpacity={0.4} stroke={C.g} name="Actual (M)"/></AreaChart></ResponsiveContainer></Card>
      <Card><SL>PER-FACILITY ECONOMICS</SL><table style={{width:'100%',borderCollapse:'collapse',fontFamily:'monospace',fontSize:'0.65rem'}}><thead><tr>{['Fac','CapEx','Rev/yr','Payback','PTC/yr'].map(h=><th key={h} style={{color:C.w4,textAlign:'left',padding:'5px 6px',borderBottom:`1px solid ${C.w1}`}}>{h}</th>)}</tr></thead><tbody>{[{f:'F1',cx:'$3.3M',rv:'$22.5M',pb:'2.2 mo',pt:'$2.7M'},{f:'F2',cx:'$3.1M',rv:'$22.5M',pb:'2.1 mo',pt:'$2.7M'},{f:'F3',cx:'$3.1M',rv:'$22.5M',pb:'2.2 mo',pt:'$2.7M'},{f:'F4',cx:'$3.1M',rv:'$22.5M',pb:'2.1 mo',pt:'$2.7M'},{f:'F5',cx:'$3.1M',rv:'$22.5M',pb:'2.2 mo',pt:'—'},{f:'F6',cx:'$3.1M',rv:'$22.5M',pb:'2.1 mo',pt:'—'}].map((r,i)=><tr key={i}><td style={{color:C.w,padding:'5px 6px',borderBottom:`1px solid ${C.w1}`}}>{r.f}</td><td style={{color:C.w6,padding:'5px 6px',borderBottom:`1px solid ${C.w1}`}}>{r.cx}</td><td style={{color:C.g,padding:'5px 6px',borderBottom:`1px solid ${C.w1}`}}>{r.rv}</td><td style={{color:C.o,padding:'5px 6px',borderBottom:`1px solid ${C.w1}`}}>{r.pb}</td><td style={{color:r.pt!=='—'?C.g:C.w4,padding:'5px 6px',borderBottom:`1px solid ${C.w1}`}}>{r.pt}</td></tr>)}</tbody></table></Card>
    </div>
  </div>;
};

const Tab6 = () => {
  const d = Y.map((y,i)=>({year:y,ptc:ptcRev[i]/1e6,cum:cumPTC[i]/1e6}));
  const sc = [{l:'Conservative',f:4,v:108,c:C.w6},{l:'Accelerated',f:8,v:216,c:C.o},{l:'Full Deploy',f:12,v:324,c:C.g}];
  return <div>
    <Card style={{marginBottom:16}}><SL>45V TIER 1 QUALIFICATION</SL><div style={{display:'flex',alignItems:'center',gap:20,marginTop:10}}><div style={{flex:1}}><div style={{position:'relative',height:32,background:'rgba(255,255,255,0.03)',borderRadius:5,overflow:'hidden'}}><div style={{position:'absolute',left:`${(0.45/0.5)*100}%`,top:0,bottom:0,width:2,background:C.r,zIndex:2}}/><div style={{position:'absolute',left:`${(0.03/0.5)*100}%`,top:3,bottom:3,width:16,background:C.g,borderRadius:3,zIndex:3}}/><div style={{position:'absolute',left:0,top:0,bottom:0,width:`${(0.45/0.5)*100}%`,background:`${C.g}10`}}/></div><div style={{display:'flex',justifyContent:'space-between',marginTop:8}}><span style={{color:C.g,fontSize:'0.6rem',fontFamily:'monospace',fontWeight:700}}>← Tobe: 0.03</span><span style={{color:C.r,fontSize:'0.6rem',fontFamily:'monospace'}}>Threshold: 0.45 →</span></div></div><div style={{textAlign:'center'}}><SL>PTC RATE</SL><GN v="$3/kg" c={C.g} s="for 10 years"/></div></div></Card>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
      <Card><SL>ANNUAL PTC REVENUE ($M)</SL><ResponsiveContainer width="100%" height={260}><ComposedChart data={d}><CartesianGrid strokeDasharray="3 3" stroke={C.gr}/><XAxis dataKey="year" tick={{fill:C.w6,fontSize:11,fontFamily:'monospace'}}/><YAxis yAxisId="l" tick={{fill:C.w6,fontSize:11,fontFamily:'monospace'}} tickFormatter={v=>`$${v}M`}/><YAxis yAxisId="r" orientation="right" tick={{fill:C.w6,fontSize:11,fontFamily:'monospace'}} tickFormatter={v=>`$${v}M`}/><Tooltip content={<CT/>}/><Bar yAxisId="l" dataKey="ptc" fill={C.g} fillOpacity={0.7} name="Annual PTC ($M)" radius={[4,4,0,0]}/><Line yAxisId="r" type="monotone" dataKey="cum" stroke={C.o} strokeWidth={2} dot={{fill:C.o,r:3}} name="Cumulative ($M)"/></ComposedChart></ResponsiveContainer></Card>
      <Card><SL>PTC SCENARIO ANALYSIS (10-YR CUMULATIVE)</SL><div style={{display:'flex',flexDirection:'column',gap:12,marginTop:10}}>{sc.map((s,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:12,background:'rgba(255,255,255,0.02)',borderRadius:5,border:`1px solid ${s.c}25`}}><div style={{flex:1}}><div style={{color:s.c,fontSize:'0.7rem',fontFamily:'monospace',fontWeight:600}}>{s.l}</div><div style={{color:C.w4,fontSize:'0.6rem',fontFamily:'monospace'}}>{s.f} facilities</div></div><div style={{color:s.c,fontSize:'1.3rem',fontWeight:700,fontFamily:'monospace',textShadow:s.c!==C.w6?`0 0 15px ${s.c}40`:'none'}}>${s.v}M</div></div>)}</div></Card>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
      <Card><SL>PPA ROI PER FACILITY</SL><div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12,marginTop:6}}><div><div style={{color:C.w4,fontSize:'0.6rem',fontFamily:'monospace'}}>PPA Cost</div><div style={{color:C.r,fontSize:'1rem',fontWeight:600,fontFamily:'monospace'}}>$1.1M/yr</div></div><div><div style={{color:C.w4,fontSize:'0.6rem',fontFamily:'monospace'}}>PTC Credit</div><div style={{color:C.g,fontSize:'1rem',fontWeight:600,fontFamily:'monospace'}}>$2.7M/yr</div></div><div><div style={{color:C.w4,fontSize:'0.6rem',fontFamily:'monospace'}}>Net Benefit</div><div style={{color:C.g,fontSize:'1rem',fontWeight:600,fontFamily:'monospace'}}>$1.6M/yr</div></div></div></Card>
      <Card><SL>KEY INSIGHT</SL><div style={{color:C.w6,fontSize:'0.7rem',fontFamily:'monospace',lineHeight:1.5}}>Model works profitably <span style={{color:C.g,fontWeight:600}}>WITHOUT</span> 45V credits. EBITDA positive from Year 2 in both scenarios. 45V is upside, not dependency.</div></Card>
    </div>
  </div>;
};

const Tab7 = () => {
  const ld = [{e:0.025,l:4.36,g:82.5},{e:0.030,l:4.60,g:81.6},{e:0.035,l:4.84,g:80.6},{e:0.040,l:5.08,g:79.7},{e:0.045,l:5.32,g:78.7},{e:0.050,l:5.56,g:77.7},{e:0.055,l:5.80,g:76.8}];
  const wi = [{v:'Elec +$0.01/kWh',p:0,n:-5.18},{v:'H₂ ASP -$5/kg',p:0,n:-54},{v:'45V eliminated',p:0,n:-10.8},{v:'2 fewer facilities',p:0,n:-36.3},{v:'H₂ ASP +$5/kg',p:54,n:0},{v:'Elec -$0.015 (PPA)',p:7.76,n:0}];
  const mx = {p:[15,20,25,30,35],f:[3,5,7,10,12],d:[[52.9,88.2,123.5,176.4,211.7],[66.4,110.7,155.0,221.4,265.7],[79.9,133.2,186.5,266.4,319.7],[93.4,155.7,218.0,311.4,373.7],[106.9,178.2,249.5,356.4,427.7]]};
  return <div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
      <Card><SL>LCOH VS ELECTRICITY PRICE</SL><ResponsiveContainer width="100%" height={260}><ComposedChart data={ld}><CartesianGrid strokeDasharray="3 3" stroke={C.gr}/><XAxis dataKey="e" tick={{fill:C.w6,fontSize:10,fontFamily:'monospace'}} tickFormatter={v=>`$${v}`}/><YAxis yAxisId="l" tick={{fill:C.w6,fontSize:11,fontFamily:'monospace'}} tickFormatter={v=>`$${v}`} domain={[4,6]}/><YAxis yAxisId="r" orientation="right" tick={{fill:C.w6,fontSize:11,fontFamily:'monospace'}} tickFormatter={v=>`${v}%`} domain={[74,84]}/><Tooltip content={<CT/>}/><Bar yAxisId="l" dataKey="l" fill={C.o} fillOpacity={0.6} name="LCOH ($/kg)" radius={[4,4,0,0]} barSize={26}/><Line yAxisId="r" type="monotone" dataKey="g" stroke={C.g} strokeWidth={2} dot={{fill:C.g,r:3}} name="GM% at $25"/></ComposedChart></ResponsiveContainer></Card>
      <Card><SL>FY7 EBITDA IMPACT ($M)</SL><ResponsiveContainer width="100%" height={260}><BarChart data={wi} layout="vertical" barSize={16}><CartesianGrid strokeDasharray="3 3" stroke={C.gr}/><XAxis type="number" tick={{fill:C.w6,fontSize:10,fontFamily:'monospace'}} tickFormatter={v=>`${v>0?'+':''}$${v}M`}/><YAxis type="category" dataKey="v" width={150} tick={{fill:C.w6,fontSize:9,fontFamily:'monospace'}}/><Tooltip content={<CT/>}/><Bar dataKey="p" fill={C.g} fillOpacity={0.7} name="+ Impact ($M)" radius={[0,4,4,0]}/><Bar dataKey="n" fill={C.r} fillOpacity={0.7} name="- Impact ($M)" radius={[4,0,0,4]}/></BarChart></ResponsiveContainer></Card>
    </div>
    <Card style={{marginBottom:16}}><SL>BULL / BASE / BEAR — FY7</SL><table style={{width:'100%',borderCollapse:'collapse',fontFamily:'monospace',fontSize:'0.75rem'}}><thead><tr>{['Metric','Bear','Base','Bull'].map(h=><th key={h} style={{color:h==='Base'?C.g:C.w4,textAlign:'left',padding:'8px 14px',borderBottom:`1px solid ${C.w1}`,fontWeight:600}}>{h}</th>)}</tr></thead><tbody>{[['H₂ Price','$15/kg','$25/kg','$35/kg'],['Facilities','6','12','12'],['Revenue','$106.5M','$327.7M','$429.1M'],['EBITDA','$39.4M','$209.4M','$304.6M'],['Net Income','$21.3M','$152.5M','$223.1M']].map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j} style={{color:j===0?C.w6:j===2?C.g:C.w,padding:'7px 14px',borderBottom:`1px solid ${C.w1}`,fontWeight:j===2?600:400}}>{c}</td>)}</tr>)}</tbody></table></Card>
    <Card><SL>PRICE × FACILITY — FY5 REVENUE ($M)</SL><table style={{width:'100%',borderCollapse:'collapse',fontFamily:'monospace',fontSize:'0.7rem'}}><thead><tr><th style={{color:C.w4,padding:7,textAlign:'left'}}>$/kg ↓ Fac →</th>{mx.f.map(f=><th key={f} style={{color:C.w6,padding:7,textAlign:'center'}}>{f}</th>)}</tr></thead><tbody>{mx.p.map((p,pi)=><tr key={pi}><td style={{color:p===25?C.g:C.w6,padding:7,fontWeight:p===25?600:400}}>${p}{p===25?' ★':''}</td>{mx.d[pi].map((v,fi)=>{const isB=p===25&&mx.f[fi]===12;return <td key={fi} style={{padding:7,textAlign:'center',color:isB?C.g:C.w,fontWeight:isB?700:400,background:`rgba(0,255,136,${Math.min(1,v/430)*0.15})`,border:isB?`1px solid ${C.g}40`:'none'}}>${v.toFixed(1)}M</td>})}</tr>)}</tbody></table><div style={{color:C.w4,fontSize:'0.65rem',fontFamily:'monospace',marginTop:10}}>The model works at $15/kg. At $25/kg it prints money.</div></Card>
  </div>;
};

const Tab8 = () => {
  const sh = [{n:'Founders',ps:65.0,s:54.7,v:26000000},{n:'Pre-Seed',ps:14.8,s:12.5,v:5920000},{n:'Options',ps:10.0,s:8.4,v:4000000},{n:'Advisors',ps:2.2,s:1.9,v:880000},{n:'Techstars',ps:6.0,s:5.1,v:2400000},{n:'Other',ps:2.0,s:1.7,v:800000},{n:'Seed (New)',ps:0,s:15.8,v:7500000}];
  const dc = [C.g,C.b,C.o,'#9966ff','#ff66b2',C.w4,C.g];
  const dd = sh.map(s=>({name:s.n,value:s.s}));
  return <div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
      <Card><SL>POST-SEED OWNERSHIP</SL><div style={{display:'flex',alignItems:'center',gap:20}}><ResponsiveContainer width={200} height={200}><PieChart><Pie data={dd} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>{dd.map((_,i)=><Cell key={i} fill={dc[i]}/>)}</Pie></PieChart></ResponsiveContainer><div style={{display:'flex',flexDirection:'column',gap:5}}>{sh.map((s,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:6}}><div style={{width:9,height:9,borderRadius:2,background:dc[i],flexShrink:0}}/><span style={{color:C.w,fontFamily:'monospace',fontSize:'0.68rem'}}>{s.n}: {s.s}%</span></div>)}</div></div></Card>
      <Card><SL>INVESTOR TABLE</SL><table style={{width:'100%',borderCollapse:'collapse',fontFamily:'monospace',fontSize:'0.68rem'}}><thead><tr>{['Shareholder','Pre %','Post %','Value'].map(h=><th key={h} style={{color:C.w4,textAlign:'left',padding:'5px 7px',borderBottom:`1px solid ${C.w1}`}}>{h}</th>)}</tr></thead><tbody>{sh.map((s,i)=><tr key={i}><td style={{color:C.w,padding:'5px 7px',borderBottom:`1px solid ${C.w1}`}}>{s.n}</td><td style={{color:C.w6,padding:'5px 7px',borderBottom:`1px solid ${C.w1}`}}>{s.ps>0?`${s.ps}%`:'—'}</td><td style={{color:C.w,padding:'5px 7px',borderBottom:`1px solid ${C.w1}`,fontWeight:600}}>{s.s}%</td><td style={{color:C.g,padding:'5px 7px',borderBottom:`1px solid ${C.w1}`}}>{fmt(s.v)}</td></tr>)}</tbody></table></Card>
    </div>
    <Card><SL>EXIT VALUATION — SEED RETURNS (FY7)</SL><table style={{width:'100%',borderCollapse:'collapse',fontFamily:'monospace',fontSize:'0.72rem'}}><thead><tr>{['Basis','Multiple','EV ($M)','Seed Value','ROI'].map(h=><th key={h} style={{color:C.w4,textAlign:'left',padding:'7px 12px',borderBottom:`1px solid ${C.w1}`}}>{h}</th>)}</tr></thead><tbody>{[{b:'Revenue (Bear)',m:'8x',e:2621,s:283,r:28.3},{b:'Revenue (Base)',m:'10x',e:3277,s:354,r:35.4},{b:'Revenue (Bull)',m:'12x',e:3932,s:425,r:42.5},{b:'EBITDA (Bear)',m:'15x',e:3141,s:339,r:33.9},{b:'EBITDA (Base)',m:'20x',e:4189,s:452,r:45.2},{b:'EBITDA (Bull)',m:'25x',e:5236,s:565,r:56.5}].map((e,i)=><tr key={i}><td style={{color:C.w,padding:'7px 12px',borderBottom:`1px solid ${C.w1}`}}>{e.b}</td><td style={{color:C.o,padding:'7px 12px',borderBottom:`1px solid ${C.w1}`}}>{e.m}</td><td style={{color:C.w6,padding:'7px 12px',borderBottom:`1px solid ${C.w1}`}}>${e.e.toLocaleString()}M</td><td style={{color:C.g,padding:'7px 12px',borderBottom:`1px solid ${C.w1}`,fontWeight:600}}>${e.s}M</td><td style={{color:C.g,padding:'7px 12px',borderBottom:`1px solid ${C.w1}`,fontWeight:700,textShadow:`0 0 10px ${C.g}30`}}>{e.r}x</td></tr>)}</tbody></table><div style={{color:C.w4,fontSize:'0.65rem',fontFamily:'monospace',marginTop:12,lineHeight:1.5}}>Model shows 12 targeted facilities. Domestic market supports 100+ sites. International expansion not modeled. Additional capital may be raised to accelerate beyond base plan.</div></Card>
  </div>;
};

export default function InvestorDashboard() {
  const [tab, setTab] = useState(0);
  const tabs = useMemo(() => [<Tab1 key={0}/>,<Tab2 key={1}/>,<Tab3 key={2}/>,<Tab4 key={3}/>,<Tab5 key={4}/>,<Tab6 key={5}/>,<Tab7 key={6}/>,<Tab8 key={7}/>], []);

  return (
    <div style={{background:C.bg,minHeight:'100vh',color:C.w,fontFamily:'"Courier New",monospace',padding:'20px 24px'}}>
      <div style={{marginBottom:20,display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
        <div>
          <div style={{color:C.o,fontSize:'0.6rem',letterSpacing:'0.2em',textTransform:'uppercase',fontWeight:600}}>TOBE ENERGY CORP — INVESTOR DATA ROOM</div>
          <div style={{color:C.w,fontSize:'1.3rem',fontWeight:700,marginTop:3}}>Financial Model Dashboard</div>
          <div style={{color:C.w4,fontSize:'0.65rem',marginTop:2}}>Seed Round — $10M at $40M Pre · Membrane-Free Green H₂</div>
        </div>
        <div style={{color:C.w4,fontSize:'0.6rem',textAlign:'right'}}><div>March 2026 · v1.0</div><div>CONFIDENTIAL</div></div>
      </div>
      <div style={{display:'flex',gap:2,marginBottom:24,overflowX:'auto',borderBottom:`1px solid ${C.w1}`}}>
        {TABS.map((t,i)=><button key={i} onClick={()=>setTab(i)} style={{background:tab===i?`${C.o}20`:'transparent',border:'none',borderBottom:tab===i?`2px solid ${C.o}`:'2px solid transparent',color:tab===i?C.o:C.w4,fontFamily:'monospace',fontSize:'0.6rem',fontWeight:600,padding:'8px 12px',cursor:'pointer',letterSpacing:'0.08em',textTransform:'uppercase',whiteSpace:'nowrap',transition:'all 0.2s'}}>{t}</button>)}
      </div>
      {tabs[tab]}
      <div style={{marginTop:40,paddingTop:12,borderTop:`1px solid ${C.w1}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{color:C.w4,fontSize:'0.6rem',fontFamily:'monospace'}}>All figures from Financial Model FINAL.xlsx · Sources: TEA v3.0, v8.5.3 Model, OU Irani Center</div>
        <a href="#" style={{color:C.o,fontSize:'0.65rem',fontFamily:'monospace',textDecoration:'none',border:`1px solid ${C.o}40`,padding:'5px 12px',borderRadius:4}}>[Download Model (.xlsx)]</a>
      </div>
    </div>
  );
}
