import { Gender } from "../core/GameState";
import { t } from "../core/i18n";
import { Dialogue } from "../ui/Dialogue";
import { BASE, fadeTo, layer, openCutscene, wait } from "./Cutscene";

/**
 * Clip nấu ăn (cảnh bếp riêng), tự chạy từ đầu đến cuối, không có nút bỏ qua.
 * Bữa tối cho một người: cơm + trứng chiên + canh cải. Là chuỗi tranh chuyển mờ chậm
 * (không dùng video để tiết kiệm credit):
 *   1 chuẩn bị rau, trứng → 2 chiên trứng → 3 nấu canh → 4 khay cơm thành phẩm.
 * Lời thoại là độc thoại, chữ trắng ở dưới màn hình.
 */

const STEPS = [
  { img: (g: Gender) => `cook-${g}-1.webp`, say: "cook.start", fade: 800, hold: 0 },
  { img: (g: Gender) => `cook-${g}-2.webp`, say: "cook.fry", fade: 1400, hold: 0 },
  { img: (g: Gender) => `cook-${g}-3.webp`, say: "cook.soup", fade: 1400, hold: 0 },
  { img: () => "cook-tray.webp", say: "cook.done", fade: 1600, hold: 1200 },
];

/** Tải trước tranh vào bộ nhớ đệm của trình duyệt. */
export function prepareCooking(gender: Gender): void {
  for (const s of STEPS) new Image().src = `${BASE}/${s.img(gender)}`;
}

export async function runCooking(gender: Gender, dialogue: Dialogue): Promise<() => Promise<void>> {
  prepareCooking(gender);
  const { wrap, black } = openCutscene();

  for (const s of STEPS) {
    const img = layer("img") as HTMLImageElement;
    img.src = `${BASE}/${s.img(gender)}`;
    img.style.opacity = "0";
    wrap.insertBefore(img, black);
    await fadeTo(img, 1, s.fade);
    void dialogue.show(t(s.say));
    await wait(3000 + s.hold);
  }

  await fadeTo(black, 1, 800);

  // Màn đang đen hoàn toàn: bên gọi cập nhật ngày/giờ rồi gọi reveal() để mờ về căn hộ.
  return async () => {
    await fadeTo(black, 0, 700);
    wrap.remove();
  };
}
