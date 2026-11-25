/** Cài đặt người chơi, lưu riêng khỏi bản lưu game (chơi mới không xoá cài đặt). */
export interface Settings {
  /** Nhạc nền (chưa có nhạc trong game, lưu sẵn để dùng sau). */
  music: boolean;
  /** Âm thanh thao tác, tiếng động (chưa có, lưu sẵn). */
  sfx: boolean;
  /** Giảm chuyển động: tắt thở, phóng to chậm, chuyển mờ. */
  reduceMotion: boolean;
}

const KEY = "finding-peace-settings";

function defaults(): Settings {
  let reduceMotion = false;
  try {
    reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    // Không đọc được thiết lập hệ thống: coi như không giảm chuyển động.
  }
  return { music: true, sfx: true, reduceMotion };
}

let cache: Settings | null = null;

export function getSettings(): Settings {
  if (cache) return cache;
  let saved: Partial<Settings> = {};
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) saved = JSON.parse(raw) as Partial<Settings>;
  } catch {
    // Bộ nhớ bị chặn hoặc hỏng: dùng mặc định.
  }
  cache = { ...defaults(), ...saved };
  return cache;
}

export function updateSettings(patch: Partial<Settings>): void {
  cache = { ...getSettings(), ...patch };
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    // Bỏ qua: cài đặt chỉ có hiệu lực trong phiên này.
  }
  applySettings();
}

/** Đưa cài đặt lên giao diện (CSS đọc class reduce-motion). Gọi lúc khởi động và sau mỗi lần đổi. */
export function applySettings(): void {
  document.getElementById("game")?.classList.toggle("reduce-motion", getSettings().reduceMotion);
}

export const isReducedMotion = (): boolean => getSettings().reduceMotion;
