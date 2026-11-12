import Phaser from "phaser";

export const CHARACTER_TEXTURE = "char-placeholder";

/** Tạo texture placeholder (sẽ thay bằng nhân vật cắt rời ở Lát 1). */
export function makeCharacterTexture(scene: Phaser.Scene): void {
  if (scene.textures.exists(CHARACTER_TEXTURE)) return;
  const g = scene.add.graphics();
  g.fillStyle(0x6b7a45, 1).fillRoundedRect(8, 40, 44, 90, 14); // áo rộng
  g.fillStyle(0xc9b48e, 1).fillRect(18, 128, 8, 30).fillRect(34, 128, 8, 30); // chân gầy
  g.fillStyle(0xf1d9bd, 1).fillCircle(30, 24, 20); // đầu nhỏ
  g.fillStyle(0x3a2a22, 1).fillCircle(24, 22, 2.5).fillCircle(37, 22, 2.5); // hai chấm mắt
  g.fillStyle(0xe6a39a, 0.8).fillCircle(20, 30, 4).fillCircle(41, 30, 4); // má hồng
  g.generateTexture(CHARACTER_TEXTURE, 60, 160);
  g.destroy();
}

export class Character extends Phaser.GameObjects.Image {
  private moveTween?: Phaser.Tweens.Tween;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, CHARACTER_TEXTURE);
    this.setOrigin(0.5, 1);
    scene.add.existing(this);
    this.refreshDepth();
  }

  /** Đi tới (x, y). Promise xong khi đến nơi hoặc bị hủy. */
  walkTo(x: number, y: number, speed = 280): Promise<void> {
    this.moveTween?.stop();
    const dist = Phaser.Math.Distance.Between(this.x, this.y, x, y);
    this.setFlipX(x < this.x);
    return new Promise((resolve) => {
      // Nhún nhẹ theo bước chân (placeholder cho hoạt ảnh đi bộ ở Lát 1).
      const bob = this.scene.tweens.add({
        targets: this,
        angle: { from: -3, to: 3 },
        duration: 160,
        yoyo: true,
        repeat: -1,
      });
      const stopBob = () => {
        bob.stop();
        this.setAngle(0);
      };
      this.moveTween = this.scene.tweens.add({
        targets: this,
        x,
        y,
        duration: Math.max(120, (dist / speed) * 1000),
        ease: "Sine.easeInOut",
        onUpdate: () => this.refreshDepth(),
        onComplete: () => {
          stopBob();
          resolve();
        },
        onStop: () => {
          stopBob();
          resolve();
        },
      });
    });
  }

  private refreshDepth(): void {
    this.setDepth(this.y);
    this.setScale(0.8 + ((this.y - 430) / 260) * 0.3); // gần hơn thì to hơn một chút
  }
}
