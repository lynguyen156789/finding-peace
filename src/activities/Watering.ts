import { Gender } from "../core/GameState";
import { t } from "../core/i18n";
import { Dialogue } from "../ui/Dialogue";
import { BASE, fadeTo, layer, makeVideo, openCutscene, playClip, wait } from "./Cutscene";

/**
 * Clip tưới cây, tự chạy, không có nút bỏ qua, người chơi không phải làm gì. Là một VIDEO:
 * nhân vật bỏ tay khỏi túi, ra lấy bình nước, tưới lần lượt ba chậu cây trên ban công, cây tươi lên.
 * Lời thoại là độc thoại, chữ trắng ở dưới màn hình.
 */

const clipCache = new Map<string, HTMLVideoElement>();

/** Gọi sớm để video kịp tải trước khi người chơi bấm vào ban công. */
export function prepareWateringClip(gender: Gender): void {
  if (!clipCache.has(gender)) clipCache.set(gender, makeVideo(`${BASE}/water-${gender}.mp4`));
}

export async function runWatering(gender: Gender, dialogue: Dialogue): Promise<() => Promise<void>> {
  prepareWateringClip(gender);
  const clip = clipCache.get(gender)!;
  const { wrap, black } = openCutscene();
  const say = (key: string) => void dialogue.show(t(key));

  clip.style.opacity = "0";
  wrap.insertBefore(clip, black);
  let said = 0;
  const p = playClip(clip, (ms) => {
    if (said === 0) {
      said = 1;
      say("water.start");
    } else if (said === 1 && ms > 3400) {
      said = 2;
      say("water.pour");
    }
  });
  void fadeTo(clip, 1, 400);
  if (!(await p)) {
    // Dự phòng: ảnh tĩnh sau khi tưới xong
    const img = layer("img") as HTMLImageElement;
    img.src = `${BASE}/water-${gender}-end.webp`;
    img.style.opacity = "0";
    wrap.insertBefore(img, black);
    say("water.start");
    await fadeTo(img, 1, 1200);
    say("water.pour");
    await wait(2500);
  }

  await wait(900);
  await fadeTo(black, 1, 600);

  // Màn đang đen hoàn toàn: bên gọi cập nhật ngày/giờ rồi gọi reveal() để mờ về căn hộ.
  return async () => {
    await fadeTo(black, 0, 700);
    wrap.remove();
    clipCache.delete(gender);
    prepareWateringClip(gender);
  };
}
