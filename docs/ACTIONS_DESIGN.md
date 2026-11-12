# Finding Peace — Thiết kế hành động Phần 1 (độc thân, căn hộ studio)

Bản nháp để Duc duyệt, chưa đưa vào game. Theo GDD mục 3, 4: không thất bại, nhanh, luôn kết thúc bằng một hình đẹp hoặc một dòng kể, lặp lại thì mở lời thoại mới. Mọi hình đều là tranh gouache (CLAUDE.md), mặt chỉ có hai chấm mắt và má hồng, không miệng.

## Tiến độ (cập nhật 2026-11-12)

| Hành động | Tranh | Code | Ghi chú |
| --- | --- | --- | --- |
| Ngủ, nghỉ một lát | xong: 4 clip video (A ngồi → nằm, B kéo chăn) + 2 ảnh nhắm mắt | xong, chưa xem chạy trên máy thật | `src/activities/Sleep.ts`; video Wan 2.7 nội suy giữa 2 ảnh |
| Xem TV | xong (ngồi khoanh chân trên sofa, 3 tranh TV) | xong, chưa chạy thử | `src/activities/WatchTv.ts`; ngồi khoanh chân để không chèn lên bàn trà; căn 1 dùng tranh nhỏ phía trên TV vì TV bị nghiêng |
| Tưới cây cầm bình | xong: cảnh ban công riêng, 2 clip video 6 giây (nam, nữ) | xong, chưa xem chạy trên máy thật | `src/activities/Watering.ts`; là cảnh riêng nên không phụ thuộc căn hộ |
| Nấu ăn, ăn, rửa bát | chưa | chưa | cuối cùng |

## Tiêu chí chung: mỗi hành động là một clip ngắn tự chạy

Bấm vào một hành động thì game **tự chạy như một clip ngắn** (khoảng 10 đến 30 giây). Người chơi **không phải bấm, kéo hay chọn từng bước**. **Không có nút bỏ qua** và không có chạm để bỏ qua: clip luôn chạy hết, dòng kể tự đóng sau thời gian đủ đọc. Những chỗ ghi "chọn" hay "kéo" trong bản nháp đầu đã được đổi cho đúng tiêu chí này (xem từng mục).

## 1. Hai kiểu hành động

| Kiểu | Dùng cho | Cách thể hiện |
| --- | --- | --- |
| **Tại chỗ** (trong căn hộ) | Tưới cây, xem TV, nghỉ sofa, ăn | Nhân vật đi tới điểm, đổi sang tư thế riêng ngay trong cảnh căn hộ |
| **Cảnh riêng** (một trang tranh toàn màn hình) | Ngủ, nấu ăn, rửa bát | Làm mờ sang một trang tranh cận cảnh, chơi xong làm mờ về căn hộ |

Lý do chọn cảnh riêng cho ngủ, nấu, rửa bát: cần nhìn thấy chăn, mắt nhắm, nồi, bát, mà nhân vật 480px trong căn hộ quá nhỏ để diễn. Ngủ dùng cảnh riêng cũng tránh phải vẽ chăn đè lên giường có sẵn trong ba căn (mỗi căn một kiểu giường).

Mỗi hành động tốn **1 khung giờ**, riêng "bữa tối" gồm 3 chặng (nấu, ăn, rửa bát) trong **cùng 1 khung**, ba chặng tự chạy nối tiếp.

## 2. Ngủ: nằm xuống, đắp chăn, nhắm mắt (cảnh riêng)

Chạm giường: nhân vật đi tới mép giường, ánh sáng căn hộ dịu xuống, làm mờ sang cảnh riêng.

Cảnh là một trang tranh cận cảnh giường (một bản chung cho cả ba căn), 4 khung chuyển chậm bằng làm mờ chéo (không có chuyển động gấp):
1. Ngồi ở mép giường, đèn ngủ sáng.
2. Nằm xuống, đầu trên gối, chăn còn gấp ở chân giường.
3. Chăn tự kéo lên ngang vai (chuyển mờ chậm từ khung 2 sang khung 3).
4. Mắt nhắm: hai nét cong nhỏ thay cho hai chấm mắt, má hồng vẫn còn; đèn tắt, ánh trăng qua cửa sổ.

Kết thúc: hiện một dòng nhật ký nhỏ của ngày (tranh nhỏ theo việc đã làm), sang ngày mới sáng. Ngủ ban ngày ("nghỉ một lát") dùng cùng cảnh nhưng dừng ở khung 3, chỉ nhắm mắt vài giây rồi tỉnh, tốn 1 khung giờ.
Tranh cần: 4 khung × 2 nhân vật = 8 ảnh.

## 3. Tưới cây: cầm bình (tại chỗ, ban công)

Hiện bình nước đang là một vật tách rời kéo bằng ngón tay. Đổi lại để nhân vật **thực sự cầm bình**:
1. Chạm ban công: nhân vật đi tới kệ cạnh cửa, **nhấc bình lên** (tư thế cầm bình, một tay).
2. Đi ra ban công trong tư thế cầm bình (dáng đi nhìn ngang, bình đung đưa).
3. Có 3 chậu cây trên ban công: nhân vật **lần lượt tưới từng chậu** (tư thế tưới, nước chảy ra), mỗi chậu ~1 giây, tự chạy.
4. Chậu tưới xong tươi lên (hai tranh: héo nhẹ, tươi); tưới hết 3 chậu thì cất bình, hiện dòng kể.
Lặp lại nhiều ngày: cây ra hoa, ra quả (GDD mục 4), lời thoại đổi.
Tranh cần: cầm bình đi (4 khung) + tưới (2 khung) × 2 nhân vật = 12 ảnh; 3 chậu × 2 trạng thái = 6 ảnh (một bộ cho cả ba căn nếu ban công giống nhau, nếu không thì theo căn).

## 4. Xem TV (tại chỗ, sofa)

1. Chạm sofa hoặc TV: nhân vật đi tới, **ngồi xuống sofa** (nhìn ngang, hướng về TV).
2. Màn TV tự sáng với một trong ba chương trình, **xoay vòng theo ngày và khung giờ** để mỗi lần xem khác nhau: một bộ phim truyền hình buổi tối, một chương trình nấu ăn (sau này mở công thức mới cho sổ công thức), bản tin thời tiết. Mỗi chương trình là một tranh nhỏ trên màn TV, **không có chữ**.
3. Ánh sáng xanh nhẹ nhấp nháy lên mặt nhân vật; buổi tối kèm tách trà trên bàn; ngồi lâu thì nhân vật gật gù (ngủ gật) rồi hiện dòng kể.
Tranh cần: ngồi sofa (2 khung: ngồi yên, gật gù) × 2 nhân vật = 4 ảnh; 3 tranh màn TV (một bộ chung).

## 5. Nấu ăn: cảnh riêng, bữa ăn một mình

Chạm bếp: làm mờ sang cảnh bếp cận cảnh (mặt bếp, thớt, nồi, chảo, nồi cơm điện), nhân vật đứng bên trái nhìn ngang.

**Chọn món** từ sổ công thức: mỗi bữa gồm **cơm + một món mặn + một món rau hoặc canh** (tối thiểu cơm + một món). Nguyên liệu cơ bản (gạo, trứng, hành, tỏi, nước mắm) luôn có sẵn trong tủ; nguyên liệu tươi mua ở siêu thị (cầm tay để dành cho bước siêu thị). Thiếu nguyên liệu không bị chặn: món đổi sang bản đơn giản hơn kèm dòng kể.

**Ba cảnh cho mỗi món**, tự chạy nối tiếp trong một clip (không có điểm số, không có "sai"):
1. Sơ chế: nhân vật cắt rau, hành, thịt trên thớt.
2. Nấu: đổ nguyên liệu vào nồi hoặc chảo, canh lửa, hơi nước bốc lên.
3. Nêm và bày: nêm gia vị, bày món vào bát hoặc đĩa.
Cơm: nhấn nút nồi cơm điện, có tiếng "tách".
Chỉ có **một lựa chọn trước clip**: chọn món từ sổ công thức (xem mục 9, câu hỏi 7).

Cơm khét, canh mặn chỉ đổi hình món và lời thoại (GDD mục 4).

**Món ăn Phần 1** (đơn giản, một người ăn; phân tầng để mở dần):

| Tầng | Món | Loại | Nguyên liệu chính |
| --- | --- | --- | --- |
| 1, có từ đầu | Cơm trắng | Cơm | gạo |
| 1 | Trứng chiên | Mặn | trứng, hành |
| 1 | Rau muống xào tỏi | Rau | rau muống, tỏi |
| 1 | Canh rau cải nấu thịt băm | Canh | cải, thịt băm |
| 1 | Mì gói thêm trứng | Mặn, bữa lười | mì, trứng |
| 2, mở qua sách, hàng xóm, TV | Đậu phụ sốt cà chua | Mặn | đậu phụ, cà chua |
| 2 | Thịt kho trứng (nồi nhỏ) | Mặn | thịt ba chỉ, trứng |
| 2 | Cá rán | Mặn | cá |
| 2 | Canh bí đỏ nấu tôm | Canh | bí đỏ, tôm |
| 2 | Cháo trứng (hôm mệt, hôm mưa) | Món ấm | gạo, trứng |

Mỗi món có tranh thành phẩm riêng (bày sẵn trên khay), dùng chung cho cảnh nấu, cảnh ăn và sổ công thức.

**Ăn** (tại chỗ, bàn ăn): nhân vật ngồi bàn ăn một mình (nhìn ngang, hai khung gắp nhẹ), có khay hiện các món vừa nấu. Mỗi món ăn lần đầu mở **một kỷ niệm** (tranh nhỏ trong nhật ký) và một dòng nhớ nhà nhẹ (ví dụ món mẹ hay nấu), đúng chủ đề "nhớ nhà" của Phần 1.
Tranh cần: nấu (4 tư thế: đứng yên, cắt, khuấy, bưng) + ăn (2) × 2 nhân vật = 12 ảnh; 10 món thành phẩm; 1 cảnh bếp cận cảnh (chung hoặc theo căn).

## 6. Rửa bát: cảnh riêng

Chạm bồn rửa (hoặc tự hiện sau bữa ăn): làm mờ sang cảnh bồn rửa cận cảnh.
1. Chồng bát bẩn bên trái, **số bát = số món vừa ăn** (tối thiểu 3: bát cơm, bát món, đũa).
2. Nhân vật **tự rửa lần lượt từng bát** qua bồn (xà phòng nổi bọt), rồi úp lên giá bên phải; bát sạch có ánh nhẹ.
3. Hết bát: bồn sạch, tiếng nước chảy nhỏ dần, hiện dòng kể.
 Nhân vật đứng cạnh bồn (2 tư thế: cúi rửa, bưng lên giá).
Tranh cần: 2 tư thế × 2 nhân vật = 4 ảnh; cảnh bồn rửa 1 ảnh; bát bẩn, sạch, bọt xà phòng (một bộ nhỏ).

## 7. Tổng số tranh cần (ước tính, Phần 1)

| Nhóm | Số ảnh |
| --- | --- |
| Ngủ (2 nhân vật) | 8 |
| Tưới cây (2 nhân vật) + chậu cây | 12 + 6 |
| Xem TV (2 nhân vật) + màn TV | 4 + 3 |
| Nấu, ăn (2 nhân vật) + cảnh bếp | 12 + 1 |
| Rửa bát (2 nhân vật) + cảnh bồn rửa + bát | 4 + 1 + 3 |
| Món ăn thành phẩm | 10 |
| **Tổng** | **~64** |

Mỗi tư thế sinh từ bảng nhân vật đã chọn, tách nền bằng `tools/slice_sprites.py`; đồ vật và cảnh sinh theo `ART_STYLE.md`, tách bằng `tools/slice_ui.py`. Chi phí sinh ảnh thấp (khoảng 12 credit mỗi ảnh ở chất lượng medium, nhưng bảng nhân vật cần chất lượng cao).

## 8. Dữ liệu (tách khỏi mã, theo GDD mục 12)

- `data/recipes.json`: mỗi món `{ id, tier, kind: rice|main|veg|soup|warm, ingredients[], steps[], dishImage, memoryKey, servings: 1 }`.
- `data/actions.json`: mỗi hành động `{ id, type: inplace|cutscene, poseIds[], props[], steps[], textKeys[], advanceSlot }`.
- `servings` có sẵn để Phần 2 (kết hôn) chỉ việc thêm món cho hai người và mâm cơm đông hơn, không phải đổi lõi.

## 9. Điều cần Duc quyết (mình đã chọn tạm, sửa được)

1. Ngủ, nấu, rửa bát là **cảnh riêng**; tưới cây, xem TV, ăn là **tại chỗ**. Đúng ý Duc chưa?
2. Bữa tối là chuỗi **nấu, ăn, rửa bát trong một khung giờ**, ba chặng tự chạy nối tiếp.
3. Nhân vật làm việc nhìn **ngang** (nhìn về phía đồ vật). Nếu Duc muốn nhìn chính diện hoặc 3/4 cho cảnh riêng thì phải sinh lại bảng tư thế.
4. Danh sách 10 món trên: Duc thêm bớt món nào (món quê bố mẹ hay nấu thì càng tốt).
5. TV có chọn ba chương trình hay chỉ một cảnh ngồi xem?
7. Nấu ăn có **một lựa chọn trước clip** (chọn món) có được không, hay game tự chọn món theo nguyên liệu và ngày, người chơi không chọn gì?
6. Thứ tự làm: mình đề xuất **ngủ → xem TV → tưới cây → nấu và rửa bát**, vì nấu và rửa bát cần nhiều tranh nhất.
