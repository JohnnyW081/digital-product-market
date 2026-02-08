🌊 Waterfall App Store (卡片瀑布流数字商店)

一个基于 Next.js 14 开发的现代化数字产品售卖平台。采用响应式瀑布流布局，内置完整的 UI 交互与模拟支付流程。

✨ 核心特性

响应式瀑布流：根据屏幕宽度自动调整列数，完美适配手机与电脑。

现代化 UI 设计：使用 Tailwind CSS 打造，拥有平滑的悬浮动画和毛玻璃效果。

支付闭环体验：

点击卡片查看商品详情。

动态生成模拟支付二维码。

完整的支付成功状态转换与下载流程模拟。

高性能：基于 Next.js App Router 架构，首屏加载极快。

🛠️ 技术栈

框架: Next.js 14 (App Router)

样式: Tailwind CSS

图标: Lucide React

动画: Tailwind Transitions & Animations

🚀 快速开始

1. 克隆项目

git clone [https://github.com/JohnnyW081/waterfall-app-store.git](https://github.com/JohnnyW081/waterfall-app-store.git)
cd waterfall-app-store


2. 安装依赖

npm install


3. 启动开发服务器

npm run dev


访问 http://localhost:3000 查看效果。

📦 目录结构

├── app/
│   ├── page.tsx        # 主入口 (包含瀑布流逻辑)
│   ├── globals.css     # 全局样式
│   └── layout.tsx      # 入口布局
├── public/             # 静态资源
└── package.json        # 依赖配置


📄 开源协议

本项目采用 MIT License 开源协议。
