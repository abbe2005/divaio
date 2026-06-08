// src/pages/Home.jsx
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import './Home.css';

const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/di_vaio_boutique_27?igsh=aWRlamkzMXZpajFn',
  tiktok: 'https://www.tiktok.com/@boutique_divaio?_r=1&_t=ZS-96xK9ATikzJ',
  whatsapp: 'https://wa.me/YOUR_PHONE_NUMBER',
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
  { key: 'tiktok', label: 'TikTok', href: SOCIAL_LINKS.tiktok, Icon: TikTokIcon },
  { key: 'whatsapp', label: 'WhatsApp', href: SOCIAL_LINKS.whatsapp, Icon: WhatsAppIcon },
];

function useCarousel(count, interval = 3500) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (!count || paused) return;
    timer.current = setInterval(() => setActive(p => (p + 1) % count), interval);
    return () => clearInterval(timer.current);
  }, [count, paused, interval]);

  const prev = () => setActive(a => (a - 1 + count) % count);
  const next = () => setActive(a => (a + 1) % count);
  const goTo = (i) => setActive(i);

  return { active, prev, next, goTo, setPaused };
}

const MARQUEE_ITEMS = Array(12).fill(null);

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestItems();
  }, []);

  const fetchLatestItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) {
      console.error('Error fetching items:', error);
    } else {
      // Transform data for carousel format
      const formattedItems = (data || []).map(item => ({
        id: item.id,
        imageUrl: item.image_url,
        name: item.name,
        colors: item.colors?.join(', ') || 'Various',
        sizes: item.sizes?.join(', ') || 'Various',
        priceDzd: item.price,
        href: `/items/${item.id}`
      }));
      setItems(formattedItems);
    }
    setLoading(false);
  };

  const { active, setPaused } = useCarousel(items.length);
  const currentItem = items[active];

  return (
    <main className="home">
      <nav className="navbar">
        <div className="navbar__container">
          <div className="navbar__left">
            <a href="/">
              <img className="navbar__logo-img" src="/src/assets/logo.png" alt="Divaio Store" />
            </a>
          </div>
          <div className="navbar__center">
            <div className="navbar__links">
              <a href="/" className="navbar__link">Home</a>
              <a href="/all-items" className="navbar__link">All Items</a>
              <a href="/about" className="navbar__link">About us</a>
            </div>
          </div>
          <div className="navbar__right" />
        </div>
      </nav>

      <section className="hero">
        <div className="hero__video-wrap">
          <video
            className="hero__video"
            src="/src/assets/divaio.mp4"
            autoPlay muted loop playsInline
          />
          <div className="hero__overlay" />
        </div>
        <div className="hero__content">
          <img className="hero__logo" src="/src/assets/logo.png" alt="Divaio Store" />
          <p className="hero__tagline">elegance in every thread</p>
          <div className="hero__actions">
            <a href="#contact" className="hero__btn">Contact Us</a>
            <a href="/all-items" className="hero__btn">All Items</a>
          </div>
        </div>
      </section>

      {!loading && items.length > 0 && currentItem && (
        <section className="carousel" id="featured">
          <div className="carousel__heading-wrap">
            <img
              className="carousel__title-logo"
              src="/src/assets/title.png"
              alt="New Arrivals"
            />
          </div>

          <div
            className="carousel__stage"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="carousel__split">
              <div className="carousel__image-side">
                <a href={currentItem.href}>
                  <img src={currentItem.imageUrl} alt={currentItem.name} />
                </a>
              </div>

              <div className="carousel__details-side">
                <div className="carousel__details-content">
                  <h3 className="carousel__item-name">{currentItem.name}</h3>

                  <div className="carousel__item-detail">
                    <span className="carousel__detail-label">Colors:</span>
                    <span className="carousel__detail-value">{currentItem.colors}</span>
                  </div>

                  <div className="carousel__item-detail">
                    <span className="carousel__detail-label">Sizes:</span>
                    <span className="carousel__detail-value">{currentItem.sizes}</span>
                  </div>

                  <div className="carousel__item-detail">
                    <span className="carousel__detail-label">Price:</span>
                    <span className="carousel__detail-value carousel__price">
                      {currentItem.priceDzd.toLocaleString()} DA
                    </span>
                  </div>

                  <a href={currentItem.href} className="carousel__shop-btn">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="marquee-strip">
            <div className="marquee-track">
              {MARQUEE_ITEMS.map((_, i) => (
                <span key={i} className="marquee-item">
                  New Arrivals <span className="marquee-dot">✦</span>
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

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
          <p className="contact__copy">By Bytwo</p>
        </div>
      </section>
    </main>
  );
}