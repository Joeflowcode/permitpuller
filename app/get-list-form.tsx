"use client";

import { useEffect, useState, type FormEvent } from "react";
import { signupStorageKey, type SignupCity } from "../lib/signup";

type Status = "idle" | "sending" | "sent" | "already" | "invalid" | "error";

export function GetListForm({
  city = "salem",
  subject = "PERMIT LIST",
  priceLabel = "$99 a month",
}: {
  city?: SignupCity;
  subject?: string;
  priceLabel?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const storageKey = signupStorageKey(city);
  const includeDumpster = city === "portland";

  useEffect(() => {
    if (window.localStorage.getItem(storageKey) === "1") {
      setStatus("already");
    }
  }, [storageKey]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") || ""),
          trade: String(formData.get("trade") || ""),
          contact: String(formData.get("contact") || ""),
          city,
          subject,
          "bot-field": String(formData.get("bot-field") || ""),
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { status?: string };
      if (data.status === "already") {
        window.localStorage.setItem(storageKey, "1");
        setStatus("already");
        return;
      }
      if (data.status === "invalid") {
        setStatus("invalid");
        return;
      }
      if (!response.ok || data.status !== "ok") {
        throw new Error("Form submission failed");
      }
      window.localStorage.setItem(storageKey, "1");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-success">
        <h3>You are on the list.</h3>
        <p className="muted">
          One free week per shop. If you want it faster, text <a href="tel:5414252008">541-425-2008</a>.
        </p>
      </div>
    );
  }

  if (status === "already") {
    return (
      <div className="form-success">
        <h3>You already used the free week.</h3>
        <p className="muted">
          Same email or phone does not get another list. If the Monday email is useful, it is {priceLabel}. Text{" "}
          <a href="tel:5414252008">541-425-2008</a> and Joey will send the Stripe link.
        </p>
      </div>
    );
  }

  return (
    <form
      name="permit-list"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="form-card"
    >
      <input type="hidden" name="form-name" value="permit-list" />
      <input type="hidden" name="subject" value={subject} />
      <input type="hidden" name="city" value={city} />
      <p style={{ display: "none" }}>
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>
      <label className="field">
        Name
        <input name="name" required />
      </label>
      <label className="field">
        Trade
        <select name="trade" required defaultValue="Flooring">
          <option>Flooring</option>
          <option>HVAC</option>
          <option>Fence</option>
          <option>Paint</option>
          <option>Landscape</option>
          <option>Windows</option>
          {includeDumpster ? <option>Dumpster</option> : null}
          <option>Other</option>
        </select>
      </label>
      <label className="field">
        Email or phone
        <input name="contact" required />
      </label>
      <button className="btn btn-dark" type="submit" style={{ width: "100%" }} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send me the free week"}
      </button>
      {status === "invalid" ? (
        <p className="muted" style={{ marginTop: 12 }}>
          Use a real email or a 10-digit phone. Text <a href="tel:5414252008">541-425-2008</a> if that is easier.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="muted" style={{ marginTop: 12 }}>
          That did not send. Text <a href="tel:5414252008">541-425-2008</a> or email{" "}
          <a href="mailto:joeymcveigh150@gmail.com?subject=PERMIT%20LIST">joeymcveigh150@gmail.com</a>.
        </p>
      ) : null}
    </form>
  );
}
