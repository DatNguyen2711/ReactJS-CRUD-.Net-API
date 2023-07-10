# Sử dụng image cơ bản để xây dựng ứng dụng ReactJS
FROM node:18-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json (nếu có) vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn ứng dụng vào thư mục làm việc
COPY . .

# Build ứng dụng ReactJS
RUN npm run build

# Cấu hình môi trường chạy
ENV NODE_ENV=production

# Expose cổng mặc định để truy cập ứng dụng
EXPOSE 3000

# Chạy ứng dụng khi container được khởi chạy
CMD [ "npm", "start" ]
