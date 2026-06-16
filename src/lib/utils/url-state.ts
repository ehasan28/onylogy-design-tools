const VERSION = 1;

export function encodeState<T>(state: T): string {
  const payload = JSON.stringify({ v: VERSION, s: state });
  if (typeof window === "undefined") {
    return Buffer.from(payload, "utf8").toString("base64");
  }
  return btoa(unescape(encodeURIComponent(payload)));
}

export function decodeState<T>(encoded: string): T | null {
  try {
    let decoded: string;
    if (typeof window === "undefined") {
      decoded = Buffer.from(encoded, "base64").toString("utf8");
    } else {
      decoded = decodeURIComponent(escape(atob(encoded)));
    }
    const parsed = JSON.parse(decoded);
    if (!parsed || parsed.v !== VERSION) return null;
    return parsed.s as T;
  } catch {
    return null;
  }
}

export function toSearchParam<T>(state: T): string {
  return encodeState(state);
}

export function fromSearchParam<T>(value: string | null): T | null {
  if (!value) return null;
  return decodeState<T>(value);
}
