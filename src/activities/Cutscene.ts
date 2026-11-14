/**
 * Các hàm dùng chung cho cảnh riêng (chuỗi tranh toàn màn hình, tự chạy, không có nút bỏ qua).
 * Mọi thứ vẽ bằng DOM phủ lên canvas (xem .cutscene trong index.html).
 */
export const BASE = "assets/cutscenes";

export const wait = (ms: number) => new Promise<void>((res) => window.setTimeout(res, ms));

export function layer(tag: "div" | "img", cls = "cut-layer"): HTMLElement {
  const e = document.createElement(tag);
  e.className = cls;
  return e;
}

/** Đổi độ mờ bằng CSS transition, xong khi hết thời gian. */
export async function fadeTo(el: HTMLElement, opacity: number, ms: number): Promise<void> {
  el.style.transition = `opacity ${ms}ms ease`;
  void el.offsetWidth; // ép trình duyệt tính lại để transition chạy
  el.style.opacity = String(opacity);
  await wait(ms);
}

/** Màn đang đen hoàn toàn: bỏ hết tranh rồi mờ màn đen đi để lộ căn hộ (không lộ lại tranh cuối). */
export async function revealHome(wrap: HTMLElement, black: HTMLElement, ms: number): Promise<void> {
  wrap.querySelectorAll("img").forEach((i) => i.remove());
  await fadeTo(black, 0, ms);
  wrap.remove();
}

/** Tải trước các tranh vào bộ nhớ đệm của trình duyệt. */
export function preloadImages(files: string[]): void {
  for (const f of files) new Image().src = `${BASE}/${f}`;
}

export interface Cutscene {
  wrap: HTMLElement;
  black: HTMLElement;
  show: (file: string, fadeMs: number) => Promise<void>;
}

/** Tạo lớp phủ cảnh riêng kèm màn đen (dùng để làm mờ vào và ra). */
export function openCutscene(): Cutscene {
  const ui = document.getElementById("ui")!;
  const wrap = layer("div", "cutscene");
  ui.appendChild(wrap);
  const black = layer("div", "cut-black");
  black.style.opacity = "0";
  wrap.appendChild(black);

  /** Hiện một tranh mới, chuyển mờ chồng lên tranh trước. */
  const show = async (file: string, fadeMs: number) => {
    const img = layer("img") as HTMLImageElement;
    img.src = `${BASE}/${file}`;
    img.style.opacity = "0";
    wrap.insertBefore(img, black);
    await fadeTo(img, 1, fadeMs);
  };
  return { wrap, black, show };
}
