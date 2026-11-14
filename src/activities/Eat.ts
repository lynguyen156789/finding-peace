import { Gender } from "../core/GameState";
import { t } from "../core/i18n";
import { Dialogue } from "../ui/Dialogue";
import { Dish, trayFile } from "./Cook";
import { Cutscene, fadeTo, openCutscene, preloadImages, revealHome, wait } from "./Cutscene";

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

/** Phần ăn + rửa bát, chạy tiếp trên một cảnh đang mở (sau khi nấu hoặc đứng riêng). Không tự tắt màn. */
export async function playEating(cs: Cutscene, gender: Gender, dish: Dish, dialogue: Dialogue): Promise<void> {
  const { show } = cs;
  prepareEating(gender);
  await show(eatFile(gender), 1400);
  await dialogue.show(t(`dish.${dish.id}.eat`));
  await wait(1500);
  await show(washFile(gender, 1), 1400); // ra bồn, rửa bát
  await wait(1600);
  await show(washFile(gender, 2), 1200); // xả nước
  await wait(1400);
  await show(washFile(gender, 3), 1200); // úp bát lên giá
  await wait(1600);
}

/** Ăn riêng (bấm bàn ăn khi chưa vừa nấu): bắt đầu từ khay món. */
export async function runEating(gender: Gender, dish: Dish, dialogue: Dialogue): Promise<() => Promise<void>> {
  preloadImages([trayFile(dish)]);
  const cs = openCutscene();
  await cs.show(trayFile(dish), 800);
  await wait(900);
  await playEating(cs, gender, dish, dialogue);
  await fadeTo(cs.black, 1, 800);
  return () => revealHome(cs.wrap, cs.black, 700);
}
