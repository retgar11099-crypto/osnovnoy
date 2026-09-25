import { useState, useEffect } from 'react'

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`

function ServerCard({
  code,
  title,
  subtitle,
  desc,
  tag,
  href,
  accentColor,
  glowColor,
  statusLabel,
  floatDelay,
  stripe,
}: {
  code: string
  title: string
  subtitle: string
  desc: string
  tag: string
  href?: string
  accentColor: string
  glowColor: string
  statusLabel: string
  floatDelay: string
  stripe?: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ animation: `float-soft 9s ease-in-out infinite`, animationDelay: floatDelay }}>
    <a
      href={href ?? '#'}
      target={href ? '_blank' : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        background: 'linear-gradient(160deg, #1a2336 0%, #141b2c 100%)',
        border: `1px solid ${hovered ? accentColor + '99' : '#253048'}`,
        borderRadius: '18px',
        padding: '0',
        overflow: 'hidden',
        transition: 'border-color 0.5s ease, box-shadow 0.5s ease, transform 0.5s ease',
        boxShadow: hovered
          ? `0 28px 70px -20px ${glowColor}, 0 0 0 1px ${accentColor}22, inset 0 1px 0 ${accentColor}22`
          : '0 18px 46px -26px rgba(0,0,0,0.6)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        position: 'relative',
      }}
    >
      {/* soft ambient glow that warms on hover */}
      <div
        style={{
          position: 'absolute',
          top: '-40%',
          left: '50%',
          width: '120%',
          height: '80%',
          transform: 'translateX(-50%)',
          background: `radial-gradient(ellipse at center, ${accentColor}, transparent 70%)`,
          opacity: hovered ? 0.16 : 0.06,
          filter: 'blur(30px)',
          transition: 'opacity 0.6s ease',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* caution-tape stripe for zomboid card */}
      {stripe && (
        <div
          style={{
            height: '5px',
            background: 'repeating-linear-gradient(135deg, #f0c93a 0px, #f0c93a 12px, #1a1507 12px, #1a1507 24px)',
            opacity: 0.85,
          }}
        />
      )}

      {/* top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 22px',
          borderBottom: `1px solid ${hovered ? accentColor + '33' : '#1a2236'}`,
          transition: 'border-color 0.5s ease',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#5a6484', letterSpacing: '0.14em' }}>
          {code}
        </span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            fontFamily: 'JetBrains Mono',
            fontSize: '10px',
            color: accentColor,
            letterSpacing: '0.12em',
          }}
        >
          <span style={{ position: 'relative', display: 'inline-flex', width: '7px', height: '7px' }}>
            <span
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: accentColor,
                animation: 'gentle-pulse 3s ease-in-out infinite',
              }}
            />
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: accentColor }} />
          </span>
          {statusLabel}
        </span>
      </div>

      {/* content */}
      <div style={{ padding: '30px 26px 28px', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '11px',
            color: accentColor,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: '14px',
            opacity: 0.85,
          }}
        >
          {tag}
        </div>

        <h2
          style={{
            fontFamily: 'Outfit',
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 700,
            color: '#e6ecfb',
            margin: '0 0 6px',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontFamily: 'Outfit',
            fontSize: '14px',
            fontWeight: 300,
            color: '#5a6484',
            margin: '0 0 22px',
            letterSpacing: '0.04em',
          }}
        >
          {subtitle}
        </p>

        <p style={{ fontFamily: 'Outfit', fontSize: '15px', color: '#8b95b4', margin: '0 0 30px', lineHeight: 1.75 }}>
          {desc}
        </p>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'JetBrains Mono',
            fontSize: '12px',
            color: hovered ? accentColor : '#5a6484',
            transition: 'color 0.35s ease',
            letterSpacing: '0.1em',
            padding: '9px 18px',
            borderRadius: '999px',
            border: `1px solid ${hovered ? accentColor + '55' : '#20293f'}`,
            background: hovered ? accentColor + '12' : 'transparent',
          }}
        >
          <span>ПЕРЕЙТИ</span>
          <span style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.35s ease' }}>
            →
          </span>
        </div>
      </div>
    </a>
    </div>
  )
}

export default function App() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('ru-RU', { hour12: false }))

  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString('ru-RU', { hour12: false })), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #10162400 0%, #0e131f 100%), radial-gradient(ellipse 90% 70% at 50% 0%, #172136 0%, #0e131f 60%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'clamp(48px, 8vw, 88px) clamp(20px, 5vw, 60px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* slow-drifting aurora field */}
      <div
        style={{
          position: 'fixed',
          inset: '-20%',
          background:
            'radial-gradient(ellipse 50% 45% at 28% 18%, rgba(119,212,224,0.13), transparent 62%), radial-gradient(ellipse 45% 40% at 78% 32%, rgba(232,183,132,0.10), transparent 62%), radial-gradient(ellipse 65% 55% at 50% 92%, rgba(110,140,220,0.11), transparent 66%)',
          animation: 'aurora-drift 26s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* fine grain */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: NOISE_SVG,
          backgroundRepeat: 'repeat',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* soft vignette */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          boxShadow: 'inset 0 0 260px 40px rgba(6,9,18,0.55)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* top status bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '11px 26px',
          borderBottom: '1px solid rgba(32,41,63,0.6)',
          background: 'rgba(11,15,25,0.6)',
          backdropFilter: 'blur(12px)',
          zIndex: 50,
        }}
      >
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#4a5474', letterSpacing: '0.12em' }}>
          NEXUS // HUB-NODE
        </span>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#4a5474', letterSpacing: '0.1em' }}>
          {time}
        </span>
      </div>

      <div style={{ width: '100%', maxWidth: '900px', paddingTop: '40px', position: 'relative', zIndex: 2 }}>
        {/* header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(52px, 8vw, 80px)' }}>
          <div
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '11px',
              color: '#e0a86a',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              marginBottom: '24px',
              animation: 'soft-breathe 6s ease-in-out infinite',
            }}
          >
            ◇ &nbsp; GAMING NETWORK &nbsp; ◇
          </div>
          <h1
            style={{
              fontFamily: 'Outfit',
              fontSize: 'clamp(44px, 9vw, 80px)',
              fontWeight: 700,
              color: '#edf1fb',
              margin: '0 0 18px',
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              textShadow: '0 0 70px rgba(119,212,224,0.28)',
            }}
          >
            NEXUS
          </h1>
          <p
            style={{
              fontFamily: 'Outfit',
              fontSize: 'clamp(15px, 2vw, 18px)',
              fontWeight: 300,
              color: '#6a7498',
              margin: 0,
              letterSpacing: '0.05em',
            }}
          >
            Центральный узел — выбери направление
          </p>

          {/* decorative line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '36px', justifyContent: 'center' }}>
            <div style={{ flex: 1, maxWidth: '140px', height: '1px', background: 'linear-gradient(to left, #2a3654, transparent)' }} />
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#4a5474', letterSpacing: '0.18em' }}>
              SELECT SERVER
            </span>
            <div style={{ flex: 1, maxWidth: '140px', height: '1px', background: 'linear-gradient(to right, #2a3654, transparent)' }} />
          </div>
        </div>

        {/* cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '24px',
            marginBottom: '56px',
          }}
        >
          <ServerCard
            code="SRV-001 // SCX"
            title="RU, EU (SCX)"
            href="https://retgar11099-crypto.github.io/barotrauma/"
            subtitle="Barotrauma — Clown Voyages"
            desc="Сервер про путешествия клоунов с элементами РП-тематики. Заходи — мы тебя ждём."
            tag="// Roleplay Voyage"
            accentColor="#77d4e0"
            glowColor="rgba(119,212,224,0.35)"
            statusLabel="ONLINE"
            floatDelay="0s"
          />
          <ServerCard
            code="SRV-002 // PRTCL"
            title="Protocol D7"
            href="https://retgar11099-crypto.github.io/d7/"
            subtitle="Minecraft — Tech, Horror & Anomalies"
            desc="Сервер по Minecraft с технологиями, элементами хоррора и аномалий. Заходи — мы тебя ждём."
            tag="// Tech Horror"
            accentColor="#e8b784"
            glowColor="rgba(232,183,132,0.32)"
            statusLabel="ONLINE"
            floatDelay="-4.5s"
          />
          <ServerCard
            code="SRV-003 // MNTN"
            title="Prodject Mantani"
            href="https://retgar11099-crypto.github.io/project-zomboid/"
            subtitle="Project Zomboid — Survival"
            desc="Сервер по Project Zomboid. Выживи в мире мертвецов — каждый день на счету."
            tag="// Survival Horror"
            accentColor="#f0c93a"
            glowColor="rgba(240,201,58,0.32)"
            statusLabel="ONLINE"
            floatDelay="-2s"
            stripe
          />
        </div>

        {/* footer */}
        <div
          style={{
            borderTop: '1px solid rgba(26,34,54,0.8)',
            paddingTop: '28px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '28px',
            flexWrap: 'wrap',
          }}
        >
          {['ДОКУМЕНТЫ', 'ПРАВИЛА', 'DISCORD', 'КОНТАКТЫ'].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '10px',
                color: '#4a5474',
                textDecoration: 'none',
                letterSpacing: '0.16em',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#8b95b4')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#4a5474')}
            >
              {item}
            </a>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '18px' }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#2a3450', letterSpacing: '0.12em' }}>
            NEXUS HUB // v1.0.0 // {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </div>
  )
}
