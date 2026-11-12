import { Gender } from "../core/GameState";
import { t } from "../core/i18n";
import { Dialogue } from "../ui/Dialogue";
import { fadeTo, openCutscene, preloadImages, wait } from "./Cutscene";

/**
 * Clip ngủ, tự chạy từ đầu đến cuối, không có nút bỏ qua, người chơi không phải làm gì.
 * Chuỗi 5 tranh chuyển mờ chậm (không dùng video):
 *   1 ngồi mép giường (đi dép) → 2 nằm xuống, chân trần → 3 chăn tới ngực → 4 chăn tới vai
 *   → 5 nhắm mắt, tắt đèn, ánh trăng (chỉ khi đi ngủ đêm).
 * full = false là "nghỉ một lát" ban ngày: dừng sau khi đắp chăn.
 * Lời thoại là độc thoại, chữ trắng ở dưới màn hình.
 */

const file = (g: Gender, n: number) => `sleep-${g}-${n}.webp`;

/** Gọi sớm (khi vào căn hộ) để tranh kịp tải trước khi người chơi bấm vào giường. */
export function prepareSleep(gender: Gender): void {
  preloadImages([1, 2, 3, 4, 5].map((n) => file(gender, n)));
}

export async function runSleep(gender: Gender, full: boolean, dialogue: Dialogue): Promise<() => Promise<void>> {
  prepareSleep(gender);
  const { wrap, black, show } = openCutscene();

  await show(file(gender, 1), 700); // ngồi ở mép giường, đèn ngủ sáng
  await dialogue.show(t("sleep.sit"));
  await show(file(gender, 2), 1000); // nằm xuống
  await dialogue.show(t("sleep.lie"));
  await show(file(gender, 3), 900); // chăn kéo tới ngực
  await show(file(gender, 4), 1100); // chăn kéo tới vai
  await dialogue.show(t(full ? "sleep.covered" : "sleep.rest"));

  if (full) {
    await show(file(gender, 5), 1800); // nhắm mắt, đèn tắt, chỉ còn ánh trăng
    await dialogue.show(t("sleep.eyes_closed"));
    await fadeTo(black, 1, 900);
  } else {
    await wait(300);
    await fadeTo(black, 1, 500);
  }

  // Màn đang đen hoàn toàn: bên gọi cập nhật ngày/giờ rồi gọi reveal() để mờ về căn hộ.
  return async () => {
    await fadeTo(black, 0, 800);
    wrap.remove();
  };
}
