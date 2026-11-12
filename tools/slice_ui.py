"""Tách bảng UI gouache (nhiều món trên nền giấy) thành từng ảnh WebP có nền trong suốt.

Dùng: python tools/slice_ui.py <bảng_ui.png> <thư_mục_ra>

Tọa độ BOXES theo ảnh gốc 2304x1296 của bảng UI hiện tại. Nếu sinh bảng mới, chỉnh lại BOXES.
Nền được loại bằng cách tràn từ viền ngoài của mỗi ô; phần bên trong viền kín vẫn giữ nguyên.
"""
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

# tên: (x0, y0, x1, y1, chiều_rộng_xuất)
BOXES = {
    "dialogue":   (95, 80, 1722, 402, 1280),
    "button":     (1805, 150, 2222, 345, 360),
    "clock-0":    (190, 460, 570, 830, 192),
    "clock-1":    (705, 455, 1090, 825, 192),
    "clock-2":    (1220, 460, 1595, 830, 192),
    "clock-3":    (1735, 460, 2110, 830, 192),
    "watering-can": (125, 870, 760, 1215, 360),
    "drop":       (925, 900, 1025, 1045, 40),
    "menu":       (1305, 895, 1610, 1195, 120),
    "ornament":   (1770, 875, 2170, 1200, 200),
}


# Các món có lỗ hở thật (quai bình, cành lá) thì không lấp lỗ.
NO_FILL = {"watering-can", "drop", "ornament"}


# Món toàn màu đậm, không có mảng kem bên trong: mọi vùng màu giấy đều là nền.
FULL_BG = {"watering-can", "drop"}


def cut(img: np.ndarray, box: tuple[int, int, int, int], fill: bool = True,
        is_bg_everywhere: bool = False) -> Image.Image:
    x0, y0, x1, y1 = box
    crop = img[y0:y1, x0:x1]
    bg = np.median(np.concatenate([crop[0], crop[-1], crop[:, 0], crop[:, -1]]), axis=0)
    dist = np.linalg.norm(crop - bg, axis=2)
    is_bg = dist < 20
    lab, _ = ndi.label(is_bg)
    border_labels = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    outside = np.isin(lab, list(border_labels))
    if not fill and is_bg_everywhere:
        outside = is_bg  # vùng giấy kín (lỗ quai) cũng bỏ
    fg = ~outside
    fg = ndi.binary_opening(fg, iterations=1)
    if fill:
        fg = ndi.binary_fill_holes(fg)
    core = ndi.binary_erosion(fg, iterations=1)
    alpha = np.clip(ndi.gaussian_filter(core.astype(np.float32), sigma=0.9) * 1.2 - 0.05, 0, 1)
    rgba = np.dstack([crop, alpha * 255]).astype(np.uint8)
    im = Image.fromarray(rgba, "RGBA")
    ys, xs = np.where(alpha > 0.02)
    return im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))


def main() -> None:
    src, out_dir = sys.argv[1], sys.argv[2]
    os.makedirs(out_dir, exist_ok=True)
    img = np.asarray(Image.open(src).convert("RGB")).astype(np.float32)
    for name, (x0, y0, x1, y1, out_w) in BOXES.items():
        im = cut(img, (x0, y0, x1, y1), fill=name not in NO_FILL, is_bg_everywhere=name in FULL_BG)
        out_h = max(1, round(im.height * out_w / im.width))
        im = im.resize((out_w, out_h), Image.LANCZOS)
        path = os.path.join(out_dir, f"{name}.webp")
        im.save(path, "WEBP", quality=90, method=6)
        print(f"{name}: {im.size}")


if __name__ == "__main__":
    main()
