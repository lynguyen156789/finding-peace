import Phaser from "phaser";
import aptData from "../../data/apartments.json";
import { Character } from "../entities/Character";
import { SLOT_TINT, advanceSlot } from "../core/Clock";
import { GameState } from "../core/GameState";
import { loadGame, saveGame } from "../core/Save";
import { t } from "../core/i18n";
import { prepareWatering, runWatering } from "../activities/Watering";
import { prepareSleep, runSleep } from "../activities/Sleep";
import { runWatchTv } from "../activities/WatchTv";
import { prepareCooking, randomDish, runCooking } from "../activities/Cook";
import { prepareEating, runEating } from "../activities/Eat";
import { prepareWardrobe, runWardrobe } from "../activities/Wardrobe";
import { Dialogue } from "../ui/Dialogue";
import { ClockIcon } from "../ui/ClockIcon";

const SCALE = 1280 / aptData.imageSize[0]; // ảnh gốc 2304 -> khung game 1280

type Apt = (typeof aptData.apartments)[keyof typeof aptData.apartments];
type Hotspot = Apt["hotspots"][number] & { advance?: boolean; activity?: string };

/** Căn hộ studio của nhân vật (Phần 1: độc thân). */
export class HomeScene extends Phaser.Scene {
  private state!: GameState;
  private apt!: Apt;
  private player!: Character;
  private tint!: Phaser.GameObjects.Rectangle;
  private dialogue!: Dialogue;
  private clock!: ClockIcon;
  private busy = false;

  constructor() {
    super("Home");
  }

  create(): void {
    this.state = loadGame();
    if (this.state.gender) {
      prepareSleep(this.state.gender); // tải trước tranh các cảnh riêng
      prepareWatering(this.state.gender);
      prepareCooking(this.state.gender);
      prepareEating(this.state.gender);
      prepareWardrobe(this.state.gender);
    }
    this.apt = aptData.apartments[String(this.state.apartment) as keyof typeof aptData.apartments];

    this.add.image(640, 360, `apt-${this.state.apartment}`).setDisplaySize(1280, 720).setDepth(-1000);
    this.player = new Character(this, this.apt.start[0], this.apt.start[1], this.state.gender!);
    this.tint = this.add.rectangle(640, 360, 1280, 720, 0xffffff, 0).setDepth(10000);

    const ui = document.getElementById("ui")!;
    ui.replaceChildren();
    this.dialogue = new Dialogue(ui);
    this.clock = new ClockIcon(ui);
    this.applyTime(false);

    this.input.on("pointerdown", (p: Phaser.Input.Pointer) => this.onTap(p.worldX, p.worldY));

    void this.say(t("intro.wake"));
  }

  /** Đổi rect theo ảnh gốc sang tọa độ khung game. */
  private rectOf(h: Hotspot): { x: number; y: number; w: number; h: number } {
    const [x, y, w, hh] = h.rect;
    return { x: x * SCALE, y: y * SCALE, w: w * SCALE, h: hh * SCALE };
  }

  private onTap(x: number, y: number): void {
    if (this.dialogue.isOpen || this.busy) return; // clip tự chạy, không bỏ qua được

    const hotspot = (this.apt.hotspots as Hotspot[]).find((h) => {
      const r = this.rectOf(h);
      return x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
    });
    if (hotspot) {
      void this.doActivity(hotspot);
      return;
    }
    const f = aptData.floor;
    if (y < f.minY) return;
    void this.player.walkTo(Phaser.Math.Clamp(x, f.minX, f.maxX), Phaser.Math.Clamp(y, f.minY, f.maxY));
  }

  private async doActivity(h: Hotspot): Promise<void> {
    this.busy = true;
    const r = this.rectOf(h);
    const f = aptData.floor;
    await this.player.walkTo(Phaser.Math.Clamp(r.x + r.w / 2, f.minX, f.maxX), f.standY);

    if (h.action === "sleep") {
      await this.doSleep(h);
      return;
    }

    if (h.action === "watch") {
      await runWatchTv(this, {
        gender: this.state.gender!,
        seat: this.apt.sofa,
        tv: this.apt.tv,
        slot: this.state.slot,
        variant: this.state.day + this.state.slot,
        player: this.player,
        dialogue: this.dialogue,
      });
      await this.finishSlot(h, true);
      this.busy = false;
      return;
    }

    if (h.action === "cook") {
      const dish = randomDish();
      await this.doCutscene(h, () => runCooking(this.state.gender!, dish, this.dialogue));
      return;
    }

    if (h.action === "wardrobe") {
      await this.doCutscene(h, () => runWardrobe(this.state.gender!, this.dialogue));
      return;
    }

    if (h.action === "eat") {
      const dish = randomDish();
      await this.doCutscene(h, () => runEating(this.state.gender!, dish, this.dialogue));
      return;
    }

    if (h.activity === "water") {
      await this.doCutscene(h, () => runWatering(this.state.gender!, this.dialogue));
      return;
    }

    await this.dialogue.show(t(h.textKey));

    if (h.advance === false) {
      this.busy = false;
      return;
    }
    await this.finishSlot(h, true);
    this.busy = false;
  }

  /** Giường: ban đêm là đi ngủ (đủ khung), ban ngày là nghỉ một lát (dừng sau khi đắp chăn). */
  private async doSleep(h: Hotspot): Promise<void> {
    const full = this.state.slot === 3;
    await this.doCutscene(h, () => runSleep(this.state.gender!, full, this.dialogue));
  }

  /**
   * Cảnh riêng (chuỗi tranh): chạy tới lúc màn đen, đổi giờ/ngày lúc đó, rồi mờ về căn hộ.
   * Mỗi cảnh trả về hàm reveal() để mờ màn đen đi.
   */
  private async doCutscene(h: Hotspot, run: () => Promise<() => Promise<void>>): Promise<void> {
    const reveal = await run();
    const newDay = await this.finishSlot(h, false);
    await reveal();
    if (newDay) await this.dialogue.show(t("day.new", { day: this.state.day }));
    this.busy = false;
  }

  /** Ghi khoảnh khắc, sang khung giờ kế, tự lưu. Trả về true nếu sang ngày mới. */
  private async finishSlot(h: Hotspot, animate: boolean): Promise<boolean> {
    if (h.moment && !this.state.moments.includes(h.moment)) this.state.moments.push(h.moment);
    const newDay = advanceSlot(this.state);
    saveGame(this.state);
    this.applyTime(animate);
    if (animate && newDay) await this.dialogue.show(t("day.new", { day: this.state.day }));
    return newDay;
  }

  private async say(text: string): Promise<void> {
    this.busy = true;
    await this.dialogue.show(text);
    this.busy = false;
  }

  private applyTime(animate: boolean): void {
    const [color, alpha] = SLOT_TINT[this.state.slot];
    if (animate) {
      this.tint.setFillStyle(color, this.tint.fillAlpha);
      this.tweens.add({ targets: this.tint, fillAlpha: alpha, duration: 700 });
    } else {
      this.tint.setFillStyle(color, alpha);
    }
    this.clock.set(this.state.slot);
  }
}
