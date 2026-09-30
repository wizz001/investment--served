'use client';

import { useState } from 'react';
import styles from './page.module.css';

const navItems = ['Home', 'About', 'Events', 'Membership', 'Partners', 'Community', 'Contact'];

function Mark() {
  return <><img src="/images/brand-mark-white.png" alt="" className={styles.mark} /><img src="/images/brand-wordmark-white.png" alt="Investments Served" className={styles.wordmark} /></>;
}

function CTAButton({ children, outline = false }) {
  return <a className={`${styles.cta} ${outline ? styles.outline : ''}`} href="#membership">{children}<span aria-hidden="true">{'\u2192'}</span></a>;
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
        <div className={styles.actions}><CTAButton>Join the Community</CTAButton><CTAButton outline>Upcoming Events</CTAButton></div>
      </section>
      <StatsBar />
      <div className={styles.caption}><span>More than networking</span><i /></div>
    </div>
  </main>;
}

export default function Home() { return <><Header /><Hero /></>; }
