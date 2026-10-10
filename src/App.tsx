import { useState, useEffect } from 'react'

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`

const NAV_LINKS = [
  { label: 'BAROTRAUMA', href: 'https://retgar11099-crypto.github.io/barotrauma/' },
  { label: 'SKYHOLD', href: 'https://retgar11099-crypto.github.io/skyhold/' },
  { label: 'MANTANI', href: 'https://retgar11099-crypto.github.io/project-zomboid/' },
  { label: 'DSV-ZOMBI', href: 'https://retgar11099-crypto.github.io/dsv-zombi/' },
  { label: 'DISCORD', href: 'https://discord.gg/tqhwNTZgf3' },
]

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
  revealDelay,
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
  revealDelay: string
  stripe?: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ animation: `card-reveal 0.9s cubic-bezier(0.22, 0.9, 0.32, 1) both`, animationDelay: revealDelay }}>
      <div style={{ animation: `float-soft 9s ease-in-out infinite`, animationDelay: floatDelay }}>
    <a
      href={href ?? '#'}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
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
    </div>
  )
}

export default function App() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('ru-RU', { hour12: false }))
  const [menuOpen, setMenuOpen] = useState(false)
  const [splash, setSplash] = useState(true)
  const [splashFade, setSplashFade] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString('ru-RU', { hour12: false })), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!splash) return
    const fade = setTimeout(() => setSplashFade(true), 1100)
    const done = setTimeout(() => setSplash(false), 1700)
    return () => { clearTimeout(fade); clearTimeout(done) }
  }, [splash])

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
        isolation: 'isolate',
      }}
    >
      {/* animated wall background */}
      <div className="nexus-bg" aria-hidden="true" />

      {/* splash / заставка при заходе */}
      {splash && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            background: 'radial-gradient(ellipse 80% 60% at 50% 42%, #172136 0%, #0a0e18 72%)',
            transition: 'opacity 0.55s ease',
            opacity: splashFade ? 0 : 1,
            pointerEvents: splashFade ? 'none' : 'auto',
          }}
        >
          <div style={{ fontFamily: 'Outfit', fontSize: 'clamp(64px, 16vw, 96px)', fontWeight: 700, color: '#edf1fb', letterSpacing: '-0.03em', lineHeight: 1 }}>
            NEXUS
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '10px' }}>
            <div style={{ width: '44px', height: '1px', background: 'linear-gradient(to left, #e0a86a, transparent)' }} />
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', letterSpacing: '0.28em', color: '#e0a86a', textTransform: 'uppercase' }}>
              HUB-NODE
            </span>
            <div style={{ width: '44px', height: '1px', background: 'linear-gradient(to right, #e0a86a, transparent)' }} />
          </div>
          <div style={{ display: 'flex', gap: '7px', marginTop: '28px' }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#77d4e0', animation: `splash-dot 1.1s ease-in-out ${i * 0.18}s infinite` }} />
            ))}
          </div>
        </div>
      )}

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#4a5474', letterSpacing: '0.1em' }}>
            {time}
          </span>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Меню"
            style={{ flexDirection: 'column', gap: '4px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px' }}
          >
            <span style={{ width: '18px', height: '2px', background: '#8b95b4', display: 'block' }} />
            <span style={{ width: '18px', height: '2px', background: '#8b95b4', display: 'block' }} />
            <span style={{ width: '18px', height: '2px', background: '#8b95b4', display: 'block' }} />
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 49 }} onClick={() => setMenuOpen(false)} />
          <div
            style={{
              position: 'fixed',
              top: '49px',
              right: '14px',
              zIndex: 55,
              background: '#0d1322',
              border: '1px solid #253048',
              borderRadius: '12px',
              padding: '8px',
              minWidth: '230px',
              boxShadow: '0 24px 60px -20px rgba(0,0,0,0.7)',
              animation: 'menu-in 0.18s ease',
            }}
          >
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.background = '#16203a' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'transparent' }}
                style={{
                  display: 'block',
                  padding: '11px 14px',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '11px',
                  color: '#8b95b4',
                  textDecoration: 'none',
                  letterSpacing: '0.14em',
                  borderRadius: '8px',
                  transition: 'background 0.2s ease',
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </>
      )}

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
            subtitle="Barotrauma — Clown Voyages"
            desc="Сервер про путешествия клоунов с элементами РП-тематики. Заходи — мы тебя ждём."
            tag="// Roleplay Voyage"
            accentColor="#77d4e0"
            glowColor="rgba(119,212,224,0.35)"
            statusLabel="ONLINE"
            floatDelay="0s"
            revealDelay="1.2s"
            href="https://retgar11099-crypto.github.io/barotrauma/"
          />
          <ServerCard
            code="SRV-002 // SKYH"
            title="SkyHold"
            subtitle="Minecraft — Хроники Джандара"
            desc="Тёмный ролевой мир, где смерть не освобождает. Читай лор, вступай в Discord и подавай анкету."
            tag="// Fantasy Roleplay"
            accentColor="#c7a15a"
            glowColor="rgba(199,161,90,0.32)"
            statusLabel="ONLINE"
            floatDelay="-4.5s"
            revealDelay="1.32s"
            href="https://retgar11099-crypto.github.io/skyhold/"
          />
          <ServerCard
            code="SRV-003 // MNTN"
            title="Prodject Mantani"
            subtitle="Project Zomboid — Survival"
            desc="Сервер по Project Zomboid. Выживи в мире мертвецов — каждый день на счету."
            tag="// Survival Horror"
            accentColor="#f0c93a"
            glowColor="rgba(240,201,58,0.32)"
            statusLabel="ONLINE"
            floatDelay="-2s"
            revealDelay="1.44s"
            stripe
            href="https://retgar11099-crypto.github.io/project-zomboid/"
          />
          <ServerCard
            code="SRV-004 // DSV"
            title="DSV-Zombi"
            subtitle="Project Zomboid — Survival"
            desc="Мир после катастрофы, где припасы на исходе, а безопасных мест почти не осталось. Собери команду и выживи."
            tag="// Zombie Survival"
            accentColor="#91c7a5"
            glowColor="rgba(145,199,165,0.3)"
            statusLabel="ONLINE"
            floatDelay="-6.5s"
            revealDelay="1.56s"
            href="https://retgar11099-crypto.github.io/dsv-zombi/"
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
              href={item === 'DISCORD' ? 'https://discord.gg/tqhwNTZgf3' : '#'}
              target={item === 'DISCORD' ? '_blank' : undefined}
              rel={item === 'DISCORD' ? 'noopener noreferrer' : undefined}
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
