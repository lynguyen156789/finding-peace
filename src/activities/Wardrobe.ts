import { Gender } from "../core/GameState";
import { t } from "../core/i18n";
import { Dialogue } from "../ui/Dialogue";
import { fadeTo, openCutscene, preloadImages, revealHome, wait } from "./Cutscene";

/** Cận cảnh tủ đồ mở (cảnh riêng), tự chạy, không có nút bỏ qua. Chỉ một câu độc thoại. */

const file = (g: Gender) => `wardrobe-${g}.webp`;

export function prepareWardrobe(gender: Gender): void {
  preloadImages([file(gender)]);
}

export async function runWardrobe(gender: Gender, dialogue: Dialogue): Promise<() => Promise<void>> {
  prepareWardrobe(gender);
  const { wrap, black, show } = openCutscene();

  await show(file(gender), 1200);
  await wait(500);
  await dialogue.show(t("wardrobe.look"));
  await wait(1200);
  await fadeTo(black, 1, 800);

  return () => revealHome(wrap, black, 700);
}
