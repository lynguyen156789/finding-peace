import Phaser from "phaser";
import { newGameState } from "../core/GameState";
import { loadGame, saveGame } from "../core/Save";
import { getSettings, updateSettings, Settings } from "../core/Settings";
import { t } from "../core/i18n";

/** Menu ngoài trước khi vào game: tiếp tục, chơi mới, cài đặt. Nền và nút đều là tranh gouache. */
export class MenuScene extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  create(): void {
    this.cameras.main.setBackgroundColor("#efe6d4");
    const ui = document.getElementById("ui")!;
    ui.replaceChildren();
    const root = el("div", "menu");
    ui.appendChild(root);
    this.showMain(root);
  }

  private showMain(root: HTMLElement): void {
    root.replaceChildren(title(t("menu.title")));
    const col = el("div", "menu-col");
    root.appendChild(col);

    const save = loadGame();
    if (save.gender && save.apartment) {
      col.appendChild(button(t("menu.continue"), () => this.enter("Home")));
    }
    col.appendChild(
      button(t("menu.new"), () => (save.gender && save.apartment ? this.showConfirmNew(root) : this.startNew())),
    );
    col.appendChild(button(t("menu.settings"), () => this.showSettings(root)));
    col.appendChild(button(t("menu.about"), () => this.showAbout(root)));
  }

  /** Trang giới thiệu ngắn về game: một đoạn chữ liền trong một khung. */
  private showAbout(root: HTMLElement): void {
    root.replaceChildren(title(t("about.title")));
    const col = el("div", "menu-col");
    root.appendChild(col);
    const text = title(t("about.text"));
    text.classList.add("menu-about");
    col.appendChild(text);
    col.appendChild(button(t("menu.back"), () => this.showMain(root)));
  }

  /** Chơi mới khi đã có bản lưu: hỏi lại một lần vì bản lưu cũ sẽ mất. */
  private showConfirmNew(root: HTMLElement): void {
    root.replaceChildren(title(t("menu.newConfirm")));
    const col = el("div", "menu-col");
    root.appendChild(col);
    col.appendChild(button(t("menu.newYes"), () => this.startNew()));
    col.appendChild(button(t("menu.back"), () => this.showMain(root)));
  }

  private showSettings(root: HTMLElement): void {
    root.replaceChildren(title(t("settings.title")));
    const col = el("div", "menu-col");
    root.appendChild(col);

    const toggles: [keyof Settings, string][] = [
      ["music", "settings.music"],
      ["sfx", "settings.sfx"],
      ["reduceMotion", "settings.reduceMotion"],
    ];
    for (const [key, labelKey] of toggles) {
      const text = () => `${t(labelKey)}: ${t(getSettings()[key] ? "settings.on" : "settings.off")}`;
      const btn = button(text(), () => {
        updateSettings({ [key]: !getSettings()[key] });
        btn.textContent = text();
      });
      btn.classList.add("menu-btn-wide");
      col.appendChild(btn);
    }
    col.appendChild(button(t("menu.back"), () => this.showMain(root)));
  }

  private startNew(): void {
    saveGame(newGameState()); // xoá bản lưu cũ; cài đặt giữ nguyên
    this.enter("Setup");
  }

  private enter(scene: "Home" | "Setup"): void {
    document.getElementById("ui")!.replaceChildren();
    this.scene.start(scene);
  }
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls: string): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  e.className = cls;
  return e;
}

function title(text: string): HTMLElement {
  const e = el("div", "setup-title menu-title");
  e.textContent = text;
  return e;
}

function button(text: string, onTap: () => void): HTMLButtonElement {
  const b = el("button", "setup-start menu-btn");
  b.textContent = text;
  b.addEventListener("pointerdown", onTap);
  return b;
}
