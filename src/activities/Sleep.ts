import { Gender } from "../core/GameState";
import { t } from "../core/i18n";
import { Dialogue } from "../ui/Dialogue";

/**
 * Clip ngủ, tự chạy từ đầu đến cuối, không có nút bỏ qua, người chơi không phải làm gì.
 * Chuyển động là VIDEO thật (hai clip nối tiếp):
 *   A: ngồi mép giường → bỏ dép → nằm xuống
 *   B: nằm → kéo chăn lên tới vai
 * rồi chuyển mờ sang tranh nhắm mắt, tắt đèn (chỉ khi đi ngủ đêm).
 * full = false là "nghỉ một lát" ban ngày: dừng sau khi đắp chăn.
 * Lời thoại là độc thoại, chữ trắng ở dưới màn hình.
 */

const BASE = "assets/cutscenes";
const clipCache = new Map<string, { a: HTMLVideoElement; b: HTMLVideoElement }>();

function makeVideo(src: string): HTMLVideoElement {
  const v = document.createElement("video");
  v.className = "cut-layer";
  v.muted = true; // video không có tiếng; muted + playsinline mới tự phát được trên điện thoại
  v.playsInline = true;
  v.setAttribute("muted", "");
  v.setAttribute("playsinline", "");
  v.preload = "auto";
  v.src = src;
  v.load();
  return v;
}

/** Gọi sớm (khi vào căn hộ) để video kịp tải trước khi người chơi bấm vào giường. */
export function prepareSleepClips(gender: Gender): void {
  if (clipCache.has(gender)) return;
  clipCache.set(gender, {
    a: makeVideo(`${BASE}/sleep-${gender}-a.mp4`),
    b: makeVideo(`${BASE}/sleep-${gender}-b.mp4`),
  });
}

const wait = (ms: number) => new Promise<void>((res) => window.setTimeout(res, ms));

function layer(tag: "div" | "img", cls = "cut-layer"): HTMLElement {
  const e = document.createElement(tag);
  e.className = cls;
  return e;
}

/** Đổi độ mờ bằng CSS transition, xong khi hết thời gian. */
async function fadeTo(el: HTMLElement, opacity: number, ms: number): Promise<void> {
  el.style.transition = `opacity ${ms}ms ease`;
  void el.offsetWidth; // ép trình duyệt tính lại để transition chạy
  el.style.opacity = String(opacity);
  await wait(ms);
}

/** Phát một clip tới hết. Trả về false nếu video không phát được (để dùng ảnh tĩnh thay thế). */
async function playClip(v: HTMLVideoElement, onTime: (ms: number) => void): Promise<boolean> {
  v.currentTime = 0;
  try {
    await v.play();
  } catch {
    return false;
  }
  return new Promise<boolean>((resolve) => {
    let timer = 0;
    const tick = () => {
      onTime(v.currentTime * 1000);
      timer = window.setTimeout(tick, 100);
    };
    tick();
    const done = (ok: boolean) => {
      window.clearTimeout(timer);
      resolve(ok);
    };
    v.addEventListener("ended", () => done(true), { once: true });
    v.addEventListener("error", () => done(false), { once: true });
  });
}

export async function runSleep(gender: Gender, full: boolean, dialogue: Dialogue): Promise<() => Promise<void>> {
  prepareSleepClips(gender);
  const clips = clipCache.get(gender)!;
  const ui = document.getElementById("ui")!;

  const wrap = layer("div", "cutscene");
  ui.appendChild(wrap);
  const black = layer("div", "cut-black");
  black.style.opacity = "0";
  wrap.appendChild(black);

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
  const okA = await Promise.race([
    (async () => {
      const p = playClip(clips.a, (ms) => {
        if (said === 0) {
          said = 1;
          say("sleep.sit");
        } else if (said === 1 && ms > 3400) {
          said = 2;
          say("sleep.lie");
        }
      });
      void fadeTo(clips.a, 1, 400);
      return p;
    })(),
  ]);
  if (!okA) {
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
