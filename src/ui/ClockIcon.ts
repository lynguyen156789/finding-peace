export class ClockIcon {
  private el: HTMLDivElement;

  constructor(root: HTMLElement) {
    this.el = document.createElement("div");
    this.el.className = "clock";
    root.appendChild(this.el);
  }

  set(slot: number): void {
    this.el.dataset.slot = String(slot);
  }
}
