# meetingRoom-system-backend

> 校园会议室管理系统,采用node.js的Express框架搭建,采用MySQL数据库存储数据

## 构建命令行

```bash
# 克隆项目
git clone https://github.com/ShuyaoZhang/meetingRoom-system-backend

# 进入项目目录
cd meetingRoom-system-backend

# 安装依赖
npm install

# 启动服务
npm start
```

浏览器访问 [http://localhost:3000](http://localhost:3000)


## 环境准备
node（版本不限）

## 部署

1、完成数据库配置

- 根目录下config/mysql.js文件填写数据库联接配置

2、安装依赖
- npm config set registry https://registry.npm.taobao.org
- npm install

3、开放端口
- 代码默认3000

4、运行命令
- npm run start
- 执行命令后，通过端口3000即可访问

5、以下为docker部署的Dockerfile文件内容，可供参考

```bash
FROM node:10

# 指定工作目录
WORKDIR /data/js

# 将 package.json 拷贝到工作目录
COPY package.json .

# 安装 npm 依赖
RUN npm config set registry https://registry.npm.taobao.org && npm install

# 拷贝源代码
COPY . .

# 开放 3000 端口
EXPOSE 3000

# 设置镜像运行命令
ENTRYPOINT ["npm", "run"]
CMD ["start"]
```

## 数据库
- 参见数据库文档






