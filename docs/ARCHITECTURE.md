# Finding Peace — Đề xuất kiến trúc (chờ Duc duyệt)

## 1. Stack
| Hạng mục | Chọn | Lý do |
| --- | --- | --- |
| Engine | **Phaser 3** | Đủ scene, tween, input cảm ứng, scale 16:9; nhiều tài liệu; một mình dễ bảo trì. PixiJS nhẹ hơn nhưng phải tự viết scene/input/audio. |
| Ngôn ngữ | TypeScript | Bắt lỗi dữ liệu JSON sớm. |
| Build | Vite | Nhanh, cấu hình ít. |
| UI | HTML/CSS phủ lên canvas | Chữ tiếng Việt sắc nét, dễ làm hộp thoại kiểu trang sách, dễ cỡ chữ lớn. |
| Offline | PWA (`vite-plugin-pwa`) | Chạy offline sau lần tải đầu; chưa cần đóng gói app. |
| Lưu game | `localStorage` một khóa JSON (có `version`); chuyển IndexedDB nếu lớn | Đơn giản nhất, đủ cho MVP. |
| i18n | Tệp `locales/vi.json` (gốc), `en.json` sau; mọi chuỗi qua `t("key")` | Theo CLAUDE.md. |

Phát hành: web trước. Chưa cần chốt đóng gói app (PWA đủ cài lên màn hình chính).

## 2. Cấu trúc thư mục
```
finding-peace/
  docs/
  public/
    assets/            ảnh, nhạc, âm thanh (đã tách lớp)
  src/
    main.ts            khởi tạo Phaser, scale 16:9 (FIT)
    core/
      GameState.ts     kiểu + giá trị mặc định của trạng thái
      Save.ts          lưu/tải/migrate theo version
      Clock.ts         ngày + 4 khung giờ (chỉ trôi khi xong việc)
      Events.ts        bộ sự kiện theo điều kiện (ngày, chương, khoảnh khắc)
      i18n.ts          t(key)
      Data.ts          nạp + kiểm tra JSON trong data/
    scenes/
      Boot, Menu, Room(nhà), Map, Market, Library, PetShop
    activities/        mỗi hoạt động một module nhỏ (Chores, Cooking, Plants, Rest, Pet)
    entities/
      Character.ts     nhân vật cắt rời, đi bộ 6–8 fps, tap-to-move
      Npc.ts
    ui/                hộp thoại, sổ tay (menu), biểu tượng giờ, tranh "Bình yên"
  data/                JSON: chapters, events, dialogue, recipes, plants, calendar, wardrobe
  locales/vi.json
```

## 3. Nguyên tắc chính
- **Trạng thái duy nhất** `GameState` (JSON thuần): chương, ngày, khung giờ, khoảnh khắc đã có, công thức, cây, thú cưng, tên NPC, tủ đồ, nhật ký. Tự lưu cuối mỗi khung giờ.
- **Chỉ tăng**: khoảnh khắc chỉ thêm, không xóa; không có hàm trừ "Bình yên".
- **Sự kiện theo dữ liệu**: `{ id, when: {chapter, day, slot, hasMoment}, scene, dialogueKey }`; lõi chỉ đánh giá điều kiện.
- **Không thất bại**: hoạt động luôn trả về kết quả (khoảnh khắc + hình/dòng kể), chỉ đổi lời thoại.
- **Scene = một trang tranh**: nền một ảnh 16:9, phần ba dưới là sàn đi lại; vùng chạm khai báo trong dữ liệu.
- **Chế độ giảm chuyển động** đọc từ cài đặt, mọi tween đều tôn trọng.

## 4. Chia lát theo cửa kiểm tra (MVP_PLAN)
1. **Lát 0 – khung chạy được:** Vite + Phaser, scene phòng 16:9 (cần ảnh `room-landscape.png`), nhân vật placeholder đi bằng chạm, hộp thoại, vòng 4 khung giờ tối thiểu, lưu/tải.
2. **Lát 1 – thử phong cách:** nhân vật cắt rời đi bộ + 1 việc nhà.
3. **Lát 2 – một ngày trọn vẹn:** 4 hoạt động, nhật ký cuối ngày.
4. **Lát 3 – chương mở đầu + Tết:** 3 NPC, sự kiện, trang trí Tết, gói bánh chưng.

## 5. Hai điểm tài liệu cần chốt
1. **Quần áo mua hay có sẵn?** Đề xuất: theo `CHARACTER_DESIGN.md`, **mọi trang phục có sẵn từ đầu**, không có kinh tế quần áo. Cửa hàng quần áo (đã nằm ngoài MVP) về sau chỉ là nơi ngắm/thử và nhận đồ đặc biệt theo dịp lễ, không phải mua. Cần sửa GDD mục 5 và 8 cho khớp.
2. **Lỗi đánh máy GDD:** "Khứa 1–4" → "Khung 1–4".

## 6. Cần Duc quyết trước khi bắt đầu Lát 0
- Duyệt stack Phaser 3 + TS + Vite + PWA?
- Duyệt cách xử lý quần áo ở mục 5.1?
- Tải ảnh mẫu trong `assets/README.md` về `public/assets/`, hay để mình tải (cần Duc cho phép tải từ CDN)?
- Còn mở (chưa chặn Lát 0): giới tính bé, nguồn gốc sự mệt mỏi lúc mở đầu.
