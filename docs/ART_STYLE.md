# Finding Peace — Phong cách nghệ thuật và prompt chuẩn

## Mô tả gốc (cố định)
Digital gouache with dry-brush texture on plain off-white watercolor paper, empty background. Elongated figures, small heads, bulky clothes, thin legs, minimal faces with dot eyes and pink blush cheeks.

## Quy tắc
- Gouache phẳng, mờ đục, có nét cọ khô; không viền, không gradient, không đổ bóng 3D (bóng chỉ là mảng màu phẳng).
- Nhân vật: thân dài, đầu nhỏ, áo rộng dày, chân gầy; mặt chỉ có hai chấm mắt và má hồng, không có miệng.
- Bảng màu trầm, đất: nâu ấm, xanh rêu, đỏ gạch, vàng nghệ, hồng bụi, kem. Nền giấy trắng ngà.
- Không có chữ trong tranh.
- Màn hình ngang 16:9; phần ba dưới của cảnh để trống sàn cho chuyển động nhân vật.
- Nhân vật tách thành bộ phận (đầu, thân, tay, chân) để hoạt ảnh cắt rời; hoạt ảnh khung hình ở ~6–8 fps.

## Prompt chuẩn đã thử (model: gpt-image-2-5-sunburst)

### 1. Kiểu nền giấy trống (text2image, 3:4)
Digital gouache illustration with dry-brush texture on plain off-white watercolor paper, empty paper background, no walls or floor drawn. Separate hand-painted objects floating on the paper (bed, desk with lamp, window, plant, clothes rack, slippers) and a young Vietnamese woman: elongated figure, small head, bulky oversized cardigan, thin legs, minimal face with only two dot eyes and soft pink blush cheeks, no mouth. Flat matte opaque gouache, no outlines, no gradients, no 3D shading. Muted earthy palette: warm brown, moss green, brick red, turmeric yellow, dusty pink, cream. No text.

### 2. Kiểu có không gian phòng (image2image từ ảnh 1)
Keep everything identical; only add a back wall (cream or dusty sage), warm brown wooden floor, skirting board and a hint of ceiling; flat painted shadows.

### 3. Chuyển sang màn ngang (image2image từ ảnh 2, 16:9)
Recompose this exact bedroom scene into a wide landscape 16:9 game screen. Keep the same young woman, objects, colors and flat matte gouache dry-brush style. Spread the room horizontally as a side-view stage: bed on the left, woman standing in the middle with free walking space, desk with lamp and sketchbook, window with metal grille and curtain on the right, plant on a stool, clothes rack, slippers. Leave the lower third mostly clear floor for gameplay. No outlines, gradients, 3D shading or text.

### 4. Bảng nhân vật (image2image, tham chiếu phong cách ảnh 1)
Using the art style of the reference image only, draw a character reference sheet of a new character: a young Vietnamese [woman | man with short black hair]. Top row: five full-body views evenly spaced (front, three-quarter, side, back, side walking pose). Bottom row: three outfit variations standing front view: [cardigan with trousers | oversized sweater with loose trousers], cozy pajamas, and a going-out coat or jacket with scarf. Elongated figure, small head, bulky clothes, thin legs, minimal face with only two dot eyes and pink blush cheeks, no mouth. Keep proportions and face identical in every view. Muted earthy palette. No outlines, gradients, text or labels.

## Mẹo
- Luôn dùng ảnh mẫu làm tham chiếu (image2image) để giữ phong cách đồng nhất.
- Sinh nhân vật và đồ vật trên nền giấy trống để dễ tách lớp; cảnh phòng sinh sau.
