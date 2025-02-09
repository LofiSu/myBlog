---
updateTime: "2025-2-07 10:30"
desc: "💡最好的Cursor替代方案！三步教你把DeepSeek蒸馏模型接入本地Vscode打造免费 AI 编程神器！安全可靠本地部署"
tags: "AI"
outline: deep
---

# DeepSeek R1 本地部署指南

## 为什么选择本地部署？

### 1. 免费及低成本运营
与需要每月订阅费用的服务（如 Cursor AI）不同，DeepSeek R1 可以在本地运行，无需额外费用，能够享受强大的 AI 辅助功能。

### 2. 数据安全
所有计算都在本地环境中进行，代码和数据不会被传输到外部服务器，确保数据隐私和安全。

### 3. 快速响应
DeepSeek R1 直接在用户硬件上运行，避免了网络延迟，因此响应速度更快，相较于 API 调用方式，可以期待更低的延迟。

## 安装 Ollama

Ollama 是一款可帮助在本地运行大型语言模型（如 DeepSeek R1）的工具。

### 安装步骤：
- 从 Ollama 官方网站下载并安装 Ollama。

[ollama](./pic/ollama.png)

### 下载 DeepSeek R1 模型

根据你的 PC 配置选择合适的模型进行下载。以下是不同版本的模型命令：
```bash
ollama run deepseek-r1:1.5b
ollama run deepseek-r1:7b
ollama run deepseek-r1:8b
ollama run deepseek-r1:14b
ollama run deepseek-r1:32b
```

### 启动模型
下载完成后，模型会自动在本地启动，并可以通过 `http://localhost:11434` 进行访问。

[r1](./pic/r1.png)

## 配置 VS Code 和 Cline

### 安装 VS Code 扩展

1. 打开 VS Code 扩展市场，搜索并安装 **Cline**。
2. 在 Cline 中配置 Ollama 连接。

### 设置 Cline 连接本地 DeepSeek R1

1. 打开 VS Code 中的 **Cline 设置**。
2. 在 **API Provider** 列表中选择 **Ollama**。
3. 在 **Base URL** 字段中输入 `http://localhost:11434`，并选择正在运行的 DeepSeek R1 模型（例如：`deepseek-r1:32b`）。

成功连接后，Cline 会自动显示可用模型列表。

[Cline 设置](./pic/clint.png)

如果出现 `MCP hub not available` 错误，尝试重启 VS Code 以解决此问题。[参考 Github Issue](https://github.com/cline/cline/issues/969)

## 测试连接

设置完成后，可以使用 Cline 发送 **prompt** 进行测试响应。若输入后 CPU 高负载且响应特别慢或无响应，可能是硬件不足以支持当前模型运行，建议尝试使用较小版本的模型。

## API 连接方式

1. 获取 **DeepSeek API 密钥**（从 DeepSeek 官方网站）。
2. 在 VS Code 中打开 Cline 设置，选择 **DeepSeek** 作为 API 提供商，输入 API 密钥，并选择模型（例如：`deepseek-reasoner`）。

## 支持自定义 Prompt 打造私人助理

通过设置自定义 **Prompt**，你可以打造属于自己的私人助理，帮助完成特定任务。

[私人助理](./pic/7.png)

---

通过本地部署，DeepSeek R1 不仅提高了计算效率，还为开发者提供了更多的灵活性与定制化选项，适合用于各种实际应用场景。