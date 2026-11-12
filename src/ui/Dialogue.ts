/** Hộp thoại kiểu trang sách (khung tranh gouache), HTML phủ lên canvas. */
export class Dialogue {
  private el: HTMLDivElement;
  private resolve: (() => void) | null = null;
  private timer: number | undefined;

  constructor(root: HTMLElement) {
    this.el = document.createElement("div");
    this.el.className = "dialogue";
    root.appendChild(this.el);
  }

  get isOpen(): boolean {
    return this.resolve !== null;
  }

  /**
   * Hiện một dòng. Mặc định tự đóng sau thời gian đủ đọc (clip tự chạy, người chơi không phải bấm);
   * không có cách bấm để bỏ qua. Truyền auto = false chỉ khi thật sự cần chờ (hiện chưa dùng).
   */
  show(text: string, auto = true): Promise<void> {
    this.close();
    this.el.textContent = text;
    this.el.classList.add("show");
    if (auto) {
      const ms = Math.min(6000, Math.max(2200, 1400 + text.length * 55));
      this.timer = window.setTimeout(() => this.close(), ms);
    }
    return new Promise((res) => (this.resolve = res));
  }

  close(): void {
    window.clearTimeout(this.timer);
    this.el.classList.remove("show");
    const r = this.resolve;
    this.resolve = null;
    r?.();
  }
}
