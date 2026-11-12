# Kế hoạch MVP và gợi ý kiến trúc (mức cao)

Chưa chốt engine. Yêu cầu: game web 2D, màn ngang 16:9, cảm ứng là chính, tải nhanh, chạy offline sau lần tải đầu (PWA nếu được).

## Gợi ý kỹ thuật (để Claude Code đề xuất và Duc quyết định)
- Ứng viên: Phaser 3 (TypeScript + Vite) hoặc PixiJS; UI bằng HTML/CSS phủ lên canvas.
- Dữ liệu tách khỏi mã: `data/` (JSON): dialogue, recipes, plants, calendar, events, chapters.
- Hệ thống sự kiện: điều kiện đơn giản (ngày, chương, khoảnh khắc đã có) → cảnh/lời thoại.
- Trạng thái game: một đối tượng JSON, tự lưu vào localStorage/IndexedDB sau mỗi khung giờ.
- Cảnh: mỗi địa điểm là một scene riêng; hoạt ảnh nhân vật cắt rời + frame-by-frame 6–8 fps.
- Đa ngôn ngữ: khóa chuỗi (key) ngay từ đầu, tiếng Việt là gốc.

## Cửa kiểm tra theo giai đoạn
1. Thử phong cách: 1 cảnh phòng, 1 nhân vật đi bộ, 1 việc nhà. Đạt khi nhìn vào thấy bình yên, đúng phong cách.
2. Lát cắt chơi được: một ngày trọn vẹn (4 khung giờ) với 4 hoạt động; lưu và tải lại được.
3. Chương mở đầu + Tết: truyện, 3 NPC, nhật ký, trang trí Tết, gói bánh chưng.
4. Mở rộng các chương và địa điểm.
5. Hoàn thiện: nhạc, tiếng Anh, kiểm thử, phát hành miễn phí.

## Bước đầu tiên đề xuất cho Claude Code
1. Đọc CLAUDE.md và docs/GDD.md.
2. Đề xuất stack và cấu trúc thư mục (chờ Duc duyệt).
3. Dựng khung dự án chạy được: một scene phòng ngang 16:9 (dùng assets/room_landscape_16x9.png), nhân vật placeholder di chuyển bằng chạm, khung hộp thoại, vòng lặp 4 khung giờ tối thiểu.
