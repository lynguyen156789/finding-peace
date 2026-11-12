export const SAVE_VERSION = 1;

export interface GameState {
  version: number;
  chapter: number;
  day: number;
  /** 0 sáng, 1 chiều, 2 tối, 3 đêm */
  slot: number;
  /** Khoảnh khắc đã có. Chỉ thêm, không bao giờ xóa. */
  moments: string[];
}

export function newGameState(): GameState {
  return { version: SAVE_VERSION, chapter: 1, day: 1, slot: 0, moments: [] };
}
