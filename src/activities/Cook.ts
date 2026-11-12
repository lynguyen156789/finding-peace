import { Gender } from "../core/GameState";
import { t } from "../core/i18n";
import { Dialogue } from "../ui/Dialogue";
import { fadeTo, openCutscene, preloadImages, wait } from "./Cutscene";

/**
 * Clip nấu ăn (cảnh bếp riêng), tự chạy từ đầu đến cuối, không có nút bỏ qua.
 * Mỗi lần nấu ngẫu nhiên một món. Chuỗi tranh chuyển mờ chậm:
 *   1 chuẩn bị → 2 chiên/xào (món mặn) hoặc 3 nấu nước (món canh/mì/cháo) → khay món thành phẩm.
 * Chỉ một câu độc thoại ở đầu (nói tên món), còn lại để hình kể.
 */

export interface Dish {
  id: string;
  /** fry: chiên/xào ở chảo; soup: nấu ở nồi. */
  kind: "fry" | "soup";
}

export const DISHES: Dish[] = [
  { id: "egg-canh", kind: "fry" },
  { id: "tofu", kind: "fry" },
  { id: "pork", kind: "fry" },
  { id: "fish", kind: "fry" },
  { id: "noodle", kind: "soup" },
];

export const randomDish = (): Dish => DISHES[Math.floor(Math.random() * DISHES.length)];
export const dishById = (id: string): Dish => DISHES.find((d) => d.id === id) ?? DISHES[0];
export const trayFile = (d: Dish) => (d.id === "egg-canh" ? "cook-tray.webp" : `tray-${d.id}.webp`);

const stepFile = (g: Gender, n: number) => `cook-${g}-${n}.webp`;

export function prepareCooking(gender: Gender): void {
  preloadImages([1, 2, 3].map((n) => stepFile(gender, n)));
  preloadImages(DISHES.map(trayFile));
}

export async function runCooking(gender: Gender, dish: Dish, dialogue: Dialogue): Promise<() => Promise<void>> {
  prepareCooking(gender);
  const { wrap, black, show } = openCutscene();

  await show(stepFile(gender, 1), 800);
  await dialogue.show(t(`dish.${dish.id}.cook`));
  await show(stepFile(gender, dish.kind === "fry" ? 2 : 3), 1400);
  await wait(1200);
  await show(trayFile(dish), 1600);
  await wait(1800);
  await fadeTo(black, 1, 800);

  // Màn đang đen hoàn toàn: bên gọi cập nhật ngày/giờ rồi gọi reveal() để mờ về căn hộ.
  return async () => {
    await fadeTo(black, 0, 700);
    wrap.remove();
  };
}
