import { Gender } from "../core/GameState";
import { t } from "../core/i18n";
import { Dialogue } from "../ui/Dialogue";
import { BASE, fadeTo, layer, makeVideo, openCutscene, playClip, wait } from "./Cutscene";

/**
 * Clip ngủ, tự chạy từ đầu đến cuối, không có nút bỏ qua, người chơi không phải làm gì.
 * Chuyển động là VIDEO thật (hai clip nối tiếp):
 *   A: ngồi mép giường → bỏ dép → nằm xuống
 *   B: nằm → kéo chăn lên tới vai
 * rồi chuyển mờ sang tranh nhắm mắt, tắt đèn (chỉ khi đi ngủ đêm).
 * full = false là "nghỉ một lát" ban ngày: dừng sau khi đắp chăn.
 * Lời thoại là độc thoại, chữ trắng ở dưới màn hình.
 */

const clipCache = new Map<string, { a: HTMLVideoElement; b: HTMLVideoElement }>();

/** Gọi sớm (khi vào căn hộ) để video kịp tải trước khi người chơi bấm vào giường. */
export function prepareSleepClips(gender: Gender): void {
  if (clipCache.has(gender)) return;
  clipCache.set(gender, {
    a: makeVideo(`${BASE}/sleep-${gender}-a.mp4`),
    b: makeVideo(`${BASE}/sleep-${gender}-b.mp4`),
  });
}

export async function runSleep(gender: Gender, full: boolean, dialogue: Dialogue): Promise<() => Promise<void>> {
  prepareSleepClips(gender);
  const clips = clipCache.get(gender)!;
  const { wrap, black } = openCutscene();

  const say = (key: string) => void dialogue.show(t(key));
  const still = (n: number) => {
    const img = layer("img") as HTMLImageElement;
    img.src = `${BASE}/sleep-${gender}-${n}.webp`;
    img.style.opacity = "0";
    wrap.insertBefore(img, black);
    return img;
  };

  // Clip A: ngồi → nằm. Lời độc thoại hiện đúng lúc trong clip.
  clips.a.style.opacity = "0";
  wrap.insertBefore(clips.a, black);
  let said = 0;
  const pA = playClip(clips.a, (ms) => {
    if (said === 0) {
      said = 1;
      say("sleep.sit");
    } else if (said === 1 && ms > 3400) {
      said = 2;
      say("sleep.lie");
    }
  });
  void fadeTo(clips.a, 1, 400);
  if (!(await pA)) {
    // Dự phòng: ảnh tĩnh nằm xuống
    const lie = still(2);
    say("sleep.sit");
    await fadeTo(lie, 1, 1200);
    say("sleep.lie");
    await wait(2500);
  }

  // Clip B: nằm → kéo chăn. Cắt thẳng từ khung cuối của A (hai khung giống nhau).
  clips.b.style.opacity = "1";
  wrap.insertBefore(clips.b, black);
  let saidB = false;
  const okB = await playClip(clips.b, (ms) => {
    if (!saidB && ms > 2600) {
      saidB = true;
      say(full ? "sleep.covered" : "sleep.rest");
    }
  });
  if (!okB) {
    const covered = still(4);
    await fadeTo(covered, 1, 1200);
    say(full ? "sleep.covered" : "sleep.rest");
    await wait(2500);
  }
  clips.a.remove();

  if (full) {
    // Nhắm mắt, tắt đèn, chỉ còn ánh trăng: chuyển mờ chậm
    const closed = still(5);
    await fadeTo(closed, 1, 1800);
    say("sleep.eyes_closed");
    await wait(2800);
    await fadeTo(black, 1, 900);
  } else {
    await wait(600);
    await fadeTo(black, 1, 500);
  }

  // Màn đang đen hoàn toàn: bên gọi cập nhật ngày/giờ rồi gọi reveal() để mờ về căn hộ.
  return async () => {
    await fadeTo(black, 0, 800);
    wrap.remove();
    clips.b.remove();
    clipCache.delete(gender); // lần sau tạo lại video để phát từ đầu
    prepareSleepClips(gender);
  };
}
