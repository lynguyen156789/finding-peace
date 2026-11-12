import Phaser from "phaser";
import aptData from "../../data/apartments.json";
import { createCharacterAnims, loadCharacterSheets } from "../entities/Character";
import { loadGame } from "../core/Save";

export const UI_IMAGES = ["watering-can", "drop", "tv-drama", "tv-cooking", "tv-weather"] as const;

export class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload(): void {
    for (const [id, apt] of Object.entries(aptData.apartments)) this.load.image(`apt-${id}`, apt.image);
    loadCharacterSheets(this);
    for (const name of UI_IMAGES) this.load.image(`ui-${name}`, `assets/ui/${name}.webp`);
  }

  create(): void {
    createCharacterAnims(this);
    const state = loadGame();
    const forceSetup = new URLSearchParams(window.location.search).has("setup");
    this.scene.start(state.gender && state.apartment && !forceSetup ? "Home" : "Setup");
  }
}
