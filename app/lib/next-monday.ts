export function nextListDateLabel(now = new Date()) {
  const cursor = new Date(now);
  for (let i = 0; i < 8; i += 1) {
    const weekday = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      weekday: "short",
    }).format(cursor);
    if (weekday === "Mon") {
      return new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles",
        weekday: "long",
        month: "long",
        day: "numeric",
      }).format(cursor);
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return "Monday";
}
