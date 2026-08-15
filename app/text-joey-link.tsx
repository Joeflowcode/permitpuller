"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

const PHONE = "5414252008";

function isPhoneDevice() {
  return /Mobi|iPhone|Android.+Mobile|Windows Phone/i.test(navigator.userAgent);
}

export function TextJoeyLink({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const [href, setHref] = useState(`tel:${PHONE}`);

  useEffect(() => {
    setHref(isPhoneDevice() ? `sms:${PHONE}` : `tel:${PHONE}`);
  }, []);

  return (
    <a href={href} className={className} style={style}>
      {children}
    </a>
  );
}
