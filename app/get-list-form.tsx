"use client";

import { useState, type CSSProperties, type FormEvent } from "react";

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
      <div style={{ ...card, padding: 24 }}>
        <h3 style={{ margin: "0 0 8px" }}>You are on the list.</h3>
        <p style={muted}>
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
      style={{ ...card, padding: 24 }}
    >
      <input type="hidden" name="form-name" value="permit-list" />
      <input type="hidden" name="subject" value="PERMIT LIST" />
      <p style={{ display: "none" }}>
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>
      <label style={label}>
        Name
        <input name="name" required style={input} />
      </label>
      <label style={label}>
        Trade
        <select name="trade" required style={input} defaultValue="Flooring">
          <option>Flooring</option>
          <option>HVAC</option>
          <option>Fence</option>
          <option>Paint</option>
          <option>Landscape</option>
          <option>Windows</option>
          <option>Other</option>
        </select>
      </label>
      <label style={label}>
        Email or phone
        <input name="contact" required style={input} />
      </label>
      <button className="btn btn-dark" type="submit" style={{ marginTop: 12, width: "100%" }} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send me the free week"}
      </button>
      {status === "error" ? (
        <p style={{ ...muted, marginTop: 12 }}>
          That did not send. Text <a href="tel:5414252008">541-425-2008</a> or email{" "}
          <a href="mailto:joeymcveigh150@gmail.com?subject=PERMIT%20LIST">joeymcveigh150@gmail.com</a>.
        </p>
      ) : null}
    </form>
  );
}

const muted: CSSProperties = { color: "#5b645c", margin: 0, lineHeight: 1.55 };

const card: CSSProperties = {
  background: "#faf8f3",
  border: "1px solid #d8d2c6",
  borderRadius: 8,
  padding: 22,
};

const label: CSSProperties = { display: "block", fontWeight: 700, margin: "0 0 14px" };

const input: CSSProperties = {
  display: "block",
  width: "100%",
  marginTop: 6,
  padding: "12px",
  border: "1px solid #ccc4b6",
  borderRadius: 6,
  font: "inherit",
  background: "#fff",
};
