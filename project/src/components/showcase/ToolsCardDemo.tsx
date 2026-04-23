import { ToolsCard } from "@/components/ui/tools-card"

export function ToolsCardDemo() {
  return (
    <div className="flex items-center justify-center bg-muted/30 p-8 w-full min-h-[500px]">
      <ToolsCard />
    </div>
  )
}

// ─── Source code string (shown in Code tab) ───────────────────────────────────
export const toolsCardCode = `"use client"

import { useEffect, useRef, useState, useCallback } from "react"

// ── Google Fonts ──────────────────────────────────────────────────────────────
function useGoogleFonts() {
  useEffect(() => {
    const id = "tools-card-gfonts"
    if (document.getElementById(id)) return
    const link = document.createElement("link")
    link.id = id; link.rel = "stylesheet"
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
    document.head.appendChild(link)
  }, [])
}

const FONTS = {
  syne:   "'Syne', sans-serif",
  grotesk:"'Space Grotesk', sans-serif",
  mono:   "'Space Mono', monospace",
}

const TOOLS = [
  { name:"React",      role:"ui framework",  bg:"#0d1b2a", fg:"#61dafb", letter:"R"  },
  { name:"TypeScript", role:"type safety",   bg:"#0d1a30", fg:"#3b82f6", letter:"TS" },
  { name:"Tailwind",   role:"styling",       bg:"#051a2a", fg:"#38bdf8", letter:"TW" },
  { name:"Next.js",    role:"app framework", bg:"#111",    fg:"#e5e5e5", letter:"N"  },
  { name:"Framer",     role:"motion",        bg:"#100a1e", fg:"#a78bfa", letter:"FM" },
  { name:"Figma",      role:"design",        bg:"#130a1e", fg:"#c084fc", letter:"FG" },
  { name:"Supabase",   role:"database",      bg:"#061a0f", fg:"#34d399", letter:"SB" },
  { name:"Vercel",     role:"deploy",        bg:"#111",    fg:"#d4d4d4", letter:"VC" },
  { name:"shadcn",     role:"components",    bg:"#111",    fg:"#a1a1aa", letter:"SC" },
  { name:"Prisma",     role:"orm",           bg:"#0a1020", fg:"#818cf8", letter:"PR" },
  { name:"pnpm",       role:"packages",      bg:"#1a0e00", fg:"#fb923c", letter:"PN" },
  { name:"Zod",        role:"validation",    bg:"#061a08", fg:"#4ade80", letter:"ZD" },
]

const NEON = [
  [0,200,255],[160,0,255],[255,50,170],[0,255,160],[255,170,0],[120,80,255]
]
function randomNeon() { return NEON[Math.floor(Math.random()*NEON.length)] }
function lerp(a,b,t) { return a+(b-a)*t }

// ── Canvas ────────────────────────────────────────────────────────────────────
function BannerCanvas({ bannerRef }) {
  const canvasRef = useRef(null)
  const dotsRef   = useRef([])
  const mouseRef  = useRef(null)
  const rafRef    = useRef(0)
  const lastTRef  = useRef(0)
  const visRef    = useRef(true)

  const buildDots = useCallback((w, h) => {
    const gap = 10, dots = []
    const cols = Math.ceil(w/gap)+1, rows = Math.ceil(h/gap)+1
    for (let row=0; row<rows; row++) {
      const stagger = row%2===0 ? 0 : gap/2
      for (let col=0; col<cols; col++) {
        dots.push({
          x: col*gap+stagger, y: row*gap,
          phase: Math.random()*Math.PI*2,
          speed: 0.06+Math.random()*0.18,
          hoverAmt:0, colorFrom:randomNeon(), colorTo:randomNeon(),
          colorT:Math.random(), colorSpeed:0.4+Math.random()*0.4,
        })
      }
    }
    return dots
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let W=0,H=0,dpr=window.devicePixelRatio||1
    const resize = () => {
      dpr=window.devicePixelRatio||1
      const r=canvas.getBoundingClientRect(); W=r.width; H=r.height
      canvas.width=W*dpr; canvas.height=H*dpr; ctx.scale(dpr,dpr)
      dotsRef.current=buildDots(W,H)
    }
    const ro=new ResizeObserver(resize); ro.observe(canvas); resize()
    const io=new IntersectionObserver(([e])=>{visRef.current=e.isIntersecting},{threshold:0})
    io.observe(canvas)
    const banner=bannerRef.current??canvas
    const onMM=(e)=>{const r=canvas.getBoundingClientRect();mouseRef.current={x:e.clientX-r.left,y:e.clientY-r.top}}
    const onML=()=>{mouseRef.current=null}
    const onTM=(e)=>{const r=canvas.getBoundingClientRect(),t=e.touches[0];mouseRef.current={x:t.clientX-r.left,y:t.clientY-r.top}}
    const onTE=()=>{mouseRef.current=null}
    banner.addEventListener("mousemove",onMM)
    banner.addEventListener("mouseleave",onML)
    banner.addEventListener("touchmove",onTM,{passive:true})
    banner.addEventListener("touchend",onTE)
    const HR=48,BASE=[160,160,180]
    const draw=(ts)=>{
      rafRef.current=requestAnimationFrame(draw)
      if(!visRef.current) return
      const dt=Math.min((ts-lastTRef.current)/1000,0.1); lastTRef.current=ts
      ctx.clearRect(0,0,W,H)
      const mouse=mouseRef.current, hw=W/2, hh=H/2, axW=W*0.52, axH=H*0.52
      for(const dot of dotsRef.current){
        const nx=(dot.x-hw)/axW, ny=(dot.y-hh)/axH
        const ell=Math.sqrt(nx*nx+ny*ny)
        const vig=Math.pow(Math.max(0,1-ell/0.52),1.6); if(vig<=0) continue
        dot.phase+=dot.speed*dt
        const shimmer=0.5+0.5*Math.sin(dot.phase)
        const inHov=mouse&&(dot.x-mouse.x)**2+(dot.y-mouse.y)**2<HR*HR
        dot.hoverAmt=lerp(dot.hoverAmt,inHov?1:0,dt*9)
        if(dot.hoverAmt>0.01){
          dot.colorT+=dot.colorSpeed*dt
          if(dot.colorT>=1){dot.colorFrom=dot.colorTo;dot.colorTo=randomNeon();dot.colorT=0}
        }
        const h=dot.hoverAmt
        let r,g,b
        if(h>0.01){
          const c=[lerp(dot.colorFrom[0],dot.colorTo[0],dot.colorT),lerp(dot.colorFrom[1],dot.colorTo[1],dot.colorT),lerp(dot.colorFrom[2],dot.colorTo[2],dot.colorT)]
          r=lerp(BASE[0],c[0],h); g=lerp(BASE[1],c[1],h); b=lerp(BASE[2],c[2],h)
        } else { r=BASE[0]; g=BASE[1]; b=BASE[2] }
        const dotAlpha=vig*lerp(lerp(0.35,0.65,shimmer),1.0,h)
        const dotR=1.5+h*1.8
        if(h>0.02){
          ctx.save(); ctx.shadowBlur=h*16
          ctx.shadowColor=\`rgba(\${Math.round(r)},\${Math.round(g)},\${Math.round(b)},\${(dotAlpha*h).toFixed(3)})\`
          ctx.beginPath(); ctx.arc(dot.x,dot.y,dotR,0,Math.PI*2)
          ctx.fillStyle=\`rgba(\${Math.round(r)},\${Math.round(g)},\${Math.round(b)},\${dotAlpha.toFixed(3)})\`
          ctx.fill(); ctx.restore()
        } else {
          ctx.beginPath(); ctx.arc(dot.x,dot.y,dotR,0,Math.PI*2)
          ctx.fillStyle=\`rgba(\${Math.round(r)},\${Math.round(g)},\${Math.round(b)},\${dotAlpha.toFixed(3)})\`
          ctx.fill()
        }
      }
    }
    lastTRef.current=performance.now(); rafRef.current=requestAnimationFrame(draw)
    return()=>{cancelAnimationFrame(rafRef.current);ro.disconnect();io.disconnect();
      banner.removeEventListener("mousemove",onMM);banner.removeEventListener("mouseleave",onML);
      banner.removeEventListener("touchmove",onTM);banner.removeEventListener("touchend",onTE)}
  },[buildDots,bannerRef])

  return <canvas ref={canvasRef} aria-hidden="true" style={{position:"absolute",inset:0,width:"100%",height:"100%"}} />
}

// ── Tool chip ─────────────────────────────────────────────────────────────────
function ToolChip({tool}) {
  const [hovered,setHovered]=useState(false)
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{borderRadius:12,padding:"9px 10px",
        border:\`0.5px solid \${hovered?"rgba(255,255,255,0.18)":"rgba(255,255,255,0.07)"}\`,
        background:hovered?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.025)",
        display:"flex",alignItems:"flex-start",gap:8,position:"relative",cursor:"default",
        transition:"border-color 0.15s,background 0.15s"}}>
      <div style={{position:"absolute",top:7,right:8,width:5,height:5,borderRadius:"50%",
        background:tool.fg,boxShadow:\`0 0 6px \${tool.fg}\`,opacity:hovered?1:0,transition:"opacity 0.2s"}} />
      <div style={{width:28,height:28,borderRadius:7,background:tool.bg,display:"flex",alignItems:"center",
        justifyContent:"center",flexShrink:0,border:"0.5px solid rgba(255,255,255,0.08)"}}>
        <span style={{fontFamily:"'Space Mono',monospace",fontSize:9,fontWeight:700,color:tool.fg}}>{tool.letter}</span>
      </div>
      <div style={{minWidth:0}}>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:12,fontWeight:600,color:"#e2e2e2",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{tool.name}</div>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:10,fontWeight:300,color:"#666",textTransform:"lowercase"}}>{tool.role}</div>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function ToolsCard({className=""}) {
  useGoogleFonts()
  const bannerRef=useRef(null)
  return (
    <div className={className} style={{maxWidth:560,width:"100%",borderRadius:24,
      border:"0.5px solid",borderColor:"color-mix(in srgb,currentColor 12%,transparent)",overflow:"hidden"}}>
      <div ref={bannerRef} style={{height:210,background:"#080808",position:"relative",overflow:"hidden"}}>
        <BannerCanvas bannerRef={bannerRef} />
        <div style={{position:"absolute",bottom:20,left:24,zIndex:10}}>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:"#555",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:6}}>// our-stack.ts</div>
          <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:32,fontWeight:800,letterSpacing:"-0.03em",color:"#f0f0f0",lineHeight:1.1,margin:0}}>
            built <span style={{color:"#555"}}>with</span> intention<span style={{color:"#555"}}>.</span>
          </h1>
          <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:12,fontWeight:300,color:"#555",marginTop:6,marginBottom:0}}>every tool, handpicked ✦</p>
        </div>
      </div>
      <div className="bg-background border-t border-border" style={{padding:"1.25rem 1.5rem 1.5rem"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
          <span className="text-muted-foreground" style={{fontFamily:"'Space Mono',monospace",fontSize:9,textTransform:"uppercase",letterSpacing:"0.12em"}}>// stack</span>
          <span className="text-foreground" style={{fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700}}>{TOOLS.length} tools</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(118px,1fr))",gap:7,marginBottom:20}}>
          {TOOLS.map(t=><ToolChip key={t.name} tool={t}/>)}
        </div>
        <div className="border-t border-border" style={{marginBottom:16}}/>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div className="text-foreground" style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,lineHeight:1}}>v2.4</div>
            <div className="text-muted-foreground" style={{fontFamily:"'Space Mono',monospace",fontSize:9,textTransform:"uppercase",letterSpacing:"0.12em",marginTop:3}}>current release</div>
          </div>
          <div className="border border-border bg-muted/40" style={{display:"inline-flex",alignItems:"center",gap:6,borderRadius:999,padding:"6px 12px"}}>
            <span style={{position:"relative",display:"flex",alignItems:"center"}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:"#22c55e",display:"block"}}/>
              <span style={{position:"absolute",width:7,height:7,borderRadius:"50%",background:"#22c55e",animation:"tools-ping 1.4s cubic-bezier(0,0,0.2,1) infinite"}}/>
            </span>
            <span className="text-foreground" style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:11,fontWeight:500}}>actively shipping</span>
          </div>
        </div>
      </div>
      <style>{\`@keyframes tools-ping{75%,100%{transform:scale(2);opacity:0}}\`}</style>
    </div>
  )
}`
