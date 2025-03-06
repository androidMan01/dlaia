# 基于node镜像构建
FROM node:23

# 设置工作目录
WORKDIR /app

# 拷贝package.json和package-lock.json
COPY package*.json ./
COPY pnpm-lock.yaml ./

# 设置镜像源并安装 pnpm
RUN npm config set registry https://registry.npmmirror.com \
    && npm install -g pnpm

# 安装依赖
RUN pnpm install

# 拷贝所有文件
COPY . .

# 构建应用
RUN pnpm run build
