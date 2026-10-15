'use client';

import { useState } from 'react';
import styles from './page.module.css';

const navItems = ['Home', 'About', 'Events', 'Membership', 'Partners', 'Community', 'Contact'];

function Mark() {
  return <><img src="/images/brand-mark-white.png" alt="" className={styles.mark} /><img src="/images/brand-wordmark-white.png" alt="Investments Served" className={styles.wordmark} /></>;
}

function CTAButton({ children, outline = false, href = '#booking' }) {
  return <a className={`${styles.cta} ${outline ? styles.outline : ''}`} href={href}>{children}<span aria-hidden="true">{'\u2192'}</span></a>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className={styles.header}>
    <div className={styles.navWrap}>
      <a className={styles.logo} href="#top" aria-label="Investments Served home"><Mark /></a>
      <nav className={menuOpen ? styles.mobileOpen : ''} aria-label="Main navigation"><ul>{navItems.map((item, index) => <li key={item}><a onClick={() => setMenuOpen(false)} className={index === 0 ? styles.active : ''} href={`#${item.toLowerCase()}`}>{item}</a></li>)}</ul></nav>
      <a className={styles.navCta} href="#membership">Join the Community</a>
      <button className={styles.menu} type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i></i><i></i></button>
    </div>
  </header>;
}

function StatsBar() {
  const stats = [['3', 'Cities'], ['500+', 'Members'], ['Monthly', 'Events'], ['\u221e', 'A stronger you']];
  return <dl className={styles.stats}>{stats.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}</dl>;
}

function Hero() {
  return <main id="top" className={styles.hero}>
    <div className={styles.image} role="img" aria-label="Members playing padel at an upscale venue at sunset" />
    <div className={styles.wash} />
    <div className={styles.wallWords} aria-hidden="true"><span>Better</span><span>people</span><span>better</span><span>deals</span><b /></div>
    <div className={styles.heroInner}>
      <section className={styles.copy} aria-labelledby="hero-title">
        <p className={styles.eyebrow}>Property <b>/</b> People <b>/</b> Performance</p>
        <h1 id="hero-title"><span>grow your wealth.</span><em>improve your health.</em></h1>
        <p className={styles.intro}>A premium property community bringing ambitious people together through business, padel and a healthier way of life.</p>
        <div className={styles.actions}><CTAButton href="#booking">Book an Event</CTAButton><CTAButton outline href="#booking">Upcoming Events</CTAButton></div>
      </section>
      <StatsBar />
      <div className={styles.caption}><span>More than networking</span><i /></div>
    </div>
  </main>;
}

const areas = [
  { name: 'London', venue: 'Padium, Canary Wharf', sessions: [{ date: 'Wednesday 28 October 2026', shortDate: '28 Oct', time: '6:30pm' }, { date: 'Wednesday 18 November 2026', shortDate: '18 Nov', time: '6:30pm' }, { date: 'Wednesday 9 December 2026', shortDate: '9 Dec', time: '6:30pm' }] },
  { name: 'Manchester', venue: 'Club de Padel, Deansgate', sessions: [{ date: 'Thursday 12 November 2026', shortDate: '12 Nov', time: '7:00pm' }, { date: 'Thursday 3 December 2026', shortDate: '3 Dec', time: '7:00pm' }, { date: 'Thursday 14 January 2027', shortDate: '14 Jan', time: '7:00pm' }] },
  { name: 'Leeds', venue: 'The Padel Club, Roundhay', sessions: [{ date: 'Tuesday 27 October 2026', shortDate: '27 Oct', time: '6:30pm' }, { date: 'Tuesday 24 November 2026', shortDate: '24 Nov', time: '6:30pm' }, { date: 'Tuesday 15 December 2026', shortDate: '15 Dec', time: '6:30pm' }] },
];

function BookingLegacy() {
  const [area, setArea] = useState(0);
  const [form, setForm] = useState({ name: '', email: '' });
  const [confirmed, setConfirmed] = useState(false);
  const event = areas[area];
  const submit = (e) => { e.preventDefault(); if (form.name && form.email) setConfirmed(true); };

  return <section className={styles.booking} id="booking" aria-labelledby="booking-title">
    <div className={styles.bookingIntro}>
      <p className={styles.sectionEyebrow}>Weekly members&apos; sessions</p>
      <h2 id="booking-title">Make space for<br /><em>better connections.</em></h2>
      <p>Choose your local session and reserve your place. Every week, the room is full of people worth meeting.</p>
      <div className={styles.paymentNote}><span>✓</span> Secure checkout powered by <b>stripe</b></div>
    </div>
    <div className={styles.bookingCard}>
      {confirmed ? <div className={styles.confirmation} aria-live="polite">
        <div className={styles.successMark}>✓</div>
        <p className={styles.sectionEyebrow}>Booking received</p>
        <h3>You&apos;re on the list.</h3>
        <p>Thanks, {form.name.split(' ')[0]}. We&apos;ll send your confirmation and session details to {form.email}.</p>
        <button type="button" onClick={() => { setConfirmed(false); setForm({ name: '', email: '' }); }}>Book another session <span>→</span></button>
      </div> : <form onSubmit={submit}>
        <div className={styles.cardTop}><span>Your weekly booking</span><span className={styles.demoTag}>DEMO</span></div>
        <h3>Choose your area</h3>
        <div className={styles.areaTabs} role="tablist" aria-label="Event areas">
          {areas.map((item, index) => <button type="button" role="tab" aria-selected={area === index} className={area === index ? styles.selected : ''} onClick={() => setArea(index)} key={item.name}>{item.name}</button>)}
        </div>
        <div className={styles.eventDetail}>
          <div className={styles.calendarIcon}><small>{event.day.slice(0, 3).toUpperCase()}</small><b>W</b></div>
          <div><strong>{event.day} padel &amp; property</strong><span>{event.venue} · {event.time}</span></div>
          <em>{event.date}</em>
        </div>
        <div className={styles.fields}>
          <label>Full name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>
          <label>Email address<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" /></label>
        </div>
        <div className={styles.checkout}><div><span>Session reservation</span><b>£18.00</b></div><button type="submit">Continue to payment <span>→</span></button></div>
        <p className={styles.demoCopy}>Demo checkout only — no payment will be taken.</p>
      </form>}
    </div>
  </section>;
}

function Booking() {
  const [area, setArea] = useState(0);
  const [dateIndex, setDateIndex] = useState(0);
  const [form, setForm] = useState({ name: '', email: '' });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const event = areas[area];
  const session = event.sessions[dateIndex];
  const isEmailValid = /\S+@\S+\.\S+/.test(form.email);

  const submit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (!form.name.trim() || !isEmailValid) return;
    setSubmitting(true);
    window.setTimeout(() => { setSubmitting(false); setConfirmed(true); }, 650);
  };

  return <section className={styles.booking} id="booking" aria-labelledby="booking-title">
    <div className={styles.bookingShell}>
      <div className={styles.bookingIntro}>
        <p className={styles.sectionEyebrow}>Upcoming members&apos; sessions</p>
        <h2 id="booking-title">Make time for<br /><em>the right room.</em></h2>
        <p>Reserve your place at an upcoming local Padel &amp; Property session. We&apos;ll send the session details to your inbox once your booking is complete.</p>
        <dl className={styles.bookingFacts}>
          <div><dt>Format</dt><dd>In person</dd></div>
          <div><dt>Dates</dt><dd>Selected events</dd></div>
          <div><dt>Reservation</dt><dd>£18.00</dd></div>
        </dl>
        <p className={styles.demoNotice}>This is a demonstration booking flow. No payment will be taken.</p>
      </div>
      <div className={styles.bookingCard}>
        {confirmed ? <div className={styles.confirmation} aria-live="polite">
          <div className={styles.successMark}>✓</div>
          <p className={styles.sectionEyebrow}>Booking received</p>
          <h3>You&apos;re on the list.</h3>
          <p>Thanks, {form.name.split(' ')[0]}. Your place is reserved for the {session.date} session in {event.name} at {session.time}. We&apos;ll send the details to {form.email}.</p>
          <button type="button" onClick={() => { setConfirmed(false); setForm({ name: '', email: '' }); setTouched({}); }}>Book another session <span>→</span></button>
        </div> : <form onSubmit={submit} noValidate>
          <div className={styles.cardTop}><span>Reserve your place</span><span className={styles.demoTag}>DEMO</span></div>
          <ol className={styles.steps} aria-label="Booking steps"><li className={styles.current}>1 <span>Session</span></li><li>2 <span>Your details</span></li><li>3 <span>Payment</span></li></ol>
          <fieldset className={styles.fieldset}>
            <legend>1. Choose your local session</legend>
            <div className={styles.areaTabs} role="tablist" aria-label="Event areas">
              {areas.map((item, index) => <button type="button" role="tab" aria-selected={area === index} className={area === index ? styles.selected : ''} onClick={() => { setArea(index); setDateIndex(0); }} key={item.name}>{item.name}</button>)}
            </div>
            <div className={styles.dateChoices} role="group" aria-label="Choose an event date">
              <span>Available dates</span><div>{event.sessions.map((item, index) => <button type="button" className={dateIndex === index ? styles.selectedDate : ''} aria-pressed={dateIndex === index} onClick={() => setDateIndex(index)} key={item.date}>{item.shortDate}</button>)}</div>
            </div>
            <div className={styles.eventDetail} aria-label={`${session.date} Padel and Property event, ${event.venue}, ${session.time}`}>
              <div className={styles.dayBadge}><small>{session.date.slice(0, 3)}</small><b>{session.time}</b></div>
              <div><strong>Padel &amp; Property</strong><span>{session.date} · {event.venue}</span></div>
              <em>In person</em>
            </div>
          </fieldset>
          <aside className={styles.summary} aria-label="Booking summary"><span>Booking summary</span><b>{event.name} · {session.date}, {session.time}</b><small>Padel &amp; Property · In person</small></aside>
          <fieldset className={styles.fieldset}>
            <legend>2. Your details</legend>
            <div className={styles.fields}>
              <label>Full name<input aria-invalid={touched.name && !form.name.trim()} value={form.name} onBlur={() => setTouched({ ...touched, name: true })} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />{touched.name && !form.name.trim() && <small className={styles.error}>Please enter your name.</small>}</label>
              <label>Email address<input aria-invalid={touched.email && !isEmailValid} type="email" value={form.email} onBlur={() => setTouched({ ...touched, email: true })} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />{touched.email && !isEmailValid && <small className={styles.error}>Enter a valid email address.</small>}</label>
            </div>
          </fieldset>
          <div className={styles.checkout}><div><span>Session reservation</span><b>£18.00</b></div><button type="submit" disabled={submitting}>{submitting ? 'Preparing booking…' : <>Continue to payment <span>→</span></>}</button></div>
          <p className={styles.demoCopy}>Demo checkout only — no payment will be taken.</p>
        </form>}
      </div>
    </div>
  </section>;
}

export default function Home() { return <><Header /><Hero /><Booking /></>; }
