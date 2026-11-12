import Phaser from "phaser";

/**
 * Clip tưới cây, tự chạy, không có nút bỏ qua, người chơi không phải làm gì: bình nước bay tới chỗ cây,
 * nghiêng xuống, nước rơi, cây ngấm nước, rồi bình lui đi.
 * (Bản cầm bình bằng tay nhân vật sẽ thay khi có tranh tư thế cầm bình.)
 */
export async function runWatering(
  scene: Phaser.Scene,
  target: { x: number; y: number; w: number; h: number },
): Promise<void> {
  const startX = Phaser.Math.Clamp(target.x - 220, 120, 1160);
  const can = scene.add.image(startX, 560, "ui-watering-can").setScale(0.5).setDepth(9000).setAlpha(0);
  const wet = scene.add
    .rectangle(target.x + target.w / 2, target.y + target.h / 2, target.w, target.h, 0x8fb4c9, 0)
    .setDepth(8999);

  const tween = (targets: object, props: object, duration: number) =>
    new Promise<void>((res) => scene.tweens.add({ targets, ...props, duration, onComplete: () => res() }));

  // Nước rơi từ vòi bình khi đang tưới.
  const drops = scene.time.addEvent({
    delay: 90,
    loop: true,
    paused: true,
    callback: () => {
      const d = scene.add.image(can.x + 78, can.y - 6, "ui-drop").setScale(0.6).setDepth(9000);
      scene.tweens.add({ targets: d, y: d.y + 80, alpha: 0, duration: 450, onComplete: () => d.destroy() });
    },
  });

  const cx = target.x + target.w / 2 - 60;
  const cy = target.y + target.h / 2;
  await tween(can, { alpha: 1 }, 350); // bình hiện ra cạnh nhân vật
  await tween(can, { x: cx, y: cy, angle: -22 }, 1100); // bay tới chỗ cây, nghiêng xuống
  drops.paused = false;
  await tween(wet, { fillAlpha: 0.22 }, 1500); // tưới, cây ngấm nước
  drops.paused = true;
  await tween(can, { x: startX, y: 560, angle: 0, alpha: 0 }, 700); // lui về
  await tween(wet, { alpha: 0 }, 300);

  drops.remove();
  can.destroy();
  wet.destroy();
}
