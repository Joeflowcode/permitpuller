import { drizzle } from "drizzle-orm/netlify-db";
import * as schema from "./schema";

let cached: ReturnType<typeof drizzle> | undefined;

export function getDb() {
  cached ??= drizzle({ schema });
  return cached;
}
