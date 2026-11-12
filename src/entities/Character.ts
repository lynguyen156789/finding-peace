import Phaser from "phaser";

const TEX = {
  head: "char-head",
  torso: "char-torso",
  arm: "char-arm",
  leg: "char-leg",
};

/** Tạo texture placeholder từng bộ phận (sẽ thay bằng tranh gouache cắt rời). */
export function makeCharacterTextures(scene: Phaser.Scene): void {
  if (scene.textures.exists(TEX.head)) return;
  const g = scene.add.graphics();

  g.fillStyle(0xf1d9bd, 1).fillCircle(26, 26, 22);
  g.fillStyle(0x3a2a22, 1).fillCircle(19, 24, 2.5).fillCircle(33, 24, 2.5); // hai chấm mắt
  g.fillStyle(0xe6a39a, 0.85).fillCircle(14, 33, 4.5).fillCircle(38, 33, 4.5); // má hồng
  g.generateTexture(TEX.head, 52, 52);
  g.clear();

  g.fillStyle(0x6b7a45, 1).fillRoundedRect(0, 0, 46, 92, 14); // áo rộng
  g.generateTexture(TEX.torso, 46, 92);
  g.clear();

  g.fillStyle(0x5d6b3b, 1).fillRoundedRect(0, 0, 11, 58, 5);
  g.generateTexture(TEX.arm, 11, 58);
  g.clear();

  g.fillStyle(0xc9b48e, 1).fillRoundedRect(0, 0, 9, 42, 4); // chân gầy
  g.generateTexture(TEX.leg, 9, 42);
  g.destroy();
}

const STEP_MS = 140; // ~7 khung hình/giây

export class Character extends Phaser.GameObjects.Container {
  private moveTween?: Phaser.Tweens.Tween;
  private stepTimer?: Phaser.Time.TimerEvent;
  private facing = 1;
  private phase = 0;

  private head: Phaser.GameObjects.Image;
  private torso: Phaser.GameObjects.Image;
  private armL: Phaser.GameObjects.Image;
  private armR: Phaser.GameObjects.Image;
  private legL: Phaser.GameObjects.Image;
  private legR: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    // Gốc (0,0) là bàn chân. Thứ tự vẽ: tay sau, chân, thân, đầu, tay trước.
    this.armL = scene.add.image(-24, -128, TEX.arm).setOrigin(0.5, 0.08);
    this.legL = scene.add.image(-9, -42, TEX.leg).setOrigin(0.5, 0);
    this.legR = scene.add.image(9, -42, TEX.leg).setOrigin(0.5, 0);
    this.torso = scene.add.image(0, -40, TEX.torso).setOrigin(0.5, 1);
    this.head = scene.add.image(0, -152, TEX.head);
    this.armR = scene.add.image(24, -128, TEX.arm).setOrigin(0.5, 0.08);
    this.add([this.armL, this.legL, this.legR, this.torso, this.head, this.armR]);
    scene.add.existing(this);
    this.refresh();
  }

  /** Đi tới (x, y). Promise xong khi đến nơi hoặc bị hủy. */
  walkTo(x: number, y: number, speed = 280): Promise<void> {
    this.moveTween?.stop();
    const dist = Phaser.Math.Distance.Between(this.x, this.y, x, y);
    if (Math.abs(x - this.x) > 4) this.facing = x < this.x ? -1 : 1;
    this.startSteps();

    return new Promise((resolve) => {
      const finish = () => {
        this.stopSteps();
        resolve();
      };
      this.moveTween = this.scene.tweens.add({
        targets: this,
        x,
        y,
        duration: Math.max(120, (dist / speed) * 1000),
        ease: "Sine.easeInOut",
        onUpdate: () => this.refresh(),
        onComplete: finish,
        onStop: finish,
      });
    });
  }

  private startSteps(): void {
    this.stepTimer?.remove();
    this.phase = 0;
    this.applyPose();
    this.stepTimer = this.scene.time.addEvent({
      delay: STEP_MS,
      loop: true,
      callback: () => {
        this.phase = (this.phase + 1) % 4;
        this.applyPose();
      },
    });
  }

  private stopSteps(): void {
    this.stepTimer?.remove();
    this.stepTimer = undefined;
    this.phase = 0;
    this.applyPose(true);
  }

  /** 4 khung: bước trái, đứng, bước phải, đứng. Đổi theo từng khung, không nội suy. */
  private applyPose(idle = false): void {
    const swing = idle ? 0 : [22, 0, -22, 0][this.phase];
    const lift = idle ? 0 : [0, 3, 0, 3][this.phase];
    this.legL.setAngle(swing);
    this.legR.setAngle(-swing);
    this.armL.setAngle(-swing * 0.7);
    this.armR.setAngle(swing * 0.7);
    this.torso.y = -40 - lift;
    this.head.y = -152 - lift;
    this.armL.y = -128 - lift;
    this.armR.y = -128 - lift;
  }

  private refresh(): void {
    this.setDepth(this.y);
    const s = 0.8 + ((this.y - 430) / 260) * 0.3; // gần hơn thì to hơn một chút
    this.setScale(this.facing * s, s);
  }
}
