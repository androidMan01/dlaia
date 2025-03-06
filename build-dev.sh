#! /bin/bash
set -e
echo ”开始编译“
projectName="site"

# 使用docker 编译
docker build -t vue-$projectName-build . > build.log 2>&1
echo "编译完成"

# 使用 docker run 创建并启动容器
docker run --name temp-$projectName -d vue-$projectName-build
echo "容器启动完成"

# 复制 dist 目录到本地
docker cp temp-$projectName:/app/dist ./dist
echo "复制编译产物完成"

# 删除容器和镜像
docker rm temp-$projectName
docker rmi vue-$projectName-build
echo "删除容器和镜像完成"


echo "开始调整文件目录..."
mkdir -p ./project/site
mv ./dist/index.html ./project/
mv ./dist/* ./project/site/
mv ./project/* ./dist/
rm -rf project
