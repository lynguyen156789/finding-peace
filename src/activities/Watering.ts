import { Gender } from "../core/GameState";
import { t } from "../core/i18n";
import { Dialogue } from "../ui/Dialogue";
import { fadeTo, openCutscene, preloadImages, wait, revealHome } from "./Cutscene";

/**
 * Clip tưới cây (cảnh ban công riêng), tự chạy, không có nút bỏ qua, người chơi không phải làm gì.
 * Hai tranh chuyển mờ chậm (không dùng video): cây còn héo, nhân vật tay trong túi →
 * nhân vật cầm bình nước, cây tươi lên, hoa nở. Lời thoại là độc thoại, chữ trắng ở dưới màn hình.
 */

const file = (g: Gender, part: "start" | "end") => `water-${g}-${part}.webp`;

/** Gọi sớm để tranh kịp tải trước khi người chơi bấm vào ban công. */
export function prepareWatering(gender: Gender): void {
  preloadImages([file(gender, "start"), file(gender, "end")]);
}

export async function runWatering(gender: Gender, dialogue: Dialogue): Promise<() => Promise<void>> {
  prepareWatering(gender);
  const { wrap, black, show } = openCutscene();

  await show(file(gender, "start"), 800);
  await wait(1200);
  await show(file(gender, "end"), 2000); // tưới xong: cây tươi, hoa nở, nhân vật cầm bình
  await dialogue.show(t("water.pour"));
  await wait(400);
  await fadeTo(black, 1, 700);

  // Màn đang đen hoàn toàn: bên gọi cập nhật ngày/giờ rồi gọi reveal() để mờ về căn hộ.
  return async () => {
    await revealHome(wrap, black, 700);
  };
}
