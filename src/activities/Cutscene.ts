/**
 * Các hàm dùng chung cho cảnh riêng (clip video toàn màn hình, tự chạy, không có nút bỏ qua).
 * Mọi thứ vẽ bằng DOM phủ lên canvas (xem .cutscene trong index.html).
 */
export const BASE = "assets/cutscenes";

export const wait = (ms: number) => new Promise<void>((res) => window.setTimeout(res, ms));

export function layer(tag: "div" | "img", cls = "cut-layer"): HTMLElement {
  const e = document.createElement(tag);
  e.className = cls;
  return e;
}

export function makeVideo(src: string): HTMLVideoElement {
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

/** Đổi độ mờ bằng CSS transition, xong khi hết thời gian. */
export async function fadeTo(el: HTMLElement, opacity: number, ms: number): Promise<void> {
  el.style.transition = `opacity ${ms}ms ease`;
  void el.offsetWidth; // ép trình duyệt tính lại để transition chạy
  el.style.opacity = String(opacity);
  await wait(ms);
}

/**
 * Phát một clip tới hết; onTime được gọi mỗi 100 ms với thời điểm hiện tại (ms) để hiện lời độc thoại đúng lúc.
 * Trả về false nếu video không phát được (để dùng ảnh tĩnh thay thế).
 */
export async function playClip(v: HTMLVideoElement, onTime: (ms: number) => void): Promise<boolean> {
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

/** Tạo lớp phủ cảnh riêng kèm màn đen (dùng để làm mờ vào và ra). */
export function openCutscene(): { wrap: HTMLElement; black: HTMLElement } {
  const ui = document.getElementById("ui")!;
  const wrap = layer("div", "cutscene");
  ui.appendChild(wrap);
  const black = layer("div", "cut-black");
  black.style.opacity = "0";
  wrap.appendChild(black);
  return { wrap, black };
}
