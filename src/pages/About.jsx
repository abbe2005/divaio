import './About.css';

const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/di_vaio_boutique_27?igsh=aWRlamkzMXZpajFn',
  tiktok:    'https://www.tiktok.com/@boutique_divaio?_r=1&_t=ZS-96xK9ATikzJ',
  whatsapp:  'https://wa.me/YOUR_PHONE_NUMBER',
};

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

const socials = [
  { key: 'instagram', label: 'Instagram', href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { key: 'tiktok',    label: 'TikTok',    href: SOCIAL_LINKS.tiktok,    Icon: TikTokIcon   },
  { key: 'whatsapp',  label: 'WhatsApp',  href: SOCIAL_LINKS.whatsapp,  Icon: WhatsAppIcon },
];

export default function About() {
  return (
    <main className="about">

      {/* ══ NAVBAR ══════════════════════════════════════════ */}
      <nav className="navbar" style={{
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  background: "#0a0a0a",
  borderBottom: "1px solid var(--border)",
}}>
        <div className="navbar__container">
          <div className="navbar__left">
            <a href="/">
              <img className="navbar__logo-img" src="./logo.png" alt="Divaio Store" />
            </a>
          </div>
          <div className="navbar__center">
            <div className="navbar__links">
              <a href="/"          className="navbar__link">Home</a>
              <a href="/all-items" className="navbar__link">All Items</a>
              <a href="/about"     className="navbar__link">About Us</a>
            </div>
          </div>
          <div className="navbar__right" />
        </div>
      </nav>

      {/* ══ HERO STRIP ══════════════════════════════════════ */}
      <header className="about-hero" />

      {/* ══ STORES SECTION ══════════════════════════════════ */}
      <section className="stores">

        {/* Store 01 */}
        <div className="store-card">
          <div className="store-card__info">
            <span className="store-card__number">Store 01</span>
            <h2 className="store-card__title">Rue Khmisti</h2>
            <p className="store-card__address">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
              Rue Khmisti, en face Ooredoo
            </p>
            <a href="https://maps.app.goo.gl/o8WfZqpceg1s2GvW9" target="_blank" rel="noopener noreferrer" className="store-card__directions">
              Get Directions →
            </a>
          </div>
          <div className="store-card__map">
            <img src="./jps1.png" alt="Store 01 location map" />
            <div className="store-card__map-label">Store 01</div>
          </div>
        </div>

        <div className="stores__divider" />

        {/* Store 02 */}
        <div className="store-card store-card--reverse">
          <div className="store-card__info">
            <span className="store-card__number">Store 02</span>
            <h2 className="store-card__title">Salamandre</h2>
            <p className="store-card__address">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
              Salamandre, en face La Poste
            </p>
            <a href="https://maps.app.goo.gl/T6NkMCmGUfFNgRwa7" target="_blank" rel="noopener noreferrer" className="store-card__directions">
              Get Directions →
            </a>
          </div>
          <div className="store-card__map">
            <img src="./jps2.png" alt="Store 02 location map" />
            <div className="store-card__map-label">Store 02</div>
          </div>
        </div>

      </section>

      {/* ══ WHY CHOOSE SECTION ══════════════════════════════ */}
      <section className="why">

        <div className="why__header">
          <img src="./title2.png" alt="Why Choose Divaio" className="why__title-img" />
        </div>

        <div className="why__body">
          <p className="why__para">
            At <b>DIVAIO</b>, we believe that style is not a luxury — it is a statement.
            Every piece in our collection is hand-picked for its quality, its cut, and the confidence it brings.
            With two boutiques across Oran, we are always close to you — ready to help you find
            something that feels like it was made for you. From <b>exclusive arrivals</b> to timeless
            wardrobe staples, Divaio is where elegance meets the street.
          </p>
        </div>

      </section>

      {/* ══ FOOTER / CONTACT ════════════════════════════════ */}
      <section className="contact" id="contact">
        <div className="contact__inner">
          <div className="contact__icons">
            {socials.map(({ key, label, href, Icon }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`contact__icon-btn contact__icon-btn--${key}`}
                aria-label={label}
              >
                <span className="contact__icon-circle"><Icon /></span>
                <span className="contact__icon-label">{label}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="contact__footer">
          <div className="contact__rule" />
          <p className="contact__copy">© 2026 ByTwo. Designed and developed by ByTwo.</p>
        </div>
      </section>

    </main>
  );
}