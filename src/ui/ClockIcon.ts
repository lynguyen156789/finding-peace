/** Biểu tượng giờ: bốn tranh gouache (sáng, trưa/chiều, hoàng hôn, đêm). Không hiện chữ số. */
export class ClockIcon {
  private el: HTMLImageElement;

  constructor(root: HTMLElement) {
    this.el = document.createElement("img");
    this.el.className = "clock";
    this.el.alt = "";
    root.appendChild(this.el);
  }

  set(slot: number): void {
    this.el.src = `assets/ui/clock-${slot}.webp`;
  }
}
