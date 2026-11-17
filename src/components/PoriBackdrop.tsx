import { useEffect } from 'react'

export function PoriBackdrop() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = window.scrollY
        document.documentElement.style.setProperty('--pori-slow', `${y * 0.06}px`)
        document.documentElement.style.setProperty('--pori-mid', `${y * 0.12}px`)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#0c0c0c]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,16,46,0.22),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(242,183,5,0.08),transparent_50%)]" />
      <div className="pori-slow absolute inset-x-0 top-0 h-[140%]">
        <PoriScenery />
      </div>
      <div className="pori-mid absolute inset-x-0 bottom-0 h-64 opacity-80">
        <Dunes />
      </div>
    </div>
  )
}

function PoriScenery() {
  return (
    <svg viewBox="0 0 1440 900" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <g fill="#f2b705" opacity="0.09">
        <path d="M40 210c40 18 70-20 120-8 36 8 48 28 90 22 40-6 52-30 96-24 48 6 60 34 110 26 42-6 70-28 112-16 36 10 48 32 92 26 50-8 62-36 118-28 40 6 64 24 104 16 44-8 60-30 108-22v80H40Z" />
        <path d="M900 160c50 20 80-10 130 4 42 12 54 36 104 28 46-8 70-30 120-18 40 10 70 8 110-6v70H900Z" />
      </g>
      <path
        d="M-20 430c120 30 180-40 300-10 90 22 140-28 240-6 110 24 160-36 280-8 100 22 150-20 250 6 90 24 160-16 250 10 80 22 140-8 220 12v40H-20Z"
        fill="#c8102e"
        opacity="0.08"
      />
      <path
        d="M0 520c80-30 140 20 230 8 100-14 130-48 220-30 110 22 150-10 250 8 90 16 120-24 210-8 100 18 140-12 230 6 70 14 120-8 180 4"
        fill="none"
        stroke="#f2b705"
        strokeWidth="8"
        opacity="0.12"
      />
      <g fill="#f6f3ec" opacity="0.07" transform="translate(980 250)">
        <path d="M70 10c8 20 6 40-2 52 16 4 28 16 30 32 2 18-10 28-24 30l-8 46c18 6 28 20 24 36-6 22-36 28-58 16l-6 28H8l10-36c-16-8-22-26-12-42 8-12 24-16 40-12l6-42c-14-6-24-20-22-36 2-18 18-30 36-30 6 0 8-6 6-12Z" />
        <circle cx="78" cy="18" r="7" />
      </g>
      <g fill="#f6f3ec" opacity="0.08" transform="translate(1180 460)">
        <path d="M20 90h120v16H20Z" />
        <path d="M36 90V48h88v42" />
        <path d="M48 48c18-28 46-28 64 0" />
        <rect x="78" y="62" width="10" height="16" />
      </g>
      <g fill="#f2b705" opacity="0.1" transform="translate(160 380)">
        <rect x="46" y="24" width="28" height="78" />
        <path d="M40 28 60 4l20 24" />
        <circle cx="60" cy="48" r="7" fill="#0c0c0c" />
        <rect x="8" y="70" width="104" height="18" />
        <rect x="20" y="88" width="16" height="14" />
        <rect x="84" y="88" width="16" height="14" />
      </g>
      <g fill="#f6f3ec" opacity="0.06" transform="translate(430 300)">
        <ellipse cx="28" cy="22" rx="12" ry="10" />
        <path d="M16 30c2 18 6 28 4 46H10l2 16h28l2-16h-8c-2-16 2-30 6-46" />
        <path d="M10 18h36l-4 8H14Z" />
      </g>
      <g stroke="#f2b705" fill="none" opacity="0.16" strokeLinecap="round" transform="translate(70 620)">
        <path d="M18 8c40 10 70 46 78 92" strokeWidth="7" />
        <path d="M86 96c18 8 28 6 36-4 6-8 2-16-8-18" strokeWidth="6" />
        <ellipse cx="28" cy="132" rx="16" ry="7" fill="#c8102e" stroke="none" opacity="0.7" />
      </g>
      <g fill="#f2b705" opacity="0.18">
        <circle cx="220" cy="120" r="10" />
        <circle cx="280" cy="86" r="6" />
        <circle cx="1240" cy="140" r="12" />
        <circle cx="1320" cy="210" r="7" />
        <circle cx="760" cy="70" r="5" />
      </g>
      <g fill="#c8102e" opacity="0.16">
        <circle cx="190" cy="160" r="4" />
        <circle cx="1180" cy="100" r="5" />
        <circle cx="860" cy="130" r="3" />
      </g>
    </svg>
  )
}

function Dunes() {
  return (
    <svg viewBox="0 0 1440 240" className="h-full w-full" preserveAspectRatio="none">
      <path
        d="M0 120c80 40 140-20 240 10 90 28 130-36 230-8 110 30 150-24 260 6 100 28 150-20 250 8 120 34 160-30 270 0 70 18 120-8 190 6v98H0Z"
        fill="#c8102e"
        opacity="0.16"
      />
      <path
        d="M0 160c100 24 160-28 270-4 90 20 140-16 230 6 120 28 170-22 280 4 100 24 150-10 240 12 90 20 140-12 220 8 70 16 120 4 200 18v36H0Z"
        fill="#f2b705"
        opacity="0.1"
      />
    </svg>
  )
}
