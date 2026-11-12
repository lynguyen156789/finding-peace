import Phaser from "phaser";
import { t } from "../core/i18n";

/** Tưới cây: kéo bình nước tới chỗ cây và giữ một chút. Luôn hoàn thành, có nút "làm nhanh". */
export function runWatering(
  scene: Phaser.Scene,
  target: { x: number; y: number; w: number; h: number },
  ui: HTMLElement,
): Promise<void> {
  return new Promise((resolve) => {
    const startX = Phaser.Math.Clamp(target.x - 220, 120, 1160);
    const startY = 560;
    const can = scene.add.image(startX, startY, "ui-watering-can").setScale(0.5).setDepth(9000);
    can.setInteractive({ draggable: true });
    scene.input.setDraggable(can);

    // Một vệt xanh nhạt phủ lên chỗ cây khi đang tưới.
    const wet = scene.add
      .rectangle(target.x + target.w / 2, target.y + target.h / 2, target.w, target.h, 0x8fb4c9, 0)
      .setDepth(8999);

    let progress = 0; // ms đã giữ bình trên vùng cây
    let done = false;
    const NEED_MS = 1100;
    const zone = new Phaser.Geom.Rectangle(target.x - 40, target.y - 40, target.w + 80, target.h + 80);
    const inside = () => Phaser.Geom.Rectangle.Contains(zone, can.x, can.y);

    can.on("drag", (_p: Phaser.Input.Pointer, x: number, y: number) => {
      can.setPosition(x, y);
      can.setAngle(inside() ? -22 : 0); // nghiêng bình khi tới cây
    });

    const drops = scene.time.addEvent({
      delay: 90,
      loop: true,
      callback: () => {
        if (done || !inside()) return;
        const d = scene.add.image(can.x + 78, can.y - 6, "ui-drop").setScale(0.6).setDepth(9000);
        scene.tweens.add({ targets: d, y: d.y + 80, alpha: 0, duration: 450, onComplete: () => d.destroy() });
      },
    });

    const tick = scene.time.addEvent({
      delay: 50,
      loop: true,
      callback: () => {
        if (done || !inside()) return;
        progress += 50;
        wet.setFillStyle(0x8fb4c9, 0.22 * (progress / NEED_MS));
        if (progress >= NEED_MS) finish();
      },
    });

    const btn = document.createElement("button");
    btn.className = "quick";
    btn.textContent = t("activity.quick");
    btn.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
      finish();
    });
    ui.appendChild(btn);

    function finish(): void {
      if (done) return;
      done = true;
      drops.remove();
      tick.remove();
      btn.remove();
      scene.tweens.add({
        targets: [can, wet],
        alpha: 0,
        duration: 350,
        onComplete: () => {
          can.destroy();
          wet.destroy();
          resolve();
        },
      });
    }
  });
}
