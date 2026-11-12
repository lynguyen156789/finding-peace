import Phaser from "phaser";
import aptData from "../../data/apartments.json";
import { CHARACTERS } from "../entities/Character";
import { Gender } from "../core/GameState";
import { loadGame, saveGame } from "../core/Save";
import { t } from "../core/i18n";

/** Màn bắt đầu: chọn nhân vật (nam/nữ) và một trong ba căn hộ studio. Toàn bộ khung/nút là tranh gouache. */
export class SetupScene extends Phaser.Scene {
  constructor() {
    super("Setup");
  }

  create(): void {
    this.cameras.main.setBackgroundColor("#efe6d4");
    const state = loadGame();
    let gender: Gender = state.gender ?? "female";
    let apartment: number = state.apartment ?? 3;

    const ui = document.getElementById("ui")!;
    ui.replaceChildren();
    const root = el("div", "setup");
    ui.appendChild(root);

    const title = el("div", "setup-title");
    title.textContent = t("setup.title");
    root.appendChild(title);

    const body = el("div", "setup-body");
    root.appendChild(body);

    // Cột chọn nhân vật
    const charCol = el("div", "setup-col");
    charCol.appendChild(label(t("setup.character")));
    body.appendChild(charCol);
    const chars = el("div", "setup-row");
    const charCards = new Map<string, HTMLElement>();
    for (const [id, c] of Object.entries(CHARACTERS)) {
      const card = el("div", "card card-char");
      const face = el("div", "char-face");
      face.style.backgroundImage = `url(${c.front.sheet})`;
      face.style.aspectRatio = `${c.front.frameWidth} / ${c.front.frameHeight}`;
      face.style.backgroundSize = "700% 100%"; // 7 khung, chỉ hiện khung 0 (đứng yên)
      card.appendChild(face);
      const name = el("span", "card-name");
      name.textContent = t(c.nameKey);
      card.appendChild(name);
      card.addEventListener("pointerdown", () => {
        gender = id as Gender;
        refresh();
      });
      charCards.set(id, card);
      chars.appendChild(card);
    }
    charCol.appendChild(chars);

    // Cột chọn căn hộ
    const aptCol = el("div", "setup-col");
    aptCol.appendChild(label(t("setup.apartment")));
    body.appendChild(aptCol);
    const apts = el("div", "setup-row");
    const aptCards = new Map<number, HTMLElement>();
    for (const [id, a] of Object.entries(aptData.apartments)) {
      const card = el("div", "card card-apt");
      const img = document.createElement("img");
      img.src = a.thumb;
      img.alt = "";
      card.appendChild(img);
      const name = el("span", "card-name");
      name.textContent = t(a.nameKey);
      card.appendChild(name);
      card.addEventListener("pointerdown", () => {
        apartment = Number(id);
        refresh();
      });
      aptCards.set(Number(id), card);
      apts.appendChild(card);
    }
    aptCol.appendChild(apts);

    const start = el("button", "setup-start");
    start.textContent = t("setup.start");
    start.addEventListener("pointerdown", () => {
      const s = loadGame();
      s.gender = gender;
      s.apartment = apartment;
      saveGame(s);
      ui.replaceChildren();
      this.scene.start("Home");
    });
    root.appendChild(start);

    const refresh = () => {
      charCards.forEach((c, id) => c.classList.toggle("selected", id === gender));
      aptCards.forEach((c, id) => c.classList.toggle("selected", id === apartment));
    };
    refresh();
  }
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls: string): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  e.className = cls;
  return e;
}

function label(text: string): HTMLElement {
  const e = el("div", "setup-label");
  e.textContent = text;
  return e;
}
