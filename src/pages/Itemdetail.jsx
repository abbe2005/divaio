import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './Itemdetail.css';

// ── Social Links ─────────────────────────────────────────────
const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/di_vaio_boutique_27?igsh=aWRlamkzMXZpajFn',
  tiktok:    'https://www.tiktok.com/@boutique_divaio?_r=1&_t=ZS-96xK9ATikzJ',
  whatsapp:  'https://wa.me/YOUR_PHONE_NUMBER',
};

// ── Telegram Bot Configuration ───────────────────────────────
const TELEGRAM_BOT_TOKEN = '8873201148:AAFVBOnIuKalum7jSwLS3CHxh3xdKK6jnAc';
const TELEGRAM_CHAT_ID = '5561694290';

// Function to send Telegram notification
const sendTelegramNotification = async (order) => {
  try {
    const message = `
🛒 NEW ORDER RECEIVED!
━━━━━━━━━━━━━━━━
📦 Item: ${order.item_name}
💰 Price: ${order.price} DA
📏 Size: ${order.size || 'N/A'}
🎨 Color: ${order.color || 'N/A'}

👤 Customer Details:
├ Name: ${order.customer_name}
├ Phone: ${order.phone}
└ Wilaya: ${order.wilaya}

🆔 Order ID: ${order.id}
📅 Date: ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━
✅ Status: ${order.status || 'pending'}
    `;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }),
    });

    const data = await response.json();
    console.log('Telegram notification:', data.ok ? 'Sent ✅' : 'Failed ❌');
    return data.ok;
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return false;
  }
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

// ── Wilayas dropdown ─────────────────────────────────────────
const WILAYAS = ['Mostaganem', 'Oran', 'Blida', 'Alger'];

// ═════════════════════════════════════════════════════════════
// ORDER MODAL
// ═════════════════════════════════════════════════════════════
function OrderModal({ item, onClose }) {
  const [form, setForm]        = useState({ fullName: '', wilaya: '', phone: '', size: '', color: '' });
  const [submitted, setSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors]    = useState({});

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Required';
    if (!form.wilaya)          e.wilaya   = 'Required';
    if (item.sizes && item.sizes.length > 0 && !form.size)   e.size  = 'Required';
    if (item.colors && item.colors.length > 0 && !form.color) e.color = 'Required';
    if (!form.phone.trim())    e.phone    = 'Required';
    else if (!/^(0|\+213)[5-7]\d{8}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Enter a valid Algerian number';
    return e;
  };

  const handleChange = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setSubmitting(true);

    try {
      // Save order to Supabase
      const orderData = {
        item_id:       item.id,
        item_name:     item.name,
        price:         item.price,
        size:          form.size || null,
        color:         form.color || null,
        customer_name: form.fullName,
        wilaya:        form.wilaya,
        phone:         form.phone,
        status:        'pending',
        created_at:    new Date().toISOString()
      };

      const { data, error: dbError } = await supabase
        .from('orders')
        .insert([orderData])
        .select();

      if (dbError) throw dbError;

      // 🔔 SEND TELEGRAM NOTIFICATION AUTOMATICALLY 🔔
      if (data && data[0]) {
        await sendTelegramNotification(data[0]);
      }

      // WhatsApp redirect removed - only Telegram notification now
      setSubmit(true);
    } catch (err) {
      console.error('Error saving order:', err);
      alert('Failed to place order: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Normalize colors
  const colorOptions = (item.colors || []).map(c =>
    typeof c === 'string' ? c : c.name
  );

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>

        {submitted ? (
          <div className="modal__success">
            <div className="modal__success-icon">✓</div>
            <h3>Order Sent!</h3>
            <p>Your order for <strong>{item.name}</strong> has been placed successfully.<br />We'll confirm shortly.</p>
          </div>
        ) : (
          <>
            <p className="modal__eyebrow">Place your order</p>
            <h2 className="modal__title">{item.name}</h2>

            <div className="modal__form">

              {/* Full Name */}
              <div className="form-field">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Your full name"
                  value={form.fullName}
                  onChange={e => handleChange('fullName', e.target.value)}
                  style={errors.fullName ? { borderColor: '#e25' } : {}}
                />
                {errors.fullName && <span className="form-error">{errors.fullName}</span>}
              </div>

              {/* Wilaya */}
              <div className="form-field">
                <label htmlFor="wilaya">Wilaya</label>
                <div className="select-wrap">
                  <select
                    id="wilaya"
                    value={form.wilaya}
                    onChange={e => handleChange('wilaya', e.target.value)}
                    style={errors.wilaya ? { borderColor: '#e25' } : {}}
                  >
                    <option value="">Select your wilaya</option>
                    {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>
                {errors.wilaya && <span className="form-error">{errors.wilaya}</span>}
              </div>

              {/* Size */}
              {item.sizes && item.sizes.length > 0 && (
                <div className="form-field">
                  <label htmlFor="size">Size</label>
                  <div className="select-wrap">
                    <select
                      id="size"
                      value={form.size}
                      onChange={e => handleChange('size', e.target.value)}
                      style={errors.size ? { borderColor: '#e25' } : {}}
                    >
                      <option value="">Select a size</option>
                      {item.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  {errors.size && <span className="form-error">{errors.size}</span>}
                </div>
              )}

              {/* Color */}
              {colorOptions.length > 0 && (
                <div className="form-field">
                  <label htmlFor="color">Color</label>
                  <div className="select-wrap">
                    <select
                      id="color"
                      value={form.color}
                      onChange={e => handleChange('color', e.target.value)}
                      style={errors.color ? { borderColor: '#e25' } : {}}
                    >
                      <option value="">Select a color</option>
                      {colorOptions.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  {errors.color && <span className="form-error">{errors.color}</span>}
                </div>
              )}

              {/* Phone */}
              <div className="form-field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="05XXXXXXXX"
                  value={form.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  style={errors.phone ? { borderColor: '#e25' } : {}}
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>

              <button
                className="modal__submit"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? 'Sending...' : 'Send Order'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════════════
export default function ItemDetail({ id }) {
  const [item, setItem]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) fetchItem();
  }, [id]);

  const fetchItem = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setItem(data);
    } catch (err) {
      console.error('Error fetching item:', err);
      setError('Item not found.');
    }
    setLoading(false);
  };

  // Build images array
  const images = item
    ? (item.images && item.images.length > 0
        ? item.images
        : item.image_url ? [item.image_url] : ['https://placehold.co/600x750/111/e8e0d4?text=No+Image'])
    : [];

  // Normalize colors to string array
  const colorOptions = item
    ? (item.colors || []).map(c => typeof c === 'string' ? c : c.name)
    : [];

  if (loading) {
    return (
      <main className="item-detail-page">
        <div className="detail-loading">Loading item...</div>
      </main>
    );
  }

  if (error || !item) {
    return (
      <main className="item-detail-page">
        <div className="detail-error">
          <p>{error || 'Item not found.'}</p>
          <a href="/all-items" className="back-btn">← Back to All Items</a>
        </div>
      </main>
    );
  }

  return (
    <main className="item-detail-page">

      {/* ── DETAIL BODY ── */}
      <section className="detail-body">

        <a href="/all-items" className="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          All Items
        </a>

        <div className="detail-inner">

          {/* LEFT: Gallery */}
          <div className="gallery">
            <div className="gallery__main">
              <img src={images[activeImg]} alt={item.name} />
            </div>

            {images.length > 1 && (
              <div className="gallery__thumbs">
                {images.map((src, i) => (
                  <div
                    key={i}
                    className={`gallery__thumb${activeImg === i ? ' is-active' : ''}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={src} alt={`${item.name} view ${i + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Info Panel */}
          <div className="info-panel">
            <div>
              <p className="info-panel__category">{item.category}</p>
              <h1 className="info-panel__name">{item.name}</h1>
            </div>

            <p className="info-panel__price">
              {item.price?.toLocaleString()} <em>DA</em>
            </p>

            {item.description && (
              <p className="info-panel__description">{item.description}</p>
            )}

            <div className="info-panel__divider" />

            {/* Sizes preview */}
            {item.sizes && item.sizes.length > 0 && (
              <div className="option-group">
                <span className="option-group__label">Available Sizes</span>
                <div className="size-tags">
                  {item.sizes.map(s => <span key={s} className="size-tag">{s}</span>)}
                </div>
              </div>
            )}

            {/* Colors preview */}
            {colorOptions.length > 0 && (
              <div className="option-group">
                <span className="option-group__label">Available Colors</span>
                <div className="color-tags">
                  {colorOptions.map(c => <span key={c} className="color-tag">{c}</span>)}
                </div>
              </div>
            )}

            <div className="info-panel__divider" />

            <button className="order-btn" onClick={() => setShowModal(true)}>
              Order Now
            </button>
          </div>

        </div>
      </section>

      {/* ── ORDER MODAL ── */}
      {showModal && (
        <OrderModal
          item={item}
          onClose={() => setShowModal(false)}
        />
      )}

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