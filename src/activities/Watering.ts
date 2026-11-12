import Phaser from "phaser";
import { t } from "../core/i18n";

const CAN_TEX = "watering-can";
const DROP_TEX = "water-drop";

function makeTextures(scene: Phaser.Scene): void {
  if (scene.textures.exists(CAN_TEX)) return;
  const g = scene.add.graphics();
  g.fillStyle(0x7d8f6a, 1).fillRoundedRect(8, 14, 54, 38, 8); // thân bình
  g.fillStyle(0x6b7a58, 1).fillRect(56, 18, 28, 7).fillRect(78, 12, 8, 20); // vòi
  g.lineStyle(6, 0x6b7a58, 1).strokeCircle(18, 22, 12); // quai
  g.generateTexture(CAN_TEX, 92, 56);
  g.clear();
  g.fillStyle(0x8fb4c9, 1).fillCircle(5, 5, 5);
  g.generateTexture(DROP_TEX, 10, 10);
  g.destroy();
}

/** Tưới cây: kéo bình nước tới chậu và giữ một chút. Luôn hoàn thành, có nút "làm nhanh". */
export function runWatering(
  scene: Phaser.Scene,
  target: { x: number; y: number; w: number; h: number },
  ui: HTMLElement,
): Promise<void> {
  makeTextures(scene);

  return new Promise((resolve) => {
    const startX = target.x - 120;
    const startY = target.y + target.h + 60;
    const can = scene.add.image(startX, startY, CAN_TEX).setDepth(9000).setInteractive({ draggable: true });
    scene.input.setDraggable(can);

    const flash = scene.add
      .rectangle(target.x + target.w / 2, target.y + target.h / 2, target.w, target.h, 0x8fb4c9, 0)
      .setDepth(8999);

    let progress = 0; // ms đã giữ trên chậu
    let done = false;
    const NEED_MS = 1100;

    const inside = () => Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(target.x - 40, target.y - 40, target.w + 80, target.h + 80), can.x, can.y);

    can.on("drag", (_p: Phaser.Input.Pointer, x: number, y: number) => {
      can.setPosition(x, y);
      can.setAngle(inside() ? -25 : 0); // nghiêng bình khi tới chậu
    });

    const drops = scene.time.addEvent({
      delay: 90,
      loop: true,
      callback: () => {
        if (done || !inside()) return;
        const d = scene.add.image(can.x + 34, can.y + 14, DROP_TEX).setDepth(9000);
        scene.tweens.add({
          targets: d,
          y: d.y + 70,
          alpha: 0,
          duration: 420,
          onComplete: () => d.destroy(),
        });
      },
    });

    const tick = scene.time.addEvent({
      delay: 50,
      loop: true,
      callback: () => {
        if (done || !inside()) return;
        progress += 50;
        flash.setFillStyle(0x8fb4c9, 0.25 * (progress / NEED_MS));
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
        targets: [can, flash],
        alpha: 0,
        duration: 350,
        onComplete: () => {
          can.destroy();
          flash.destroy();
          resolve();
        },
      });
    }
  });
}
