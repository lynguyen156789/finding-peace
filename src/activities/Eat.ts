import { Gender } from "../core/GameState";
import { t } from "../core/i18n";
import { Dialogue } from "../ui/Dialogue";
import { Dish, trayFile } from "./Cook";
import { fadeTo, openCutscene, preloadImages, wait } from "./Cutscene";

/**
 * Clip ăn cơm rồi rửa bát (cảnh bếp riêng), tự chạy, không có nút bỏ qua.
 * Khay món đang ăn → nhân vật ngồi ăn ở bàn tròn → ra bồn rửa bát (3 tranh).
 * Chỉ một câu độc thoại ngắn lúc ăn; rửa bát để hình kể.
 */

const eatFile = (g: Gender) => `eat-${g}.webp`;
const washFile = (g: Gender, n: number) => `wash-${g}-${n}.webp`;

export function prepareEating(gender: Gender): void {
  preloadImages([eatFile(gender), ...[1, 2, 3].map((n) => washFile(gender, n))]);
}

export async function runEating(gender: Gender, dish: Dish, dialogue: Dialogue, showTray = true): Promise<() => Promise<void>> {
  prepareEating(gender);
  preloadImages([trayFile(dish)]);
  const { wrap, black, show } = openCutscene();

  if (showTray) {
    await show(trayFile(dish), 800);
    await wait(900);
  }
  await show(eatFile(gender), showTray ? 1400 : 800);
  await dialogue.show(t(`dish.${dish.id}.eat`));
  await wait(1500);
  await show(washFile(gender, 1), 1400); // ra bồn, rửa bát
  await wait(1600);
  await show(washFile(gender, 2), 1200); // xả nước
  await wait(1400);
  await show(washFile(gender, 3), 1200); // úp bát lên giá
  await wait(1600);
  await fadeTo(black, 1, 800);

  return async () => {
    await fadeTo(black, 0, 700);
    wrap.remove();
  };
}
