"use client";

import { useEffect, useState } from "react";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap site-header-inner">
        <a href="/" className="brand">
          <span className="brand-mark" aria-hidden="true" />
          Salem Permit List
        </a>
        <nav className="site-nav">
          <a href="#how">How it works</a>
          <a href="#who">Who it&apos;s for</a>
          <a href="#price">Price</a>
          <a href="#get-list">Get the first week</a>
        </nav>
        <a href="tel:5414252008" className="btn btn-primary btn-compact">
          Call 541-425-2008
        </a>
      </div>
    </header>
  );
}
