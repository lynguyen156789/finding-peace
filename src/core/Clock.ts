import { GameState } from "./GameState";

export const SLOTS_PER_DAY = 4;

/** Thời gian chỉ trôi khi người chơi xong một việc. Trả về true nếu sang ngày mới. */
export function advanceSlot(state: GameState): boolean {
  if (state.slot < SLOTS_PER_DAY - 1) {
    state.slot += 1;
    return false;
  }
  state.slot = 0;
  state.day += 1;
  return true;
}

/** Màu phủ theo khung giờ: [màu, độ mờ]. */
export const SLOT_TINT: [number, number][] = [
  [0xfff3d0, 0.0],
  [0xf0c070, 0.1],
  [0xc86a40, 0.2],
  [0x2a2f4a, 0.42],
];
