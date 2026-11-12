# Finding Peace — Tài liệu đặc tả game (GDD, phiên bản 0.1)

Bản gốc (nguồn chính, có thể đã sửa sau khi đóng gói): https://claude.ai/artifact/BHDuYcK5GqKNipG9oLvbLp
Ngày đóng gói: 2026-11-11. Mục có "(đề xuất)" là chưa chốt.

## 1. Tổng quan

Finding Peace là game mô phỏng đời thường kể như một câu chuyện có mở đầu và kết thúc. Người chơi tìm lại sự bình yên qua những việc nhỏ hằng ngày của một người trẻ sống ở Việt Nam. Không chơi "để thắng": sống cùng nhân vật (về nhà, dọn dẹp, nấu cơm, tưới cây, dắt thú cưng đi dạo, ra phố, ăn với bạn, đi ngủ). Chơi xong có cảm giác vừa đọc xong một cuốn truyện hiền.

| Hạng mục | Nội dung |
| --- | --- |
| Thể loại | Cozy life sim + narrative, tiến trình tuyến tính theo chương |
| Góc nhìn | 2D, mỗi địa điểm là một "trang tranh" vẽ tay; **màn hình ngang 16:9 (đã chốt)** |
| Nhân vật chính | Chọn nam hoặc nữ lúc bắt đầu, cùng một cốt truyện (**làm cả hai ngay từ MVP**) |
| Nền tảng | **Di động + game web (đã chốt)**; phát hành **miễn phí trước**, bản mở rộng sau |
| Nhịp chơi | Một ngày game ~10–15 phút (đề xuất), lưu bất kỳ lúc nào |
| Độ dài | Một chặng đời: độc thân → hôn nhân → có con, ~9 chương (đề xuất 8–10 giờ) |
| Ngôn ngữ | Tiếng Việt là gốc, tiếng Anh sau |
| Kết thúc | Một kết thúc chính; **không có chế độ chơi tự do sau kết thúc** |

Cảm xúc mục tiêu: ấm, chậm, hoài niệm, xen chút buồn rồi nhẹ nhõm.

Năm trụ cột:
1. Một câu chuyện thật sự: có mở đầu, diễn biến, kết thúc; mỗi chương có mạch chuyện nhỏ.
2. Không thua, không vội: không đồng hồ đếm ngược, không điểm trừ, không game over. Làm "sai" chỉ cho kết quả khác.
3. Việc nhỏ có ý nghĩa: quét nhà, phơi quần áo, nấu cơm là khoảnh khắc được kể bằng hình ảnh và lời thoại ngắn.
4. Việt Nam đời thường (miền Bắc làm gốc): món ăn, đồ đạc, ngày lễ, tiếng động.
5. Tranh vẽ tay: mọi màn hình như một trang tranh gouache.

## 2. Cốt truyện

Kể một chặng đời của nhân vật: độc thân sống cùng bố mẹ → hôn nhân, ở riêng → có con. Vui buồn đan xen; người chơi cùng nhân vật trưởng thành, gánh trách nhiệm, và dần tìm thấy bình yên.

Ý nghĩa cốt lõi (đề xuất):
- Bình yên không đến từ việc hết lo toan, mà từ việc chấp nhận mình đã tạm gác lại điều gì và nhận ra mình đã có được gì.
- Mỗi giai đoạn có một "nút thắt" trong lòng nhân vật; qua việc nhỏ hằng ngày, nút thắt được gỡ dần (hành trình chữa lành).
- Nỗi buồn ở mức nhẹ, đời thường (mệt, tiếc, nhớ, va chạm nhỏ). Không bi kịch, không cảnh gây sốc, luôn có một khoảnh khắc ấm đi kèm.

Nhân vật và bối cảnh:
- Nhân vật chính: người trẻ đã đi làm, sống trong căn phòng của mình ở nhà bố mẹ. Nam hoặc nữ, cùng cốt truyện.
- Bạn đời: **người chơi tự chọn hình ảnh**. Có **một** người con. **Không có cảnh mất mát**; nỗi buồn dừng ở mức nhớ nhà và bố mẹ già đi.
- Bối cảnh miền Bắc (bốn mùa, phong tục Tết miền Bắc), không đặt tên thành phố cụ thể.
- Nhân vật đổi theo tuổi: ngoại hình chỉnh nhẹ qua giai đoạn; bố mẹ già dần, con lớn dần.

### Ba giai đoạn và chương (đề xuất)

| Giai đoạn | Chương | Niềm vui | Điều phải tạm gác / nỗi buồn | Điều được chữa lành |
| --- | --- | --- | --- | --- |
| 1. Độc thân, sống cùng bố mẹ | 1 Căn phòng cũ; 2 Những dự định; 3 Gặp một người | Bữa cơm nhà, đi chơi với bạn, theo đuổi một sở thích riêng, rung động đầu tiên | Bố mẹ già đi, bạn bè mỗi người một hướng, một ước mơ chưa kịp làm | Biết ơn bố mẹ; chấp nhận không gì còn nguyên vẹn mãi |
| 2. Hôn nhân, ở riêng | 4 Đám cưới và căn nhà đầu tiên; 5 Hai người một mái nhà | Ngày cưới, tự bày trí nhà mới, bữa cơm đầu tiên cho hai người, Tết hai bên nội ngoại | Rời nhà bố mẹ, nhớ nhà, tiền bạc eo hẹp, va chạm nhỏ khi sống chung, tạm gác sở thích | Biết chia sẻ và nhường nhịn; nhà là do hai người cùng tạo nên |
| 3. Có con, gia đình riêng | 6 Chờ đón; 7 Những đêm thức; 8 Bước đi đầu tiên | Tin có con, tiếng khóc chào đời, lời nói và bước đi đầu tiên, sinh nhật con | Thiếu ngủ, không còn thời gian riêng, lo khi con ốm, cảm giác lạc mất bản thân | Tha thứ cho chính mình; thấy mình trong bố mẹ và hiểu cách họ đã yêu mình |
| Kết | 9 Bữa cơm ba thế hệ | Cả nhà quần tụ | (nhìn lại tất cả) | Bình yên |

Chiếc hộp tạm gác (cơ chế kể chuyện xuyên suốt): cuối mỗi giai đoạn, nhân vật cất một món đồ gắn với điều mình phải tạm gác (cuốn sổ vẽ, chuyến đi dự định, cuốn sách đọc dở) vào một chiếc hộp. Người chơi tự chọn món đồ trong vài lựa chọn. Chương cuối nhân vật mở hộp; mỗi món mang lại một khoảnh khắc chữa lành riêng thay vì tiếc nuối.

Nhịp thời gian:
- Mỗi chương gồm vài ngày đến một vài tuần game, chơi theo vòng lặp ở mục 3.
- Giữa các chương thời gian nhảy qua một trang nhật ký (vài tháng, có khi một năm).
- Mùa và dịp lễ vẫn lặp lại trong mỗi giai đoạn, mỗi lần khác đi một chút (Tết ở nhà bố mẹ, Tết hai bên, Tết có con).

Cung truyện: Mở đầu nhân vật thức dậy trong căn phòng cũ ở nhà bố mẹ (hướng dẫn rất nhẹ). Diễn biến: mỗi chương mở thêm một góc nhà hoặc trách nhiệm mới; nỗi buồn kể bằng đồ vật và cảnh ngắn, theo sau là điểm ấm. Kết: bữa cơm ba thế hệ, mở hộp tạm gác, xem lại cuốn nhật ký cả đời. Game kết thúc ở đó.

## 3. Vòng lặp chơi

Một ngày game chia thành bốn khung giờ. Thời gian chỉ trôi khi người chơi chọn làm xong một việc, nên không có áp lực thời gian thực.

1. Thức dậy (sáng): nhà sáng dần, một dòng lời dẫn nhẹ (đúng thời tiết, mùa). Chọn quần áo nếu muốn.
2. Khứa 1, buổi sáng: chọn 1–2 việc (trong nhà hoặc ra ngoài).
3. Khứa 2, buổi chiều: chọn tiếp 1–2 việc; lúc ra phố nhiều nhất.
4. Khứa 3, buổi tối: về nhà, nấu cơm, ăn, dọn dẹp; đôi khi ăn với bạn ngoài quán.
5. Khứa 4, đêm: nghỉ ngơi tự do (đọc sách, nghe mưa, ngắm cây), rồi đi ngủ.
6. Kết ngày: game tự vẽ một trang nhật ký nhỏ từ việc đã làm, rồi tự lưu.

| Loại ngày | Đặc điểm | Tỉ lệ (đề xuất) |
| --- | --- | --- |
| Ngày tự do | Người chơi tự chọn việc; có thể có một cảnh nhỏ ngẫu nhiên (mưa, hàng xóm ghé qua) | Phần lớn |
| Ngày truyện | Một cảnh kể chuyện cố định ở một khung giờ nhất định; phần còn lại vẫn tự do | Vài ngày mỗi chương |
| Ngày lễ | Nhà đổi trang trí, có hoạt động riêng của dịp đó | Theo lịch game |

Nguyên tắc nhịp chơi:
- Không có thanh năng lượng hay đói/mệt gây phạt. "Tâm trạng" của nhân vật chỉ ảnh hưởng lời thoại và cảnh, không ảnh hưởng khả năng làm việc.
- Người chơi được bỏ qua khung giờ bất cứ lúc nào bằng cách ngồi nghỉ; ngày chỉ kết thúc khi họ đi ngủ.
- Mỗi ngày kết thúc trong khoảng 10–15 phút.

## 4. Hệ thống hoạt động trong nhà

Mỗi hoạt động là một màn tương tác ngắn vài chạm hoặc kéo thả, không có điểm số, luôn kết thúc bằng một hình ảnh đẹp hoặc một dòng kể chuyện nhỏ.

| Hoạt động | Cách chơi (đề xuất) | Kết quả |
| --- | --- | --- |
| Việc nhà | Quét nhà, lau bàn, rửa bát, phơi và gấp quần áo: kéo, vẽ, thả đồ vào đúng chỗ | Nhà sạch dần, mở ra góc mới để trang trí |
| Nghỉ ngơi | Nằm sofa, pha trà, nghe nhạc, ngắm mưa qua cửa sổ, đọc sách đã mua | Một khoảnh khắc kỷ niệm, đôi khi nhớ lại một đoạn truyện cũ |
| Chọn quần áo | Mở tủ đồ; chọn áo, quần, phụ kiện theo thời tiết, dịp, hoặc sở thích | NPC bình luận nhẹ; không có bộ "đúng" hay "sai" |
| Trồng cây | Gieo hạt, tưới, nhặt sâu, chờ vài ngày; chậu ở ban công hoặc sân | Cây nở hoa, ra quả, hoặc thành nguyên liệu nấu ăn |
| Chăm thú cưng | Cho ăn, chải lông, chơi đùa, dắt đi dạo; sau này đưa đi spa | Thú cưng thân hơn, có hành động riêng trong nhà |
| Nấu ăn | Chọn nguyên liệu, sơ chế, nấu theo công thức món Việt (cơm, canh, phở, bún, bánh, chè) | Món được lưu vào sổ công thức; dùng cho bữa ăn và dịp lễ |
| Trang trí nhà | Đặt, đổi vị trí đồ đạc, treo tranh, đặt hoa | Nhà mang dấu riêng của người chơi |

Nguyên tắc: Không thất bại (cơm khét, canh mặn chỉ đổi lời thoại và hình món ăn); nhanh, có thể bỏ qua (dưới ~1 phút, có "làm nhanh"); thói quen tạo cốt truyện (lặp lại nhiều lần mở cảnh/lời thoại mới); trạng thái sống (cây lớn, thú cưng nhớ thói quen, nhà đổi theo mùa, không hỏng hay chết).

Hoạt động mở thêm theo giai đoạn:
- Giai đoạn 1: ăn cơm cùng bố mẹ, phụ việc nhà, nấu một món cho cả nhà, theo đuổi một sở thích riêng.
- Giai đoạn 2: nấu cho hai người, cùng chọn và bày trí nhà mới, chia việc nhà, về thăm nhà hai bên.
- Giai đoạn 3: chăm con (cho ăn, tắm, ru ngủ, chơi cùng), đưa con đi khám hoặc ra công viên. Việc dồn dập hơn nhưng mỗi việc vẫn ngắn, để cảm nhận sự vất vả mà không bị phạt.
- Hoạt động riêng (sở thích): ít dần theo giai đoạn; khi hiếm hoi được làm lại, khoảnh khắc đó rất riêng tư, gắn với chiếc hộp tạm gác.

## 5. Địa điểm ngoài nhà

Mỗi địa điểm là một trang tranh riêng, mở bằng bản đồ khu phố vẽ tay; đều có ít nhất một hoạt động, một NPC quen và một lý do để quay lại.

| Địa điểm | Hoạt động | Gắn với hệ thống / cốt truyện |
| --- | --- | --- |
| Siêu thị / chợ | Chọn thực phẩm, hạt giống, đồ dùng; trò chuyện với người bán | Nguyên liệu cho nấu ăn và trồng cây; đồ theo mùa |
| Hiệu sách | Chọn và mua sách (truyện, sách nấu ăn, sách cây) | Sách mua về đọc ở nhà; mở công thức mới |
| Thư viện | Đọc sách tại chỗ, mượn sách, ngồi yên trước cửa sổ | Không gian yên trí nhất; kèm mạch chuyện cùng một người quen |
| Rạp phim | Chọn suất chiếu, ngồi xem, ăn bắp rang; xem điện ảnh được kể bằng vài khung tranh | Hoạt động đi cùng bạn bè; mở nhiều nhất vào mùa đông |
| Quán ăn | Ăn cùng bạn bè, gọi món, kể chuyện vặt | Mạch chuyện với bạn; món ngon được lưu lại để thử nấu |
| Cửa hàng và spa thú cưng | Mua thú cưng (chó, mèo); đưa thú cưng đi tắm, cắt tỉa, chải lông | Thú cưng đổi kiểu lông/phụ kiện; làm quen chủ tiệm |
| Cửa hàng quần áo | Thử và mua quần áo theo mùa | Mở kho đồ trong tủ; đồ đặc biệt cho dịp lễ |

Quy tắc di chuyển: đi lại là một lần chạm trên bản đồ, có một cảnh đi ngắn (vài giây) với tiếng động đường phố; một chuyến ra phố tốn một khung giờ, trong đó có thể ghé hai đến ba nơi gần nhau; địa điểm mở dần theo chương.

Địa điểm theo giai đoạn: Giai đoạn 1: nhà bố mẹ là nơi chính (phòng riêng, bếp, phòng khách, sân). Giai đoạn 2: nhà riêng của hai người, thêm nhà hai bên nội ngoại. Giai đoạn 3: thêm phòng của con, công viên, phòng khám và trường mầm non (nếu phạm vi cho phép).

## 6. Lễ, Tết và sự kiện theo mùa

Vào mỗi dịp lễ, căn nhà tự đổi trang trí theo chủ đề và xuất hiện thêm một hoạt động gia đình đặc trưng. Game dùng một lịch cố định của riêng nó (không theo âm lịch thật), để mỗi dịp lễ rơi đúng vào chương cốt truyện tương ứng.

| Dịp | Mùa trong năm | Trang trí nhà | Hoạt động đặc trưng | Ưu tiên MVP |
| --- | --- | --- | --- | --- |
| Tết Nguyên đán | Xuân | Cành đào hoặc quất, mâm ngũ quả, câu đối, đèn lồng đỏ | Dọn nhà, gói bánh chưng cùng gia đình, cúng giao thừa, lì xì | Có |
| Rằm tháng Giêng | Xuân | Đèn lồng nhỏ, hoa quả cúng | Nấu chè, đi chùa hoặc dạo phố | Không |
| Ngày 8/3 | Xuân | Bình hoa tươi | Tặng hoa cho người thân | Không |
| Giỗ Tổ, nghỉ lễ dài | Xuân | Cờ nhỏ treo cửa sổ | Đi chơi gần, nấu bữa cơm đông người | Không |
| Vu Lan | Hạ – Thu | Bàn thờ gọn gàng, hoa hồng | Nấu mâm cơm chay, nhớ người thân | Không |
| Trung thu | Thu | Đèn lồng, mâm cỗ, bánh trung thu | Làm đèn lồng, phá cỗ, ngắm trăng | Làm ngay sau |
| 20/10 | Thu | Bình hoa nhỏ | Tặng quà cho người quen nữ | Không |
| Giáng sinh, cuối năm | Đông | Cây thông nhỏ, đèn nháy | Nấu bữa tối ấm, viết thiệp | Không |

Cách thể hiện: mỗi dịp có một bộ đồ trang trí riêng, tự đặt vào nhà sáng hôm đó và tháo ra sau dịp (người chơi giữ lại món mình thích). Hoạt động gia đình dùng cùng cơ chế với nấu ăn (ví dụ gói bánh chưng: xếp lá, đổ gạo, thịt, buộc dây) nhưng có thêm NPC cùng làm. Trong MVP chỉ có Tết; các dịp khác, bắt đầu từ Trung thu, làm sau; nếu phạm vi quá lớn có thể chỉ giữ 4–5 dịp quan trọng nhất. Qua các giai đoạn, cùng một dịp lễ sẽ khác đi: lúc đầu nhân vật chỉ phụ bố mẹ ở nhà cũ, sau đó đón hai bên gia đình, cuối cùng tự lo mâm cỗ và cùng con gói bánh.

## 7. Nhân vật và NPC

Dàn nhân vật nhỏ và gần gũi: khoảng 8–10 người có tên, mỗi người gắn với một địa điểm và một mạch chuyện. **Tên do người chơi tự đặt; NPC không có tính cách riêng (kể cả bạn đời và con), chỉ có vai trò và lời thoại ngắn, giản dị.** Vì NPC không có tính cách, cảm xúc truyện dựa vào hoạt động, đồ vật, cảnh và kỷ niệm.

| Nhóm | Vai trò | Gắn với | Vai trò trong truyện |
| --- | --- | --- | --- |
| Bố mẹ (và ông bà) | Sống cùng ở giai đoạn 1, về thăm sau đó | Nhà bố mẹ, nhà quê, dịp Tết | Điểm tựa; già đi theo thời gian; nhắc nhân vật về cội nguồn |
| Bạn đời | Gặp ở cuối giai đoạn 1, cùng sống từ giai đoạn 2 | Nhà riêng, ngoài phố | Người cùng chia vui buồn và việc nhà; người chơi tự chọn hình ảnh, không có tính cách riêng |
| Con | Xuất hiện ở giai đoạn 3 | Nhà riêng, công viên | Một bé duy nhất, lớn dần qua các chương; lý do của vất vả và niềm vui |
| Bạn thân | 1–2 người bạn | Quán ăn, rạp phim | Đi chơi cùng, nhắc lại thời độc thân, kéo nhân vật ra khỏi nhà |
| Hàng xóm | Một bà cụ hoặc một gia đình nhỏ | Sân, cổng nhà | Chia sẻ cây giống, món ăn; kết bạn chậm |
| Người quen | Thủ thư, chủ hiệu sách, chủ spa, người bán hàng | Thư viện, hiệu sách, spa, siêu thị | Gợi ý sách, công thức, món đồ theo mùa |
| Thú cưng | Chó hoặc mèo, người chơi tự chọn mua ở cửa hàng thú cưng | Trong nhà, ngoài phố, spa | Người đồng hành thầm lặng; có hành động riêng |

Mối quan hệ: không dùng thanh "độ thân mật" hiển thị số; thứ ghi nhớ quan hệ là những "kỷ niệm" (một trang tranh nhỏ) mỗi lần hai người cùng làm gì đó. NPC nhớ những gì người chơi làm (món đã nấu, sách đã đọc) và nhắc lại trong lời thoại. Không có tuyến tình cảm bắt buộc.

Lời thoại: hiện bằng chữ, ngắn, đời thường (có thể có giọng địa phương nhẹ). Không lồng tiếng; thay vào đó dùng tiếng lẩm nhẩm rất nhẹ (như trong hoạt hình) khi nhân vật nói.

## 8. Tiến trình và phần thưởng

Tiến trình đo bằng những gì người chơi đã sống và sưu tầm được, không phải bằng điểm số hay cấp độ, và không có gì bị mất đi.

- Thước đo "Bình yên": mỗi hoạt động trọn vẹn tạo ra một "khoảnh khắc" lưu vào nhật ký. Khoảnh khắc chỉ tăng, không bao giờ giảm. Khi đủ khoảnh khắc trong một chương, chương kế tiếp mở ra; mốc đặt thấp và đa dạng (đọc sách cũng được, nấu ăn cũng được). Thanh này hiển thị như một bức tranh được tô màu dần (ví dụ một cành cây nở thêm hoa), không hiện con số.
- Sưu tầm: công thức (món Việt: nấu, ăn ở quán, hỏi hàng xóm); hạt giống/cây (mua, được tặng, nhân giống); đồ trang trí (mua, quà tặng, tự làm); quần áo (cửa hàng, quà tặng); sách (hiệu sách, thư viện); kỷ niệm (trang tranh nhỏ trong nhật ký).
- Tiền bạc: nhân vật có thu nhập ổn định được kể lướt qua (đi làm không phải một màn chơi). Tiền đủ cho nhu cầu cơ bản, chỉ dùng để chọn mua đồ yêu thích; không có nợ, không có thiếu tiền ép buộc. Ở giai đoạn hôn nhân và có con, chi tiêu tăng lên được kể bằng cảnh và lời thoại, nhưng người chơi vẫn không bao giờ bị thiếu để chơi tiếp.
- Nhật ký và kết thúc: nhật ký là một cuốn sổ tranh tự vẽ theo từng ngày. Đêm cuối, game lật lại cả cuốn sổ; trang nào đã có sẽ hiện trong phần kết, trang nào chưa có để trống nhẹ nhàng. Chỉ có một kết thúc chính, nhưng phần kết khác nhau theo những gì người chơi đã trải qua.

## 9. Phong cách nghệ thuật

Xem `ART_STYLE.md` (mô tả gốc, quy tắc, prompt chuẩn, bảng nhân vật).

## 10. Âm thanh và âm nhạc

- Nhạc nền: nhạc không lời, nhịp chậm, nhạc cụ mộc (piano, guitar, đàn tranh, sáo trúc). Mỗi mùa một giai điệu chủ đạo; dịp Tết và Trung thu có bản phối riêng.
- Tiếng đời thường: mưa trên mái, ve mùa hè, xe máy xa xa, nồi cơm sôi, tiếng chợ, lật sách. Mỗi địa điểm có bộ tiếng nền riêng.
- Đổi theo khung giờ: nhạc sáng nhẹ và thưa, tối ấm và chậm dần, đêm gần như chỉ còn tiếng môi trường.
- Phản hồi thao tác: mỗi chạm có một âm thanh nhỏ đặc trưng (gõ gỗ, nước rót) thay cho hiệu ứng điểm số.
- Lời nói: không lồng tiếng; chỉ dùng tiếng lẩm nhẩm nhẹ.

## 11. UI/UX và điều khiển

Giao diện làm như một cuốn sổ tay: ít chữ số, ít nút, mọi thứ có thể bấm bằng một ngón tay.
- Điều khiển: chạm là chính, kéo thả cho hoạt động, chơi được bằng một tay; trên máy tính dùng chuột. **Màn hình ngang 16:9.**
- Giao diện chính: gần như không có HUD. Thời gian hiển thị bằng ánh sáng và một biểu tượng nhỏ (mặt trời, mặt trăng).
- Hộp thoại: văn bản ngắn theo kiểu trang sách, có thể bấm để chuyển nhanh.
- Menu: mở như sổ tay với các tab: nhật ký, tủ đồ, sổ công thức, vườn, đồ trang trí.
- Lưu game: tự lưu cuối mỗi khung giờ; thoát bất cứ lúc nào không mất tiến trình.
- Dễ tiếp cận: chữ đọc được ở cỡ lớn, tương phản đủ trên nền giấy, có chế độ giảm chuyển động.

## 12. Kỹ thuật, phạm vi MVP và lộ trình

Phạm vi MVP (đề xuất):

| Hạng mục | Trong MVP | Để sau |
| --- | --- | --- |
| Nhân vật | Cả nhân vật nam và nữ có đầy đủ hoạt ảnh, 3–5 bộ quần áo mỗi bên | Thêm trang phục |
| Nhà | Một căn nhà gồm phòng khách, bếp, phòng ngủ, ban công | Sân vườn, nhà mở rộng |
| Hoạt động | Việc nhà, nấu ăn, trồng cây, nghỉ ngơi, chăm thú cưng cơ bản | Thay đồ chi tiết, trang trí tự do |
| Địa điểm | Siêu thị, thư viện và cửa hàng thú cưng | Hiệu sách, rạp phim, quán ăn, spa, cửa hàng quần áo |
| Cốt truyện | Giai đoạn 1: chương mở đầu (căn phòng cũ, nhà bố mẹ) + Tết | Các chương còn lại (hôn nhân, có con) và kết |
| NPC | 3 người (một người thân, một hàng xóm, một thủ thư) | Phần còn lại |
| Âm thanh | 2–3 bản nhạc, bộ tiếng động cơ bản | Toàn bộ nhạc theo mùa |

Đề xuất về kỹ thuật:
- Nền tảng: game web 2D chạy trên trình duyệt, tối ưu cho điện thoại (cảm ứng, tải nhanh, dung lượng nhỏ). Màn hình ngang 16:9 đã chốt. Còn cần chốt: có đóng gói thành ứng dụng hay không.
- Dữ liệu tách khỏi mã: lời thoại, công thức, cây trồng, lịch lễ, sự kiện đều là tệp dữ liệu để thêm nội dung mà không sửa phần lõi.
- Hệ thống cốt truyện: một hệ thống sự kiện đơn giản theo điều kiện (ngày, chương, khoảnh khắc đã có) là đủ; không cần rẽ nhánh phức tạp.
- Lưu game: một tệp trạng thái duy nhất, tự lưu cuối mỗi khung giờ.

Lộ trình theo giai đoạn (có cửa kiểm tra):
1. Thử phong cách: một trang tranh (nhà), một nhân vật có hoạt ảnh đi bộ và một việc nhà. Cửa kiểm tra: nhìn vào có cảm giác bình yên, đúng phong cách.
2. Lát cắt chơi được: một ngày trọn vẹn (thức dậy đến đi ngủ) với bốn hoạt động. Cửa kiểm tra: người thử muốn chơi thêm một ngày.
3. Chương mở đầu + Tết: cốt truyện, NPC, lễ Tết, nhật ký. Cửa kiểm tra: người thử nhớ ít nhất một NPC.
4. Mở rộng thành cả chặng đời: các chương còn lại, địa điểm, dịp lễ ưu tiên.
5. Hoàn thiện: âm nhạc, dịch tiếng Anh, kiểm thử, phát hành.

## 13. Rủi ro và câu hỏi còn mở

| Rủi ro | Mức | Cách giảm |
| --- | --- | --- |
| Phạm vi quá rộng (nhiều hoạt động, địa điểm, dịp lễ) | Cao | Lát cắt MVP nhỏ; mở rộng theo giai đoạn, có cửa kiểm tra |
| Phong cách không đồng nhất giữa các tài nguyên | Cao | Bộ tranh mẫu, mô tả gốc cố định, nhân vật chia bộ phận |
| Chơi lặp lại nhàm chán vì không có thử thách | Trung bình | Thói quen mở cảnh mới, sự kiện theo mùa, mạch chuyện mỗi chương |
| Lượng viết truyện và lời thoại lớn | Trung bình | Giới hạn 8–10 NPC, lời thoại ngắn, dùng lại mẫu câu |
| Độ chính xác văn hóa (món ăn, phong tục Tết, vùng miền) | Trung bình | Chọn miền Bắc làm gốc; nhờ người quen kiểm tra lời thoại và chi tiết |
| Thời gian làm của một người | Cao | Chốt lộ trình theo cửa kiểm tra, không theo ngày |
| Khối lượng nhân vật theo độ tuổi (nam/nữ, bố mẹ già, con lớn dần) | Cao | Làm một bộ khung nhân vật dùng chung, biến thể theo độ tuổi sau |

Quyết định đã chốt (từ các câu hỏi mở):
- Nền tảng: di động và game web; màn hình ngang. Phát hành miễn phí trước, bản mở rộng sau.
- Nhân vật chính: làm cả nam và nữ từ MVP. Bạn đời: người chơi tự chọn hình ảnh. Con: một bé.
- Vùng miền: miền Bắc. Thú cưng: người chơi tự chọn mua ở cửa hàng thú cưng.
- NPC (kể cả bạn đời và con): tên do người chơi đặt, không có tính cách riêng.
- Không kể cảnh mất mát. Không có chế độ chơi tự do sau kết thúc.
- Ý nghĩa câu chuyện: chữa lành và có ý nghĩa rõ ràng (bình yên đến từ chấp nhận điều đã gác lại và nhận ra điều đã có).

Còn mở:
- Giới tính của bé (cố định hay cho người chơi chọn)?
- Có đóng gói thành ứng dụng di động hay chỉ chạy web?
- Nguồn gốc cụ thể của sự mệt mỏi lúc mở đầu (đổi việc, nghỉ việc, về quê)?
