# Human_resource_management
## 💡 Mục tiêu
API quản lý người dùng với xác thực JWT và phân quyền.

## ⚙️ Công nghệ sử dụng
- Node.js, Express.js
- MongoDB
- JWT, Bcrypt

## 🚀 Tính năng chính
- [x] Đăng ký, đăng nhập
- [x] Phân quyền Admin/User
- [x] Xác thực với JWT access/refresh token
- [x] CRUD người dùng

## 📂 Cấu trúc thư mục
src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── utils/
├── app.js

## 📬 Hướng dẫn chạy project
1. Clone project: `git clone https://github.com/CvMuong/human_resource_management`
2. Cài đặt: `npm install`
3. Thiết lập `.env`
    PORT = 3000
    NODE_ENV = development
    MONGO_URI = mongodb://localhost:27017/human-resource-management
    JWT_SECRET = your_jwt_secret
4. Chạy: `npm start`

## 🔗 API Collection
👉 [Postman Collection](https://www.postman.com/your-link)

## 📸 Ảnh minh hoạ (nếu có)
