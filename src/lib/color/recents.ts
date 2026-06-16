const KEY = "onylogy:recent-colors";
const MAX = 12;

export function getRecentColors(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX) : [];
  } catch {
    return [];
  }
}

export function addRecentColor(hex: string): string[] {
  if (typeof window === "undefined") return [];
  const normalized = hex.toLowerCase();
  const next = [normalized, ...getRecentColors().filter((c) => c !== normalized)].slice(
    0,
    MAX,
  );
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore quota */
  }
  return next;
}
