"use client";

import { useState, type FormEvent } from "react";

export function GetListForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");

    try {
      const params = new URLSearchParams();
      for (const [key, value] of formData.entries()) {
        if (typeof value === "string") {
          params.append(key, value);
        }
      }
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      if (!response.ok) {
        throw new Error("Form submission failed");
      }
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
          If you want it faster, text <a href="tel:5414252008">541-425-2008</a>.
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
      <input type="hidden" name="subject" value="PERMIT LIST" />
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
      {status === "error" ? (
        <p className="muted" style={{ marginTop: 12 }}>
          That did not send. Text <a href="tel:5414252008">541-425-2008</a> or email{" "}
          <a href="mailto:joeymcveigh150@gmail.com?subject=PERMIT%20LIST">joeymcveigh150@gmail.com</a>.
        </p>
      ) : null}
    </form>
  );
}
