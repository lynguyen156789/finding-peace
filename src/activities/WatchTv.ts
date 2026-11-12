import Phaser from "phaser";
import { Character } from "../entities/Character";
import { Gender } from "../core/GameState";
import { t } from "../core/i18n";
import { Dialogue } from "../ui/Dialogue";

export interface WatchTvOptions {
  gender: Gender;
  /** Chỗ ngồi (chân chạm đất) và tỉ lệ của nhân vật ngồi, tọa độ khung game. */
  seat: { sit: number[]; scale: number };
  tv: { rect: number[]; mode: string };
  /** Khung giờ hiện tại: tối/đêm thì ngồi lâu sẽ ngủ gật. */
  slot: number;
  /** Số tự quay vòng để mỗi lần xem là một chương trình khác (ngày + khung giờ). */
  variant: number;
  player: Character;
  dialogue: Dialogue;
}

const PROGRAMS = ["drama", "cooking", "weather"] as const;

/**
 * Clip xem TV, tự chạy từ đầu đến cuối, người chơi không phải chọn hay bấm gì:
 * ngồi xuống sofa → TV sáng lên một chương trình → cầm tách trà → (tối thì) ngủ gật → tắt TV, đứng dậy.
 * Không có nút bỏ qua.
 */
export async function runWatchTv(scene: Phaser.Scene, o: WatchTvOptions): Promise<void> {
  const [sx, sy] = o.seat.sit;
  const program = PROGRAMS[((o.variant % PROGRAMS.length) + PROGRAMS.length) % PROGRAMS.length];
  const delay = (ms: number) => new Promise<void>((res) => scene.time.delayedCall(ms, () => res()));
  const tween = (targets: object, props: object, duration: number) =>
    new Promise<void>((res) => scene.tweens.add({ targets, ...props, duration, onComplete: () => res() }));

  const caption = (key: string) => o.dialogue.show(t(key));

  // 1. Ngồi xuống sofa
  o.player.setVisible(false);
  const sit = scene.add.sprite(sx, sy, `char-${o.gender}-sit`, 0).setOrigin(0.5, 0.98).setScale(o.seat.scale).setDepth(sy + 1);
  sit.setAlpha(0);
  await tween(sit, { alpha: 1 }, 350);
  await caption("tv.sit");

  // 2. TV sáng lên với một chương trình
  const [rx, ry, rw, rh] = o.tv.rect;
  const pic = scene.add.image(0, 0, `ui-tv-${program}`).setDepth(sy + 2).setAlpha(0);
  if (o.tv.mode === "screen") {
    pic.setPosition(rx + rw / 2, ry + rh / 2).setDisplaySize(rw + 6, rh + 6);
  } else {
    // TV bị nghiêng hoặc khuất: hiện tranh nhỏ phía trên TV
    pic.setPosition(rx + rw / 2, ry - 58).setDisplaySize(140, 97);
  }
  const glow = scene.add.rectangle(sx, sy - 70, 230, 170, 0x9fc3ff, 0).setDepth(sy + 3);
  await tween(pic, { alpha: 1 }, 500);
  const flicker = scene.tweens.add({ targets: glow, fillAlpha: 0.09, yoyo: true, repeat: -1, duration: 1100 });

  // 3. Xem một lát, rồi cầm tách trà, kể một dòng theo chương trình
  await delay(1700);
  sit.setFrame(1);
  await caption(`tv.${program}`);

  // 4. Buổi tối trở đi thì ngủ gật
  if (o.slot >= 2) {
    sit.setFrame(2);
    await caption("tv.doze");
  }

  // 5. Tắt TV, đứng dậy
  flicker.stop();
  await tween([pic, glow, sit], { alpha: 0 }, 400);
  [pic, glow, sit].forEach((x) => x.destroy());
  o.player.setVisible(true);
}
