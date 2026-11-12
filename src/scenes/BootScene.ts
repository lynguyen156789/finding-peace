import Phaser from "phaser";
import { makeCharacterTextures } from "../entities/Character";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload(): void {
    this.load.image("room", "assets/room.webp");
  }

  create(): void {
    makeCharacterTextures(this);
    this.scene.start("Room");
  }
}
