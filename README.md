# Jasper 登录风格预览

一个独立的登录页设计预览项目，包含十种视觉风格，参考 [Ant Design Pro 官方示例](https://pro-components.antdigital.dev/~demo/_zh_CN_components_login_form_2.html) 的登录区域与品牌展示结构。

支持风格总览、浅色/深色筛选、收藏、桌面/手机预览、纯净预览和账号/手机号表单演示。它用于比较设计，不连接商城后端或真实认证服务。

## 快速启动

环境要求：**Node.js 18.17 或更高版本**，推荐使用 Node.js 22。npm 随 Node.js 安装。无需 Python，无需先执行 `npm install`。

项目位置：

```text
E:\dev_workspace\github\jasper-login-styles
```

在 PowerShell 中启动：

```powershell
cd E:\dev_workspace\github\jasper-login-styles
npm run setup
npm start
```

打开 [http://127.0.0.1:8896/](http://127.0.0.1:8896/)。终端按 `Ctrl+C` 停止服务。

`npm run setup` 会准备锁定版本的资源并编译 JSX。当前迁移副本已带有 `vendor/` 资源，准备时会校验后直接复用；从 GitHub 克隆的新副本第一次准备时需要联网下载资源。准备完成后，页面运行无需外网。

以后再次启动，只需：

```powershell
npm start
```

如果端口被占用：

```powershell
npm start -- --port 8897
```

然后访问 [http://127.0.0.1:8897/](http://127.0.0.1:8897/)。也支持通过环境变量 `PORT` 指定端口。

## 命令说明

| 命令 | 用途 |
| --- | --- |
| `npm run setup` | 下载或校验前端资源，并编译 `app.jsx` |
| `npm run build` | 将 `app.jsx` 编译成浏览器使用的 `app.js` |
| `npm start` | 启动本地预览，默认端口 8896 |
| `npm run dev` | 与 `npm start` 相同 |
| `npm run check` | 检查应用和工具脚本的 JavaScript 语法 |

修改 `app.jsx` 后执行 `npm run build`，再刷新浏览器。修改 `styles.css` 后直接刷新即可。开发服务器不提供自动编译或热更新。

## 项目结构

```text
jasper-login-styles/
├── index.html       # 网页入口
├── app.jsx          # 十款登录页、总览及演示交互源码
├── app.js           # 编译后的浏览器脚本
├── styles.css       # 页面与十款风格的样式
├── package.json     # 启动、准备和检查命令
├── prepare.cjs      # 下载固定版本资源并校验 SHA256
├── build.cjs        # 使用 Babel 编译 JSX
├── server.cjs       # Node.js 本地静态服务器
├── vendor/          # 本地前端资源，已被 Git 忽略
├── .gitignore
└── README.md
```

## 十种风格

| 编号 | 风格 | 特征 |
| --- | --- | --- |
| 01 | 云端商务 | 浅蓝品牌画布、经营概览、白色表单 |
| 02 | 极简留白 | 单色大字、细线、充足留白 |
| 03 | 深空控制台 | 深蓝、星轨、暗色表单 |
| 04 | 东方青玉 | 青绿山水、宋体、温润卡片 |
| 05 | 活力橙光 | 零售橙、立体包裹、强对比 |
| 06 | 流光玻璃 | 柔紫光晕、磨砂材质、通透层次 |
| 07 | 瑞士红白 | 朱红、网格、大字、方角 |
| 08 | 曜石鎏金 | 深色、金属细线、拱门 |
| 09 | 蓝图秩序 | 工程网格、线框立方体、工具式表单 |
| 10 | 柔和杏桃 | 杏桃色、柔软曲面、亲和表单 |

点击卡片进入完整预览，用左右方向键切换方案，`Esc` 返回总览。收藏仅在当前页面内存中保存，刷新后清空。

直接访问方案 01：

```text
http://127.0.0.1:8896/?style=01
```

纯净预览：

```text
http://127.0.0.1:8896/?style=01&clean=1
```

## 演示边界

- 账号密码表单仅执行本地必填及长度校验，不提交真实登录请求。
- 手机号登录是设计演示，演示验证码为 `246810`，不会发送短信。
- 企业微信、统一登录、忘记密码和申请账号仅展示说明。
- 所有图形由 CSS 和基础 SVG 图标构成，没有外部图片、字体或视频请求。

商城正式登录页位于独立的商城管理端工程中；本项目保留用于比较风格的十款预览。

## GitHub 与云端运行

此项目已可独立放入 GitHub 仓库，当前整理操作未创建远程仓库或推送代码。上传源码时保留 `.gitignore`；`vendor/` 可在新环境执行 `npm run setup` 重建。

在 GitHub Codespaces 等有 Node.js 的云端开发环境中：

```bash
npm run setup
npm start -- --host 0.0.0.0 --port 8896
```

在云端开发环境的端口面板中转发 8896 端口，使用环境提供的预览地址访问。本地启动默认只监听 `127.0.0.1`。

用于纯静态托管时，先执行 `npm run setup`，然后发布 `index.html`、`app.js`、`styles.css` 和 `vendor/` 下的 React、React DOM、dayjs、Ant Design 及 reset.css 文件。`vendor/babel.cjs` 仅在编译阶段使用，页面不会加载它。

## 版本

React 18.3.1、React DOM 18.3.1、Ant Design 5.21.5、dayjs 1.11.10、Babel Standalone 7.23.2。版本及资源校验值在 `prepare.cjs` 中固定。
