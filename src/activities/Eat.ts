import { Gender } from "../core/GameState";
import { t } from "../core/i18n";
import { Dialogue } from "../ui/Dialogue";
import { Dish, trayFile } from "./Cook";
import { fadeTo, openCutscene, preloadImages, wait } from "./Cutscene";

/**
 * Clip ăn cơm (cảnh bàn ăn riêng), tự chạy, không có nút bỏ qua.
 * Khay món đang ăn → nhân vật ngồi ăn ở bàn tròn. Chỉ một câu độc thoại ngắn.
 */

const eatFile = (g: Gender) => `eat-${g}.webp`;

export function prepareEating(gender: Gender): void {
  preloadImages([eatFile(gender)]);
}

export async function runEating(gender: Gender, dish: Dish, dialogue: Dialogue): Promise<() => Promise<void>> {
  prepareEating(gender);
  preloadImages([trayFile(dish)]);
  const { wrap, black, show } = openCutscene();

  await show(trayFile(dish), 800);
  await wait(900);
  await show(eatFile(gender), 1400);
  await dialogue.show(t(`dish.${dish.id}.eat`));
  await wait(1500);
  await fadeTo(black, 1, 800);

  return async () => {
    await fadeTo(black, 0, 700);
    wrap.remove();
  };
}
