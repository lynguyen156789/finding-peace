import Phaser from "phaser";
import charData from "../../data/characters.json";
import { Gender } from "../core/GameState";
import { isReducedMotion } from "../core/Settings";

export const CHARACTERS = charData.characters;

/** Nạp spritesheet (nhìn ngang và chính diện) của cả hai nhân vật. Gọi trong preload. */
export function loadCharacterSheets(scene: Phaser.Scene): void {
  for (const [id, c] of Object.entries(CHARACTERS)) {
    for (const view of ["side", "front", "sit"] as const) {
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

  /** Hệ số cao thêm khi thở (1 = bình thường); gốc ở chân nên chân không trượt. */
  private breath = { k: 1 };
  private breathTween?: Phaser.Tweens.Tween;
  private baseScale = 1;

  constructor(scene: Phaser.Scene, x: number, y: number, gender: Gender) {
    super(scene, x, y, `char-${gender}-front`, 0);
    this.id = gender;
    this.setOrigin(0.5, 0.98);
    scene.add.existing(this);
    this.play(`${gender}-idle`);
    this.refresh();
    this.startBreathing();
  }

  /** Thở nhẹ khi đứng yên: cao lên khoảng 1,2% rồi hạ xuống, chậm. Bỏ qua nếu người chơi bật giảm chuyển động. */
  private startBreathing(): void {
    if (isReducedMotion()) return;
    this.breathTween?.stop();
    this.breath.k = 1;
    this.breathTween = this.scene.tweens.add({
      targets: this.breath,
      k: 1.012,
      duration: 1900,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      onUpdate: () => this.applyScale(),
    });
  }

  private stopBreathing(): void {
    this.breathTween?.stop();
    this.breathTween = undefined;
    this.breath.k = 1;
    this.applyScale();
  }

  private applyScale(): void {
    this.setScale(this.baseScale, this.baseScale * this.breath.k);
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
    this.stopBreathing(); // đang đi thì không thở

    return new Promise((resolve) => {
      const finish = () => {
        this.setFlipX(false);
        this.play(`${this.id}-idle`); // dừng lại thì quay mặt về phía người chơi
        this.startBreathing();
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
    this.baseScale = 0.44 + ((this.y - 410) / 280) * 0.16;
    this.applyScale();
  }
}
