import Phaser from "phaser";
import { Gender } from "../core/GameState";
import { t } from "../core/i18n";
import { Dialogue } from "../ui/Dialogue";

export const SLEEP_FRAMES = 4;

/** Nạp 4 tranh cảnh ngủ của nhân vật đã chọn (gọi trong preload). */
export function loadSleepFrames(scene: Phaser.Scene, gender: Gender): void {
  for (let i = 1; i <= SLEEP_FRAMES; i++) {
    scene.load.image(`sleep-${gender}-${i}`, `assets/cutscenes/sleep-${gender}-${i}.webp`);
  }
}

const D = 20000; // phủ lên cả cảnh căn hộ

/**
 * Clip ngủ, tự chạy từ đầu đến cuối, không có nút bỏ qua và người chơi không phải làm gì:
 * ngồi mép giường → nằm xuống → đắp chăn → nhắm mắt, tắt đèn.
 * full = false là "nghỉ một lát" ban ngày: dừng sau khi đắp chăn, không tắt đèn.
 */
export async function runSleep(
  scene: Phaser.Scene,
  gender: Gender,
  full: boolean,
  dialogue: Dialogue,
): Promise<() => Promise<void>> {
  const frames = Array.from({ length: SLEEP_FRAMES }, (_, i) =>
    scene.add.image(640, 360, `sleep-${gender}-${i + 1}`).setDisplaySize(1280, 720).setDepth(D + i).setAlpha(0),
  );
  const black = scene.add.rectangle(640, 360, 1280, 720, 0x000000, 0).setDepth(D + 10);

  const tween = (targets: object, props: object, duration: number) =>
    new Promise<void>((res) => scene.tweens.add({ targets, ...props, duration, onComplete: () => res() }));
  const caption = (key: string) => dialogue.show(t(key));

  await tween(frames[0], { alpha: 1 }, 700); // 1. ngồi ở mép giường, đèn ngủ sáng
  await caption("sleep.sit");
  await tween(frames[1], { alpha: 1 }, 1000); // 2. nằm xuống
  await caption("sleep.lie");
  await tween(frames[2], { alpha: 1 }, 1200); // 3. chăn tự kéo lên tới vai
  await caption(full ? "sleep.covered" : "sleep.rest");
  if (full) {
    await tween(frames[3], { alpha: 1 }, 1600); // 4. nhắm mắt, đèn tắt, ánh trăng
    await caption("sleep.eyes_closed");
  }
  await tween(black, { fillAlpha: 1 }, full ? 900 : 500);

  frames.forEach((f) => f.destroy());
  await new Promise<void>((res) => scene.time.delayedCall(250, () => res()));

  // Màn đang đen hoàn toàn: bên gọi cập nhật ngày/giờ rồi gọi reveal() để mờ về căn hộ.
  return async () => {
    await tween(black, { fillAlpha: 0 }, 800);
    black.destroy();
  };
}
