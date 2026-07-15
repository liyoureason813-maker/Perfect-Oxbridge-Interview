# Perfect Oxbridge Interview

一款面向牛津、剑桥申请者的双语互动面试训练网站。学生可以按学科随机练习历年题与原创模拟题，通过文字、语音和画板展示思路，并获得递进提示、参考答案与回答诊断。

An interactive bilingual interview-preparation website for Oxford and Cambridge applicants. Students can practise past-style and original questions by subject, explain their reasoning by text, voice, or sketch, and receive progressive hints, model answers, and structured feedback.

## 在线体验 / Live Demo

- GitHub Pages：`https://liyoureason813-maker.github.io/perfect-oxbridge-interview/`
- ChatGPT Sites：[Perfect Oxbridge Interview](https://perfect-oxbridge-interview.liyoureason813.chatgpt.site)

## 主要功能 / Features

- 109 道双语题目，覆盖 12 个学科，支持历年题风格与原创模拟题随机抽取
- 全站中英文切换，包括题目、提示、参考答案、诊断与界面文案
- 每题最多 3 次递进提示；提示用尽后可查看更完整的示范回答与思路解析
- 支持语音转文字输入，并可选择中文或英文识别
- 内置画板，可用于绘制函数、供需图、受力图、示意图等
- 部分参考解析包含可视化图示，帮助理解图像与论证之间的联系
- 面试回答诊断，从结构、推理、知识运用、表达和改进方向等维度给出反馈
- 自动在浏览器本地保存练习进度与历史记录

## Tech Stack

- React + TypeScript
- Vinext / Vite
- Web Speech API（语音识别）
- Canvas + Pointer Events（画板）
- localStorage（本地练习记录）

## 本地运行 / Local Development

建议使用 Node.js 22.13.0 或更高版本。

```bash
npm ci
npm run dev
```

生产构建：

```bash
npm run build
```

GitHub Pages 静态构建：

```bash
npm run build:pages
```

## GitHub Pages 发布

仓库已经包含构建完成的 `docs` 网站目录。将源码提交到 `main` 分支后，在 GitHub 仓库中进入 **Settings → Pages**，把 **Source** 设置为 **Deploy from a branch**，分支选择 **main**，目录选择 **/docs**，然后点击 **Save**。网站会发布到：

`https://liyoureason813-maker.github.io/perfect-oxbridge-interview/`

## 浏览器兼容性 / Browser Compatibility

语音输入依赖浏览器的 Web Speech API，并需要用户授予麦克风权限。Chrome、Edge 等 Chromium 浏览器通常支持较好；Safari 和 Firefox 的支持情况可能因系统与版本而异。若浏览器不支持，文字输入与画板功能仍可正常使用。

Voice input relies on the browser Web Speech API and requires microphone permission. Support is generally strongest in Chromium-based browsers. Text input and the sketch pad remain available when speech recognition is unsupported.

## 数据与内容说明 / Data & Content Notes

- 当前版本不需要账户，回答与练习历史保存在用户自己的浏览器中。
- 用于整理题库的原始 PDF、DOCX 等资料不包含在本仓库中。
- “历年题”标签表示依据公开或用户提供资料整理的题目，并不代表大学官方授权或逐字复刻。
- 本项目与牛津大学、剑桥大学不存在官方隶属或合作关系。

## 项目状态 / Project Status

这是一个可交互的前端演示版本。若用于正式商业产品，建议后续接入服务端 AI 诊断、账户系统、云端数据存储、内容审核与更完整的无障碍支持。
