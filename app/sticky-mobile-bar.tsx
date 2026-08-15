"use client";

import { useEffect, useState } from "react";
import { TextJoeyLink } from "./text-joey-link";

export function StickyMobileBar() {
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const form = document.getElementById("get-list");
    if (!form) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setFormInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`sticky-mobile-bar${formInView ? " is-hidden" : ""}`} aria-hidden={formInView}>
      <TextJoeyLink className="btn btn-primary">Text Joey</TextJoeyLink>
      <a className="btn btn-secondary" href="#get-list">
        Free week
      </a>
    </div>
  );
}
