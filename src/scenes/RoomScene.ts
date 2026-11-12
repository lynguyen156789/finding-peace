import Phaser from "phaser";
import roomData from "../../data/room.json";
import { Character } from "../entities/Character";
import { SLOT_TINT, advanceSlot } from "../core/Clock";
import { GameState } from "../core/GameState";
import { loadGame, saveGame } from "../core/Save";
import { t } from "../core/i18n";
import { runWatering } from "../activities/Watering";
import { Dialogue } from "../ui/Dialogue";
import { ClockIcon } from "../ui/ClockIcon";

type Hotspot = (typeof roomData.hotspots)[number];

export class RoomScene extends Phaser.Scene {
  private state!: GameState;
  private player!: Character;
  private tint!: Phaser.GameObjects.Rectangle;
  private dialogue!: Dialogue;
  private clock!: ClockIcon;
  private busy = false;

  constructor() {
    super("Room");
  }

  create(): void {
    this.state = loadGame();

    this.add.image(640, 360, "room").setDisplaySize(1280, 720).setDepth(-1000);
    this.player = new Character(this, roomData.start.x, roomData.start.y);
    this.tint = this.add.rectangle(640, 360, 1280, 720, 0xffffff, 0).setDepth(10000);

    const ui = document.getElementById("ui")!;
    ui.replaceChildren();
    this.dialogue = new Dialogue(ui);
    this.clock = new ClockIcon(ui);
    this.applyTime(false);

    this.input.on("pointerdown", (p: Phaser.Input.Pointer) => this.onTap(p.worldX, p.worldY));

    void this.say(t("intro.wake") + " " + t("tap.hint"));
  }

  private onTap(x: number, y: number): void {
    if (this.dialogue.isOpen) {
      this.dialogue.close(); // chạm bất kỳ đâu để đóng hộp thoại
      return;
    }
    if (this.busy) return;

    const hotspot = roomData.hotspots.find(
      (h) => x >= h.rect[0] && x <= h.rect[0] + h.rect[2] && y >= h.rect[1] && y <= h.rect[1] + h.rect[3],
    );
    if (hotspot) {
      void this.doActivity(hotspot);
    } else {
      const f = roomData.floor;
      if (y < f.minY) return;
      void this.player.walkTo(Phaser.Math.Clamp(x, f.minX, f.maxX), Phaser.Math.Clamp(y, f.minY, f.maxY));
    }
  }

  private async doActivity(h: Hotspot): Promise<void> {
    this.busy = true;
    await this.player.walkTo(h.stand[0], h.stand[1]);

    if (h.activity === "water") {
      const [x, y, w, hh] = h.rect;
      await runWatering(this, { x, y, w, h: hh }, document.getElementById("ui")!);
    }

    const sleeping = h.id === "bed" && this.state.slot === 3;
    await this.dialogue.show(t(sleeping ? "hotspot.bed.sleep" : h.textKey));

    if (!this.state.moments.includes(h.moment)) this.state.moments.push(h.moment);
    const newDay = advanceSlot(this.state);
    saveGame(this.state);
    this.applyTime(true);
    if (newDay) await this.dialogue.show(t("day.new", { day: this.state.day }));
    this.busy = false;
  }

  private async say(text: string): Promise<void> {
    this.busy = true;
    await this.dialogue.show(text);
    this.busy = false;
  }

  private applyTime(animate: boolean): void {
    const [color, alpha] = SLOT_TINT[this.state.slot];
    this.tint.setFillStyle(color, this.tint.fillAlpha);
    if (animate) {
      this.tweens.add({ targets: this.tint, fillAlpha: alpha, duration: 700 });
    } else {
      this.tint.setFillStyle(color, alpha);
    }
    this.clock.set(this.state.slot);
  }
}
