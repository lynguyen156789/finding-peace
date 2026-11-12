import { GameState, SAVE_VERSION, newGameState } from "./GameState";

const KEY = "finding-peace-save";

export function saveGame(state: GameState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Bộ nhớ bị chặn (chế độ riêng tư): bỏ qua, game vẫn chơi được.
  }
}

export function loadGame(): GameState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return newGameState();
    return migrate(JSON.parse(raw) as Partial<GameState>);
  } catch {
    return newGameState();
  }
}

/** Chỗ để nâng cấp tệp lưu khi SAVE_VERSION tăng. */
function migrate(data: Partial<GameState>): GameState {
  return { ...newGameState(), ...data, version: SAVE_VERSION };
}
