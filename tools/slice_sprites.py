"""Tách bảng sprite (một hàng nhân vật trên nền giấy) thành spritesheet có nền trong suốt.

Dùng: python tools/slice_sprites.py <ảnh_vào.png> <ảnh_ra.webp> [số_khung=7] [chiều_cao_khung=480]

Mỗi khung được căn theo thân trên (ngang) và chân chạm đất (dọc), nên khi phát liên tục
nhân vật không bị trượt. Kết quả là một hàng ngang các khung bằng nhau.
"""
import sys

import numpy as np
from PIL import Image
from scipy import ndimage as ndi


def main() -> None:
    src, dst = sys.argv[1], sys.argv[2]
    n_frames = int(sys.argv[3]) if len(sys.argv) > 3 else 7
    frame_h = int(sys.argv[4]) if len(sys.argv) > 4 else 480

    img = np.asarray(Image.open(src).convert("RGB")).astype(np.float32)
    h, w, _ = img.shape

    border = np.concatenate([img[0], img[-1], img[:, 0], img[:, -1]])
    bg = np.median(border, axis=0)
    dist = np.linalg.norm(img - bg, axis=2)

    fg = dist > 22
    fg = ndi.binary_opening(fg, iterations=1)
    lab, n = ndi.label(fg)
    sizes = ndi.sum(fg, lab, range(1, n + 1))
    keep = np.isin(lab, [i + 1 for i, s in enumerate(sizes) if s > 1500])
    fg = ndi.binary_fill_holes(keep)

    # Viền: co mask 2px rồi làm mềm 1px, để không còn quầng màu giấy quanh nhân vật.
    core = ndi.binary_erosion(fg, iterations=2)
    alpha = ndi.gaussian_filter(core.astype(np.float32), sigma=1.0)
    alpha = np.clip(alpha * 1.25 - 0.1, 0, 1)

    # Chia thành n_frames cụm theo các khoảng trống lớn nhất trên trục x.
    cols = fg.any(axis=0)
    xs = np.where(cols)[0]
    gaps = np.diff(xs)
    cut_idx = np.argsort(gaps)[-(n_frames - 1):]
    cuts = sorted(int(xs[i]) + 1 for i in cut_idx)
    bounds = [0] + cuts + [w]

    frames = []
    for i in range(n_frames):
        x0, x1 = bounds[i], bounds[i + 1]
        sub = fg[:, x0:x1]
        ys = np.where(sub.any(axis=1))[0]
        xs_in = np.where(sub.any(axis=0))[0]
        y0, y1 = ys.min(), ys.max() + 1
        bx0, bx1 = x0 + xs_in.min(), x0 + xs_in.max() + 1
        rgba = np.dstack([img, alpha * 255]).astype(np.uint8)[y0:y1, bx0:bx1]
        m = fg[y0:y1, bx0:bx1]
        top_rows = slice(0, int(m.shape[0] * 0.55))
        cx = np.where(m[top_rows].any(axis=0))[0].mean() if m[top_rows].any() else m.shape[1] / 2
        frames.append((rgba, cx, y1))

    # Tỉ lệ chung: theo khung cao nhất để mọi khung cùng kích cỡ.
    max_h = max(f[0].shape[0] for f in frames)
    scale = (frame_h * 0.94) / max_h
    # Độ rộng khung: đủ chứa bước chân dài nhất quanh tâm thân.
    half = max(max(cx, f.shape[1] - cx) for f, cx, _ in frames)
    frame_w = int(np.ceil(half * 2 * scale)) + 8
    sheet = Image.new("RGBA", (frame_w * n_frames, frame_h), (0, 0, 0, 0))

    for i, (rgba, cx, _) in enumerate(frames):
        im = Image.fromarray(rgba, "RGBA")
        im = im.resize((max(1, int(im.width * scale)), max(1, int(im.height * scale))), Image.LANCZOS)
        px = int(frame_w / 2 - cx * scale)
        py = frame_h - im.height - int(frame_h * 0.02)
        sheet.alpha_composite(im, (i * frame_w + max(0, px), py))

    sheet.save(dst, "WEBP", quality=88, method=6)
    print(f"frames={n_frames} frame_size={frame_w}x{frame_h} sheet={sheet.size}")


if __name__ == "__main__":
    main()
