import Phaser from "phaser";
import { makeCharacterTexture } from "../entities/Character";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload(): void {
    this.load.image("room", "assets/room-landscape.png");
  }

  create(): void {
    makeCharacterTexture(this);
    this.scene.start("Room");
  }
}
