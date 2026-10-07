# ỨNG DỤNG DỰ BÁO THỜI TIẾT (REACT NATIVE)

Ứng dụng di động dự báo thời tiết thời gian thực được xây dựng bằng React Native và TypeScript, tích hợp dữ liệu thời tiết trực tiếp từ Open-Meteo REST API.

---

## 🌟 Tính năng chính

1. **Thời tiết hiện tại**:
   - Hiển thị vị trí hiện tại (GPS hoặc thành phố đã chọn).
   - Nhiệt độ thời gian thực, biểu tượng và mô tả trạng thái thời tiết.
   - Nhiệt độ cao nhất trong ngày, nhiệt độ thấp nhất và nhiệt độ cơ thể cảm nhận.

2. **Dự báo theo giờ (24 giờ tới)**:
   - Danh sách thời tiết theo từng khung giờ trong 24 giờ tiếp theo.
   - Hiển thị thời gian, biểu tượng thời tiết, nhiệt độ và xác suất mưa (%).
   - Chạm vào từng giờ để chuyển sang màn hình xem chi tiết.

3. **Dự báo nhiều ngày (7 ngày tới)**:
   - Dự báo xu hướng thời tiết trong 7 ngày.
   - Hiển thị tên ngày, trạng thái thời tiết, dải nhiệt độ (thấp nhất - cao nhất) và khả năng có mưa.
   - Chạm vào từng ngày để chuyển sang màn hình xem chi tiết.

4. **Xem chi tiết thời tiết (`DetailScreen`)**:
   - Màn hình chuyên sâu phân tích thời tiết theo giờ hoặc theo ngày được chọn.
   - Hiển thị đầy đủ các thông số kèm lời khuyên sinh hoạt phù hợp với thời tiết.

5. **Theo dõi các chỉ số thời tiết chi tiết**:
   - Độ ẩm không khí (%).
   - Tốc độ gió (km/h) và hướng gió (chuyển đổi góc độ sang la bàn tiếng Việt).
   - Chỉ số UV và phân loại mức độ an toàn.
   - Lượng mưa đo được (mm).
   - Áp suất khí quyển (hPa).
   - Tầm nhìn xa ngoài trời (km).

6. **Định vị GPS và Quản lý vị trí**:
   - Tự động xin quyền và lấy tọa độ GPS của thiết bị khi khởi động.
   - Tự động nhận diện tên địa danh tiếng Việt thông qua tọa độ (Reverse Geocoding).
   - Xử lý khi người dùng từ chối quyền vị trí: thông báo thân thiện, chuyển về thành phố mặc định (Hà Nội), hỗ trợ bấm nút bật lại GPS hoặc chọn thủ công các tỉnh thành phố phổ biến tại Việt Nam.

7. **Trải nghiệm người dùng**:
   - Giao diện kính mờ (Glassmorphism) hiện đại, sắc nét.
   - Hỗ trợ đầy đủ trạng thái Tải dữ liệu (Loading), Báo lỗi (Error có nút Thử lại) và Làm mới dữ liệu bằng thao tác kéo xuống (Pull-to-refresh).

---

## 🛠️ Công nghệ sử dụng

- **Framework**: React Native 0.87
- **Ngôn ngữ**: TypeScript 6
- **Điều hướng**: `@react-navigation/native`, `@react-navigation/native-stack`, `react-native-screens`
- **Vị trí**: `@react-native-community/geolocation`, `PermissionsAndroid`
- **Dữ liệu thời tiết**: [Open-Meteo API](https://open-meteo.com) (Miễn phí, không cần API Key)
- **Kiểm thử**: Jest, React Test Renderer

---

## 📋 Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt các công cụ sau:

- **Node.js**: Phiên bản 20 trở lên ([Tải tại đây](https://nodejs.org))
- **JDK (Java Development Kit)**: Phiên bản 17 (khuyên dùng Azul Zulu JDK 17)
- **Android Studio**: Đã cài đặt Android SDK Platform (API 34 hoặc 35) và Android SDK Build-Tools.
- **Biến môi trường**: Đã cấu hình `ANDROID_HOME` và thêm platform-tools vào `PATH`.
- Thiết bị chạy ứng dụng: Máy ảo Android Emulator hoặc điện thoại thật đã bật chế độ **USB Debugging**.

---

## 🚀 Hướng dẫn cài đặt và chạy ứng dụng

### Bước 1: Mở thư mục dự án trong Terminal

```sh
cd d:/mobile/reactnative/demo
```

### Bước 2: Cài đặt các gói phụ thuộc (Dependencies)

Chạy lệnh sau để tải và cài đặt các thư viện:

```sh
npm install
```

### Bước 3: Khởi động Metro Bundler

Chạy Metro server ở một cửa sổ terminal riêng:

```sh
npm start
```

### Bước 4: Chạy ứng dụng trên thiết bị Android

Mở một cửa sổ terminal mới tại thư mục dự án và chạy:

```sh
npm run android
```

Lệnh trên sẽ tự động build ứng dụng, cài đặt lên máy ảo/thiết bị thật và kết nối với Metro Bundler.

*(Lưu ý đối với iOS - chỉ áp dụng trên macOS):*
```sh
cd ios && pod install && cd ..
npm run ios
```

---

## 🧪 Kiểm tra mã nguồn và chạy Test

Dự án đã được cấu hình sẵn các công cụ kiểm tra chất lượng mã nguồn:

1. **Kiểm tra cú pháp và quy chuẩn code (ESLint)**:
   ```sh
   npm run lint
   ```

2. **Kiểm tra kiểu dữ liệu (TypeScript Typecheck)**:
   ```sh
   npx tsc --noEmit
   ```

3. **Chạy Unit Test (Jest)**:
   ```sh
   npm test
   ```

---

## 📂 Cấu trúc thư mục mã nguồn

```text
demo/
├── __tests__/                  # Unit tests (App test, weatherService test)
├── android/                    # Mã nguồn nền tảng Android
├── ios/                        # Mã nguồn nền tảng iOS
├── src/
│   ├── assets/                 # Hình ảnh nền, tài nguyên tĩnh
│   ├── components/             # Các thành phần giao diện tái sử dụng
│   │   ├── ChiSoThoiTiet/      # Lưới hiển thị 8 chỉ số thời tiết
│   │   ├── CityModal/          # Hộp thoại tìm kiếm và chọn thành phố / GPS
│   │   ├── ThoiTietHienTai/    # Khu vực thời tiết hiện tại
│   │   ├── ThoiTietTheoGio/    # Danh sách dự báo 24 giờ
│   │   ├── ThoiTietTheoNgay/   # Danh sách dự báo 7 ngày
│   │   └── WeatherStatus/      # Giao diện LoadingView và ErrorView
│   ├── navigation/             # Cấu hình Stack Navigator
│   │   └── RootNavigator.tsx
│   ├── screens/                # Các màn hình chính
│   │   ├── HomeScreen/         # Màn hình chính
│   │   └── DetailScreen/       # Màn hình chi tiết thời tiết
│   ├── services/               # Xử lý logic gọi API và vị trí
│   │   ├── locationService.ts  # Xử lý GPS và quyền vị trí
│   │   └── weatherService.ts   # Gọi Open-Meteo REST API
│   └── types/                  # Định nghĩa TypeScript Types
│       └── weather.ts
├── App.tsx                     # Điểm khởi động ứng dụng
├── index.js                    # Đăng ký React Native App
└── package.json
```
