import vi from "../../locales/vi.json";

const strings = vi as Record<string, string>;

export function t(key: string, params: Record<string, string | number> = {}): string {
  let s = strings[key] ?? key;
  for (const [k, v] of Object.entries(params)) s = s.replace(`{${k}}`, String(v));
  return s;
}
