---
updateTime: "2024-12-07 10:30"
desc: "使用 LangFlow 与 Ollama 实现本地 RAG 知识库"
tags: "AI"
outline: deep
---

# 使用 LangFlow 与 Ollama 实现本地 RAG 知识库

## **LangFlow 简介**

**LangFlow** 是一个开源的可视化框架，专为构建多智能体和 RAG 应用设计。它提供了拖拽式的操作界面，让用户能够快速创建复杂的 AI 工作流，而无需编写大量代码。

### **LangFlow 的主要特点**

1. **直观的可视化界面**  
    LangFlow 提供简单易用的拖拽式 UI，用户可轻松设计工作流，将各种模块（如模型、提示词、数据源等）连接起来。
    
2. **强大的集成能力**  
    支持主流工具与服务，如 OpenAI、Hugging Face、Pinecone、LangChain 和 Google Cloud 等。
    
3. **多种安装选项**  
    可选择在本地运行、Google Cloud 或 VirtualBox 上安装。
    
4. **灵活的组件化架构**  
    采用模块化设计，支持用户根据需求组合各种功能。
    
5. **异步任务支持**  
    使用 Celery 工作队列和 AnyIO，轻松处理长时间任务。
    

---

## **Ollama 简介**

**Ollama** 是一种轻量级工具，专注于本地运行大语言模型，提供高效、私密的 AI 推理能力。与 LangFlow 集成后，Ollama 能作为本地模型提供服务，与外部向量数据库共同组成一个完整的 RAG 知识库架构。

---

## **LangFlow 与 Ollama 的组合优势**

1. **高效的本地化运行**  
    Ollama 提供本地 LLM 支持，配合 LangFlow 实现无缝对接，减少对云端依赖，保护隐私。
    
2. **模块化与可扩展性**  
    使用 LangFlow 的组件化界面，可以轻松连接 Ollama 模型和向量数据库，如 Pinecone 或 Milvus。
    
3. **低代码开发**  
    无需复杂的编程，拖拽式操作即可完成工作流搭建。
    
4. **适合多场景应用**  
    无论是文档问答、企业知识库，还是产品推荐系统，都可以快速原型开发。
    

---

## **快速搭建本地 RAG 知识库**

以下是通过 LangFlow 和 Ollama 搭建本地 RAG 知识库的具体步骤。

### **1. 安装 LangFlow**

LangFlow 提供两种安装方式，用户可根据需要选择：

#### 方法一：通过 pip 安装

```bash
python -m pip install langflow -U
python -m langflow run
```

#### 方法二：通过源码安装

```bash
git clone https://github.com/langflow-ai/langflow.git
cd langflow
make install_frontend && make build_frontend && make install_backend
poetry run python -m langflow run
```

完成安装后，访问 `http://127.0.0.1:7861`，即可进入 LangFlow 的可视化界面。

---

### **2. 设置工作流**

#### **创建新的工作流**

1. 在 LangFlow 可视化界面创建一个新工作流。
2. 添加 Ollama 模型组件，配置模型参数（如 GPT-3.5 或 GPT-4）。
3. 添加向量数据库组件（如 Pinecone 或 FAISS），用于存储和检索外部知识。
4. 将用户输入组件连接到 Ollama 模型，再通过向量数据库增强模型的上下文。

#### **示例代码**

可以通过以下 API 调用工作流：

```bash
curl -X POST \
  'http://127.0.0.1:7861/api/v1/run/<flow_id>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <your_api_key>' \
  -d '{"inputs": {"text": "hello"}, "tweaks": {}}'
```

---

### **3. 与 Ollama 集成**

配置 Ollama 模型时，需要确保它已经本地运行。以下是通过 Python 调用 LangFlow 工作流并与 Ollama 模型交互的代码示例：

```python
import requests

BASE_API_URL = "http://127.0.0.1:7861/api/v1/run"
FLOW_ID = "<your_flow_id>"
API_KEY = "<your_api_key>"

def run_flow(inputs: dict, flow_id: str, api_key: str):
    api_url = f"{BASE_API_URL}/{flow_id}"
    headers = {
        "Content-Type": "application/json",
        "x-api-key": api_key
    }
    response = requests.post(api_url, json={"inputs": inputs}, headers=headers)
    return response.json()

# 测试调用
inputs = {"text": "What is RAG?"}
response = run_flow(inputs, FLOW_ID, API_KEY)
print(response)
```

---

### **4. 优化与调试**

LangFlow 支持工作流的动态调整，可以通过以下方法优化模型性能：

- **调整 Prompt**：通过 LangFlow 的 Prompt 管理工具，优化 Ollama 的输入提示，提高生成结果的相关性。
- **集成异步任务**：在复杂任务中使用 Celery，确保系统性能稳定。

