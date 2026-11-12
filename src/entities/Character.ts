import Phaser from "phaser";
import charData from "../../data/characters.json";
import { Gender } from "../core/GameState";

export const CHARACTERS = charData.characters;

/** Nạp spritesheet của cả hai nhân vật (gọi trong preload). */
export function loadCharacterSheets(scene: Phaser.Scene): void {
  for (const [id, c] of Object.entries(CHARACTERS)) {
    scene.load.spritesheet(`char-${id}`, c.sheet, { frameWidth: c.frameWidth, frameHeight: c.frameHeight });
  }
}

/** Tạo hoạt ảnh đứng yên và đi bộ (gọi một lần sau khi nạp xong). */
export function createCharacterAnims(scene: Phaser.Scene): void {
  for (const id of Object.keys(CHARACTERS)) {
    const key = `char-${id}`;
    if (scene.anims.exists(`${key}-walk`)) continue;
    scene.anims.create({ key: `${key}-idle`, frames: [{ key, frame: 0 }], frameRate: 1 });
    scene.anims.create({
      key: `${key}-walk`,
      frames: scene.anims.generateFrameNumbers(key, { start: 1, end: 6 }),
      frameRate: charData.walkFps,
      repeat: -1,
    });
  }
}

/** Nhân vật người chơi: tranh gouache thật, đi bộ frame-by-frame ~7 fps. */
export class Character extends Phaser.GameObjects.Sprite {
  private moveTween?: Phaser.Tweens.Tween;
  private readonly key: string;

  constructor(scene: Phaser.Scene, x: number, y: number, gender: Gender) {
    super(scene, x, y, `char-${gender}`, 0);
    this.key = `char-${gender}`;
    this.setOrigin(0.5, 0.98);
    scene.add.existing(this);
    this.play(`${this.key}-idle`);
    this.refresh();
  }

  /** Đi tới (x, y). Promise xong khi đến nơi hoặc bị hủy. */
  walkTo(x: number, y: number, speed = 260): Promise<void> {
    this.moveTween?.stop();
    const dist = Phaser.Math.Distance.Between(this.x, this.y, x, y);
    if (Math.abs(x - this.x) > 4) this.setFlipX(x < this.x);
    this.play(`${this.key}-walk`, true);

    return new Promise((resolve) => {
      const finish = () => {
        this.play(`${this.key}-idle`);
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
    this.setScale(0.34 + ((this.y - 410) / 280) * 0.12);
  }
}
