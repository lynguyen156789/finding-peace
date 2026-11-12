import Phaser from "phaser";
import charData from "../../data/characters.json";
import { Gender } from "../core/GameState";

export const CHARACTERS = charData.characters;

/** Nạp spritesheet (nhìn ngang và chính diện) của cả hai nhân vật. Gọi trong preload. */
export function loadCharacterSheets(scene: Phaser.Scene): void {
  for (const [id, c] of Object.entries(CHARACTERS)) {
    for (const view of ["side", "front"] as const) {
      const v = c[view];
      scene.load.spritesheet(`char-${id}-${view}`, v.sheet, { frameWidth: v.frameWidth, frameHeight: v.frameHeight });
    }
  }
}

/** Tạo hoạt ảnh: đứng yên chính diện, đi ngang, đi về phía người chơi. Gọi một lần sau khi nạp xong. */
export function createCharacterAnims(scene: Phaser.Scene): void {
  for (const id of Object.keys(CHARACTERS)) {
    if (scene.anims.exists(`${id}-idle`)) continue;
    scene.anims.create({ key: `${id}-idle`, frames: [{ key: `char-${id}-front`, frame: 0 }], frameRate: 1 });
    for (const view of ["side", "front"] as const) {
      const key = `char-${id}-${view}`;
      scene.anims.create({
        key: `${id}-walk-${view}`,
        frames: scene.anims.generateFrameNumbers(key, { start: 1, end: 6 }),
        frameRate: charData.walkFps,
        repeat: -1,
      });
    }
  }
}

/** Nhân vật người chơi: tranh gouache thật, đi bộ frame-by-frame ~7 fps. */
export class Character extends Phaser.GameObjects.Sprite {
  private moveTween?: Phaser.Tweens.Tween;
  private readonly id: Gender;

  constructor(scene: Phaser.Scene, x: number, y: number, gender: Gender) {
    super(scene, x, y, `char-${gender}-front`, 0);
    this.id = gender;
    this.setOrigin(0.5, 0.98);
    scene.add.existing(this);
    this.play(`${gender}-idle`);
    this.refresh();
  }

  /** Đi tới (x, y). Đi ngang dùng dáng nhìn ngang; đi xuống phía người chơi thì dùng dáng chính diện. */
  walkTo(x: number, y: number, speed = 260): Promise<void> {
    this.moveTween?.stop();
    const dx = x - this.x;
    const dy = y - this.y;
    const dist = Math.hypot(dx, dy);
    const towardViewer = dy > 0 && Math.abs(dy) > Math.abs(dx) * 1.2;

    this.setFlipX(!towardViewer && dx < 0);
    this.play(`${this.id}-walk-${towardViewer ? "front" : "side"}`, true);

    return new Promise((resolve) => {
      const finish = () => {
        this.setFlipX(false);
        this.play(`${this.id}-idle`); // dừng lại thì quay mặt về phía người chơi
        resolve();
      };
      this.moveTween = this.scene.tweens.add({
        targets: this,
        x,
        y,
        duration: Math.max(120, (dist / speed) * 1000),
        ease: "Linear",
        onUpdate: () => this.refresh(),
        onComplete: finish,
        onStop: finish,
      });
    });
  }

  private refresh(): void {
    this.setDepth(this.y);
    // Gần màn hình hơn thì to hơn một chút.
    this.setScale(0.44 + ((this.y - 410) / 280) * 0.16);
  }
}
