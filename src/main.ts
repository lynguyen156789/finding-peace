import "@fontsource/lora/latin-400.css";
import "@fontsource/lora/latin-ext-400.css";
import "@fontsource/lora/vietnamese-400.css";
import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { SetupScene } from "./scenes/SetupScene";
import { HomeScene } from "./scenes/HomeScene";

new Phaser.Game({
  type: Phaser.AUTO,
  parent: "game",
  width: 1280,
  height: 720,
  backgroundColor: "#efe6d4",
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  input: { activePointers: 1 },
  scene: [BootScene, SetupScene, HomeScene],
});
