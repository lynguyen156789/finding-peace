export const SAVE_VERSION = 2;

export type Gender = "female" | "male";

export interface GameState {
  version: number;
  /** Nhân vật người chơi chọn; null khi chưa chọn. */
  gender: Gender | null;
  /** Căn hộ studio người chơi chọn (1-3); null khi chưa chọn. */
  apartment: number | null;
  chapter: number;
  day: number;
  /** 0 sáng, 1 chiều, 2 tối, 3 đêm */
  slot: number;
  /** Khoảnh khắc đã có. Chỉ thêm, không bao giờ xóa. */
  moments: string[];
}

export function newGameState(): GameState {
  return { version: SAVE_VERSION, gender: null, apartment: null, chapter: 1, day: 1, slot: 0, moments: [] };
}
