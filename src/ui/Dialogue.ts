/** Hộp thoại kiểu trang sách, HTML phủ lên canvas. Chạm để đóng. */
export class Dialogue {
  private el: HTMLDivElement;
  private resolve: (() => void) | null = null;

  constructor(root: HTMLElement) {
    this.el = document.createElement("div");
    this.el.className = "dialogue";
    root.appendChild(this.el);
    this.el.addEventListener("pointerdown", () => this.close());
  }

  get isOpen(): boolean {
    return this.resolve !== null;
  }

  show(text: string): Promise<void> {
    this.close();
    this.el.textContent = text;
    this.el.classList.add("show");
    return new Promise((res) => (this.resolve = res));
  }

  close(): void {
    this.el.classList.remove("show");
    const r = this.resolve;
    this.resolve = null;
    r?.();
  }
}
