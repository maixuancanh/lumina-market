# 🎬 Hướng dẫn Demo từng bước
# Hướng dẫn chi tiết để quay video demo

## 🎯 Chuẩn bị Demo (5 phút trước khi quay)

### **1. Khởi động Backend**
```bash
# Terminal 1
cd d:\lpagent\backend
npm run dev
# Chờ: "Server running on port 4002"
```

### **2. Khởi động Frontend**
```bash
# Terminal 2
cd d:\lpagent\frontend
npm run dev
# Chờ: "Ready on http://localhost:3000"
```

### **3. Kiểm tra Hệ thống**
```bash
# Terminal 3
cd d:\lpagent
node verify-complete-system.js
# Kiểm tra tất cả hệ thống hoạt động
```

### **4. Mở các Tab Browser**
- **Tab 1:** http://localhost:3000 (Trang chủ)
- **Tab 2:** http://localhost:3000/builder (Xây dựng chiến lược)
- **Tab 3:** http://localhost:3000/dashboard (Bảng điều khiển)
- **Tab 4:** http://localhost:3000/marketplace (Thị trường)
- **Tab 5:** http://localhost:4002/api/health (Trạng thái Backend)

---

## 🎬 Các bước Quay Video (3 phút)

### **🎯 Phút 0:00 - 0:30: Giới thiệu & Vấn đề**

**Hành động trên màn hình:**
1. **Hiện Terminal 3** với kết quả kiểm tra hệ thống
2. **Nhấn mạnh các chỉ số:** "All systems operational", "94/100 score"
3. **Chuyển sang Tab 1** (Trang chủ)

**Lời thoại:** 
"Xin chào ban giám khảo, tôi là [Tên], thành viên đội Lumina Market.

Hôm nay tôi xin trình bày dự án Lumina Market - một nền tảng đột phá cho thị trường cung cấp thanh khoản trên Solana.

Vấn đề chúng tôi giải quyết: Việc cung cấp LP đòi hỏi kiến thức sâu về quản lý rủi ro, theo dõi Volume và APY liên tục. Hầu hết người dùng phổ thông không có thời gian hoặc kỹ năng để tối ưu hóa vị thế LP của mình.

Giải pháp của chúng tôi:
- Đối với Strategists: Cung cấp công cụ No-code Builder sử dụng AI để chuyển đổi ý tưởng giao dịch thành logic thực thi mà không cần viết code.
- Đối với Investors: Cung cấp marketplace minh bạch với Proof of Profit cho phép họ đầu tư vào những chiến lược hiệu quả nhất thông qua AI Agent."

---

### **🎯 Phút 0:30 - 1:00: Luồng hoạt động**

**Hành động trên màn hình:**
1. **Kéo xuống** trên trang README để hiện mermaid diagrams
2. **Trỏ vào System Workflow diagram**
3. **Nhấn mạnh 4 bước** với con trỏ chuột

**Lời thoại:**
"Đầu tiên, tôi sẽ hướng dẫn qua luồng hoạt động của hệ thống.

Như các bạn thấy trên màn hình, chúng tôi có 4 bước chính:

Bước một: Tạo Chiến lược - Strategists sử dụng AI Builder để chuyển đổi ngôn ngữ tự nhiên thành logic JSON.

Bước hai: Chứng minh hiệu quả - Hệ thống backtest chiến lược với dữ liệu lịch sử từ LP Agent API.

Bước ba: Đầu tư và Kích hoạt - Investors lướt marketplace, lựa chọn chiến lược và kích hoạt AI Agent.

Bước bốn: Thực thi tự động - AI Agents chạy 24/7 để theo dõi điều kiện thị trường và thực thi các chiến lược.

Đây chính là sự kết hợp hoàn hảo giữa AI, Blockchain, và DeFi!"

---

### **🎯 Phút 1:00 - 1:30: Demo AI Builder**

**Hành động trên màn hình:**
1. **Chuyển sang Tab 2** (Trang Builder)
2. **Nhập vào ô input:** "If SOL-USDC volume increases by 25% in 1 hour and APY is above 15%, zap in 75% of capital. If price volatility exceeds 5% in 30 minutes, zap out to preserve capital."
3. **Click "Analyze Strategy"**
4. **Chờ AI phản hồi**
5. **Hiện kết quả JSON**
6. **Điền thông tin chiến lược:** Tên, Mức độ rủi ro, Mô tả
7. **Click "Mint Strategy NFT"**

**Lời thoại:**
"Bây giờ tôi sẽ demo tính năng năng cốt lõi của Lumina Market - AI Builder.

Trên màn hình các bạn thấy là trang Builder. Tôi sẽ nhập một chiến lược bằng ngôn ngữ tự nhiên:

'If SOL-USDC volume increases by 25% in 1 hour and APY is above 15%, zap in 75% of capital. If price volatility exceeds 5% in 30 minutes, zap out to preserve capital.'

Sau đó tôi click 'Analyze Strategy', AI Ollama Gemma3:12B của chúng tôi sẽ phân tích và tạo ra JSON logic.

Kết quả: AI sẽ tạo ra các điều kiện và hành động cụ thể:
- Conditions: volume tăng 25%, APY trên 15%
- Actions: zap in 75% vốn
- Frequency: realtime

Từ đó có thể mint thành Strategy NFT!"

---

### **🎯 Phút 1:30 - 2:00: Demo Dashboard**

**Hành động trên màn hình:**
1. **Chuyển sang Tab 3** (Trang Dashboard)
2. **Hiện AI Agent Status:** "🟢 Running 24/7"
3. **Hiện Real-time Pool Data:** APY, TVL, Volume
4. **Hiện Strategy Performance:** Các chiến lược đang active
5. **Hiện Execution Logs:** Các giao dịch gần đây
6. **Refresh trang** để hiện cập nhật real-time

**Lời thoại:**
"Tiếp theo, tôi sẽ chuyển sang Dashboard để cho thấy AI Agent đang hoạt động như thế nào.

Trên Dashboard, các bạn sẽ thấy:
- AI Agent Status: đang Running 24/7
- Real-time Pool Data: APY 18.5%, TVL 2.5 triệu đô la, Volume 150 nghìn đô la
- Strategy Performance: 3 chiến lược đang active
- Execution Logs: các giao dịch Zap in/out được thực thi

AI Agent của chúng tôi đang theo dõi dữ liệu từ LP Agent API theo thời gian thực. Khi điều kiện được thỏa mãn, nó sẽ tự động gọi Zap in/out!"

---

### **🎯 Phút 2:00 - 2:30: Demo Marketplace**

**Hành động trên màn hình:**
1. **Chuyển sang Tab 4** (Trang Marketplace)
2. **Hiện các chiến lược available:** 3 thẻ chiến lược
3. **Click vào chiến lược đầu tiên** để xem chi tiết
4. **Hiện biểu đồ PnL** và các chỉ số hiệu suất
5. **Hiện nút "Invest Now"**
6. **Di chuột qua các thẻ** để hiện mức độ rủi ro

**Lời thoại:**
"Bây giờ tôi sẽ demo Marketplace nơi các nhà đầu tư có thể tìm và đầu tư vào các chiến lược.

Trên Marketplace, các bạn sẽ thấy:
- 3 chiến lược đang available: Solana Stable Growth, Aggressive Volatility Hunter, Delta Neutral Guard
- Mỗi chiến lược có: biểu đồ PnL, Max Drawdown, Risk Level
- Nút 'Invest Now' để kích hoạt AI Agent

Đây chính là nơi trí tuệ được token hóa thành NFT, tạo ra một thị trường minh bạch cho các chiến lược LP!"

---

### **🎯 Phút 2:30 - 3:00: Tổng kết**

**Hành động trên màn hình:**
1. **Quay lại Tab 1** (Trang chủ)
2. **Kéo đến link GitHub**
3. **Hiện kiểm tra hệ thống trong Terminal 3**
4. **Trỏ đến các tính năng chính**

**Lời thoại:**
"Tổng kết lại, Lumina Market không chỉ là một dự án công nghệ, mà còn là một cuộc cách mạng trong thế giới DeFi.

Với Lumina Market:
- Strategists có thể kiếm tiền từ trí tuệ của mình
- Investors có thể tiếp cận các chiến lược chuyên nghiệp
- AI Agent đảm bảo thực thi 24/7 không cảm xúc
- Tất cả minh bạch và được chứng minh bằng dữ liệu thật

Điểm khác biệt của chúng tôi:
1. Tích hợp Ollama AI thật với mô hình Gemma3:12B
2. Sử dụng LP Agent API với dữ liệu thật
3. Zap operations thực thi trên blockchain
4. No-code interface cho người dùng phổ thông

Lumina Market đang chạy hoàn hảo:
- Backend trên port 4002
- Frontend trên port 3000
- AI Agent 24/7 monitoring
- Tất cả endpoints hoạt động với real data!

Mời ban giám khảo truy cập:
- GitHub Repository: github.com/maixuancanh/lumina-market
- Live Demo: sẵn sàng deploy khi cần
- Documentation: đầy đủ trong README

Xin chân thành cảm ơn!"

---

## 🎬 Tips Kỹ thuật để Quay

### **Cài đặt Ghi màn hình:**
- **Độ phân giải:** 1920x1080 tối thiểu
- **Frame rate:** 30fps
- **Âm thanh:** Microphone rõ, không tiếng ồn
- **Phần mềm:** OBS Studio (miễn phí) hoặc Camtasia

### **Cài đặt Browser:**
- **Zoom:** 100% để nhất quán
- **Bookmarks bar:** Ẩn cho giao diện sạch
- **Developer tools:** Đóng (F12)
- **Extensions:** Tắt các cái không cần thiết

### **Cài đặt Terminal:**
- **Font size:** 14pt để dễ đọc
- **Color scheme:** Dark theme để tương phản tốt
- **Window size:** Hiện toàn bộ nội dung terminal

### **Tips Quay:**
1. **Thử một lần** trước khi quay thật
2. **Nói chậm** và rõ ràng
3. **Di chuyển chuột** có chủ đích
4. **Chờ tải** - đừng vội
5. **Hiện dữ liệu thật** - đừng dùng mock

### **Xử lý Lỗi:**
- **Nếu AI không phản hồi:** "AI đang xử lý, hãy kiểm tra logs"
- **Nếu trang tải chậm:** "Xử lý dữ liệu real-time cần thời gian"
- **Nếu API lỗi:** "Hệ thống có cơ chế fallback"

---

## 🎯 Checklist Cuối cùng

### **Trước khi Quay:**
- [ ] Backend chạy trên port 4002
- [ ] Frontend chạy trên port 3000
- [ ] Tất cả tab browser mở và tải xong
- [ ] Kiểm tra âm thanh xong
- [ ] Đặt độ phân giải đúng

### **Trong khi Quay:**
- [ ] Bắt đầu với kiểm tra hệ thống
- [ ] Hiện mỗi tính năng rõ ràng
- [ ] Nói với tốc độ nhất quán
- [ ] Nhấn mạnh các đổi mới
- [ ] Kết thúc với link GitHub

### **Sau khi Quay:**
- [ ] Kiểm tra chất lượng âm thanh
- [ ] Xác nhận tất cả bước hiện rõ
- [ ] Đảm bảo thời lượng 3 phút
- [ ] Export chất lượng cao
- [ ] Test playback trên các thiết bị khác

**Sẵn sàng để quay video demo chuyên nghiệp!** 🎬
