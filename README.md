
# <p align="center">E-commerce MERN Stack</p>
  
# 🛒 1. Overview 

Đây là một ứng dụng thương mại điện tử được xây dựng với MERN Stack (MongoDB, Express.js, React, Node.js).  
Người dùng có thể duyệt sản phẩm, thêm vào giỏ hàng và thanh toán.  
    
## 🚀 2. Figures
- Đăng nhập/Đăng ký:
  + 🚪 Người dùng có thể tạo tài khoản hoặc đăng nhập vào tài khoản hiện có.
Cập nhật hồ sơ/mật khẩu:
  + 🔐 Người dùng có thể cập nhật thông tin hồ sơ và thay đổi mật khẩu.
Quản lý mật khẩu

- Đặt lại mật khẩu: 📧 , người dùng có thể đặt lại mật khẩu qua email.
Giỏ hàng

- Thêm/Xóa mục: 🛒 Người dùng có thể thêm mục vào giỏ hàng hoặc xóa mục khi cần.
- Cập nhật số lượng: 🔢 Có thể điều chỉnh số lượng mục trong giỏ hàng.

- Mục đã lưu
  + Lưu để xem sau: 💾 Người dùng có thể di chuyển mục từ giỏ hàng sang danh sách "Đã lưu để xem sau" hoặc xóa mục khỏi danh sách đó.

- Wish list
  + Thêm/Xóa mục: ❤️ Người dùng có thể thêm mục vào danh sách mong muốn hoặc xóa mục khỏi danh sách đó.
- Duyệt sản phẩm
  + Phân trang: 📚 Sản phẩm được phân trang, với 8 sản phẩm được hiển thị trên mỗi trang theo mặc định.
  + Tìm kiếm: 🔍 Người dùng có thể tìm kiếm sản phẩm.
  + Bộ lọc: 🎛️ Sản phẩm có thể được lọc dựa trên danh mục, xếp hạng và phạm vi giá.

- Quy trình thanh toán

  + Thông tin vận chuyển: 🚚 Thông tin vận chuyển được lưu trữ trong bộ nhớ phiên để dễ dàng thanh toán.
  + Tùy chọn thanh toán: 💳 Người dùng có thể thanh toán qua cổng thanh toán Paytm để thanh toán.

- Quản lý đơn hàng

  + Đơn hàng của tôi: 📦 Người dùng có thể xem lịch sử đơn hàng của mình bằng nhiều bộ lọc khác nhau.
  + Chi tiết đơn hàng: ℹ️ Có thể truy cập chi tiết của tất cả các mặt hàng đã đặt hàng.
  + Xác nhận đơn hàng: ✉️ Người dùng nhận được thông báo qua email với thông tin chi tiết đơn hàng đầy đủ khi đặt hàng.

- Review sản phẩm
  + Đánh giá sản phẩm: 🌟 Người dùng có thể đánh giá sản phẩm.

- Tính năng bên Admin
  + Bảng điều khiển: 🖥️ Quản trị viên có quyền truy cập vào bảng điều khiển chuyên dụng.
  + Quản lý đơn hàng: 📊 Quản trị viên có thể cập nhật trạng thái đơn hàng và xóa đơn hàng.
  + Quản lý sản phẩm: 📝 Quản trị viên có thể thêm/cập nhật sản phẩm.
  + Quản lý người dùng: 👥 Quản trị viên có thể cập nhật dữ liệu người dùng và xóa người dùng.
  + Quản lý đánh giá: 📜 Quản trị viên có thể xem và xóa đánh giá sản phẩm.
  + Quản lý kho: 📉 Kho sản phẩm tự động giảm khi giao hàng.
        
## 🛠️ 3. Tech Stack
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en)
- [MongoDb](https://www.mongodb.com/)
- [Express.Js](https://expressjs.com/)
- [Redux](https://redux.js.org/)
    
## 🛠️ 4. Install Dependencies 
- Phía Backend 
```bash
cd backend
npm install
npm start
```
- Phía Frontend 
```bash
cd frontend
npm install
npm start
```
- Cấu hình file .env
Tạo file .env trong thư mục backend và thêm các biến môi trường sau:
```bash
PORT = 3001
MONGO_DB= your_mongodb_password
ACCESS_TOKEN=access_token
REFRESH_TOKEN=refresh_token
```
- Tạo file .env trong thư mục frontend và thêm các biến môi trường sau:
```bash
REACT_APP_API_URL=http://localhost:3000/api
```
## 🚀 5. Sử dụng (Usage)
Hướng dẫn ngắn gọn về cách sử dụng ứng dụng.

Ví dụ:

Người dùng tạo tài khoản hoặc đăng nhập.
Duyệt qua danh mục sản phẩm và thêm sản phẩm vào giỏ hàng.
Truy cập giỏ hàng và thực hiện thanh toán trực tuyến.
Quản trị viên có thể đăng nhập và quản lý sản phẩm, đơn hàng và người dùng.


## ➤ 📚 6. API User
| Phương thức | Endpoint                       | Mô tả                         |
|-------------|--------------------------------|-------------------------------|
| **POST**    | `/api/users/sign-up`           | Đăng ký tài khoản             |
| **POST**    | `/api/users/sign-in`           | Đăng nhập tài khoản           |
| **POST**    | `/api/users/log-out`           | Đăng xuất tài khoản           |
| **PUT**    | `/api/users/update-user/:id`    | Cập nhật tài khoản            |
| **DELETE**    | `/api/users/delete-user/:id` | Xóa tài khoản                 |
| **GET**    | `/api/users/getAll`             | Lấy tất cả tài khoản          |
| **GET**    | `/api/users/get-details/:id`    | Lấy chi tiết tài khoản        |


## ➤ 📚 7. API Product
| Phương thức | Endpoint                         | Mô tả                         |
|-------------|----------------------------------|-------------------------------|
| **POST**    | `/api/product/create`            | Tạo sản phẩm                  |
| **PUT**     | `/api/product/update/:id`        | Cập nhật sản phẩm bất kì      |
| **DELETE**  | `/api/product/delete/:id`        | Xóa một sản phẩm              |
| **GET**     | `/api/product/get-all`           | Lấy tất cả sản phẩm           |
| **GET**     | `/api/product/get-details/:id`   | Lấy chi tiết sản phẩm         |


## 🙇 8. Author
#### Phan Thiết Trung
- Github: [@Trung](https://github.com/trungka982004)
#### Đỗ Duy Tân
- Github: [@Trung](https://github.com/trungka982004)
#### Võ Minh Tài
- Github: [@Trung](https://github.com/trungka982004)
        

        
