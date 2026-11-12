# Finding Peace

Game 2D cozy/chữa lành, chạy trên trình duyệt (ưu tiên điện thoại, màn ngang 16:9). Kể một chặng đời ở Việt Nam đời thường (miền Bắc): độc thân sống cùng bố mẹ → hôn nhân → có một con. Vui buồn đan xen; bình yên đến từ việc chấp nhận điều đã phải tạm gác và nhận ra điều mình có.

Dev: Duc (làm một mình, indie, Hà Nội), trao đổi bằng tiếng Việt. Trả lời tiếng Việt, code và tên biến bằng tiếng Anh.

## Tài liệu (nguồn chính)
- `docs/GDD.md`: đặc tả game đầy đủ. Đọc trước khi làm bất cứ việc gì.
- `docs/ART_STYLE.md`: phong cách gouache và prompt chuẩn.
- `docs/MVP_PLAN.md`: phạm vi MVP, gợi ý kỹ thuật, cửa kiểm tra.
- `assets/`: ảnh mẫu (xem assets/README.md để tải).

## Cập nhật 2026-11-12 (ưu tiên hơn mô tả cũ bên dưới)
- Cuộc đời chia 2 phần: Phần 1 độc thân, Phần 2 kết hôn. Làm Phần 1 trước; Phần 2 chưa quyết (kể cả em bé).
- Phần 1: sống một mình trong căn hộ studio nhỏ; bố mẹ chỉ có mặt ở căn hộ vào Tết, lễ.
- 3 phương án căn hộ studio, người chơi tự chọn (cùng tác vụ, khác bố cục).
- Nhân vật nam/nữ trong bảng nhân vật là nhân vật thật đi lại và làm việc trong game.
- Tác vụ chi tiết thiết kế sau, khi nhân vật và căn hộ đã vào game.

- **Mọi hình trong game phải là tranh gouache của game**: đồ vật, dụng cụ, pop-up, khung, nút, biểu tượng. Không vẽ hình bằng code/CSS (không hình chữ nhật, hình tròn, màu phẳng). Cần món mới thì sinh ảnh theo ART_STYLE.md rồi tách nền bằng `tools/slice_ui.py` (UI) hoặc `tools/slice_sprites.py` (nhân vật). CSS chỉ đặt vị trí và chữ.

## Quyết định đã chốt
- Web 2D, màn ngang 16:9, cảm ứng là chính; phát hành miễn phí trước, mở rộng sau.
- Nhân vật chính nam hoặc nữ (cùng cốt truyện); bạn đời do người chơi chọn hình ảnh; một con.
- NPC không có tính cách riêng, tên do người chơi đặt.
- Một ngày = 4 khung giờ (sáng, chiều, tối, đêm); thời gian chỉ trôi khi hoàn thành việc; không đồng hồ, không thua, không game over.
- Thước "Bình yên" chỉ tăng, hiển thị như bức tranh tô dần, không hiện số.
- Không có cảnh mất mát; không có chế độ chơi tự do sau kết thúc.
- MVP: giai đoạn 1 (chương mở đầu) + Tết; nam và nữ; nhà + siêu thị, thư viện, cửa hàng thú cưng.
- Tự lưu sau mỗi khung giờ vào một tệp trạng thái duy nhất.
- Nội dung (lời thoại, công thức, cây, lịch, sự kiện) là dữ liệu JSON tách khỏi mã.

## Còn mở (hỏi Duc, đừng tự quyết)
- Engine cụ thể; có đóng gói thành app hay chỉ web.
- Giới tính bé (cố định hay chọn).
- Nguồn gốc sự mệt mỏi lúc mở đầu.

## Cách làm việc
1. Đề xuất kiến trúc/cấu trúc thư mục trước khi viết code và chờ Duc duyệt.
2. Bám phạm vi MVP; không thêm tính năng ngoài GDD nếu chưa hỏi.
3. Làm theo cửa kiểm tra trong docs/MVP_PLAN.md, từng lát nhỏ chạy được.
4. Mọi chuỗi hiển thị dùng key i18n; tiếng Việt là gốc.
5. Giữ phong cách trực quan theo docs/ART_STYLE.md (gouache phẳng, không viền, bảng màu đất, không chữ trong tranh).
6. Giải thích ngắn gọn, dễ hiểu; Duc là dev độc lập, ưu tiên giải pháp đơn giản, dễ bảo trì.
