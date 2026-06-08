import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './AllItems.css';

// ── Social Links ─────────────────────────────────────────────
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

const CATEGORIES = ['All', 'Shirts', 'Pants', 'Shoes', 'Caps', 'Ensemble'];

// ═════════════════════════════════════════════════════════════
export default function AllItems() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to load items. Please try again.');
    }
    setLoading(false);
  };

  const filtered = activeCategory === 'All'
    ? items
    : items.filter(i => i.category === activeCategory);

  return (
    <main className="all-items">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="navbar__container">
          <div className="navbar__left">
            <a href="/">
              <img className="navbar__logo-img" src="src/assets/logo.png" alt="Divaio Store" />
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

      {/* ── PAGE HEADER ── */}
      <header className="items-header">
        <section className="categories">
          <div className="categories__track">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`categories__btn${activeCategory === cat ? ' is-active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                <span className="categories__label">{cat}</span>
              </button>
            ))}
          </div>
        </section>
      </header>

      {/* ── ITEMS GRID ── */}
      <section className="items-grid">
        {loading ? (
          <div className="items-grid__loading">Loading items...</div>
        ) : error ? (
          <div className="items-grid__error">
            <p>{error}</p>
            <button onClick={fetchItems} className="retry-btn">Retry</button>
          </div>
        ) : filtered.length === 0 ? (
          <p className="items-grid__empty">No items in this category yet.</p>
        ) : (
          <div className="items-grid__inner">
            {filtered.map(item => (
              <a href={`/items/${item.id}`} key={item.id} className="item-card" style={{ textDecoration: 'none' }}>
                <div className="item-card__img-wrap">
                  <img
                    src={item.image_url || 'https://placehold.co/600x750/111/e8e0d4?text=No+Image'}
                    alt={item.name}
                  />
                </div>
                <div className="item-card__footer">
                  <span className="item-card__price">
                    {item.price?.toLocaleString()} <em>DA</em>
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* ── FOOTER ── */}
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