<div align="center">

# Cognitwin

[![Python Version](https://img.shields.io/badge/python-3.11%20~%20%3C3.14-blue.svg?logo=python&label=Python)](https://www.python.org/downloads/)
[![License](https://img.shields.io/badge/license-Apache%202.0-red.svg?logo=apache&label=License)](LICENSE)
[![Code Style](https://img.shields.io/badge/code%20style-black-black.svg?logo=python&label=CodeStyle)](https://github.com/psf/black)

<p align="center"><b>Your personal AI OS. Remembers. Browses. Automates. Learns.</b></p>

</div>

Cognitwin is a **personal AI operating system** that runs entirely in your own environment. It connects to multiple channels (DingTalk, Lark, Discord, Telegram, iMessage, WeChat, and more), executes browser automation, manages long-term memory, and runs scheduled tasks — all on your machine, with your data.

---

## What Cognitwin Can Do

| Capability | Description |
|---|---|
| **Never Forgets** | Three-layer memory — live working context, full verbatim history, and a self-evolving personal knowledge base (ReMe). Conversations continuously become readable, editable, searchable, and linked Markdown memory. |
| **Browses the Web** | Full Playwright-powered browser automation. Cognitwin can log into sites, fill forms, scrape data, and hand off to you at payment/login steps. |
| **Runs Locally or Cloud** | Works with Ollama, LM Studio, Google Gemini, OpenAI, Anthropic, DeepSeek, and 14+ providers. No API key required if you use local models. |
| **Multi-Agent** | Spawn independent agents with their own memory and skills. Sub-agents at runtime. Agent Communication Protocol (ACP) for cross-system orchestration. |
| **Extensible** | Skills for scheduling, documents, browser, news, and more. Plugin architecture with a marketplace. MCP integration for external tools. |
| **Secure by Design** | Kernel-level Sandbox, Tool Guard, File Guard, and Skill Scanner. Dangerous commands are blocked before they run. |
| **Reachable Anywhere** | DingTalk, Lark, WeChat, Discord, Telegram, iMessage, QQ — one instance, all channels. Console and Terminal UI for direct access. |
| **Your Data, Your Machine** | Deploy locally — data stays on your machine. No third-party hosting, no data upload. |

---

## Quick Start

### Option 1: Pip Install

Requires Python >= 3.11, < 3.14.

```bash
pip install cognitwin
cognitwin init --defaults
cognitwin app
```

Then open the Console in your browser at **http://127.0.0.1:8088/** to configure your model.

---

### Option 2: One-Line Script Install

No Python setup required.

**macOS / Linux:**
```bash
curl -fsSL https://cognitwin.agentscope.io/install.sh | bash
```

**Windows (PowerShell):**
```powershell
irm https://cognitwin.agentscope.io/install.ps1 | iex
```

**Windows (CMD):**
```cmd
curl -fsSL https://cognitwin.agentscope.io/install.bat -o install.bat && install.bat
```

Once installed, open a new terminal and run:
```bash
cognitwin init --defaults
cognitwin app
```

---

### Option 3: Docker

```bash
docker pull agentscope/cognitwin:latest
docker run -p 127.0.0.1:8088:8088 \
  -v cognitwin-data:/app/working \
  -v cognitwin-secrets:/app/working.secret \
  agentscope/cognitwin:latest
```

Then open **http://127.0.0.1:8088/**.

---

### Option 4: Install From Source (Development)

```bash
git clone https://github.com/agentscope-ai/Cognitwin.git
cd Cognitwin

# Build the frontend
cd console && npm ci && npm run build
cd ..

# Install the Python package
pip install -e .

# Initialize and run
cognitwin init --defaults
cognitwin app
```

For development with tests and formatting tools:
```bash
pip install -e ".[dev,test,full]"
```

> **After a `git pull`:** rebuild the frontend, reinstall the package (`pip install -e .`), restart `cognitwin app`, and clear your browser cache with `Ctrl+Shift+R`.

---

## Running the Development Server

To run the frontend and backend simultaneously in development mode:

**Terminal 1 — Backend:**
```powershell
# From the root of the project
qwenpaw app
```

**Terminal 2 — Frontend (Vite dev server):**
```powershell
cd console
npm run dev
```

The app will be available at **http://localhost:5173** (dev) or **http://127.0.0.1:8088** (production build).

---

## Configuring an API Key

If you use a cloud LLM provider (Google Gemini, OpenAI, Anthropic, DeepSeek, etc.), you must configure an API key before chatting.

1. Open the Console at **http://127.0.0.1:8088/**
2. Go to **Settings → Models**
3. Choose a provider, enter your **API Key**, and enable the model

> **Using local models?** If you use Ollama or LM Studio, no API key is required.

---

## Local Models (No API Key Required)

Cognitwin runs LLMs entirely on your machine:

| Backend | Best For | Setup |
|---|---|---|
| **Ollama** | Cross-platform | Install Ollama, set context length ≥ 32k |
| **LM Studio** | Cross-platform | Install LM Studio, enable Local Server |
| **Cognitwin Local** (llama.cpp) | Cross-platform | Built-in; click "Download" in the web UI |

---

## Security

Cognitwin includes four core security layers:

- **Sandbox** — Kernel-level execution isolation (Seatbelt on macOS, Bubblewrap/Landlock on Linux, AppContainer on Windows).
- **Tool Guard** — YAML rule engine that inspects every tool call before execution, blocking command injection, path traversal, and obfuscated attacks.
- **File Guard** — Blocks agent access to sensitive files and directories.
- **Skill Scanner** — Pre-activation scanning with block/warn/off modes and whitelist support.

---

## Architecture Overview

```
Cognitwin
├── src/                  # Python backend (AgentScope-based)
│   └── qwenpaw/
│       ├── agents/       # ReAct agent, memory, context
│       ├── app/          # FastAPI server, REST API
│       ├── browser/      # Playwright browser SDK
│       ├── providers/    # LLM provider wrappers
│       ├── security/     # Tool Guard, File Guard, Skill Scanner
│       └── cli/          # CLI entrypoints
├── console/              # React + Vite frontend
│   └── src/
│       ├── pages/        # Chat, Memory, Browser, Settings
│       ├── layouts/      # Sidebar, Header, routing
│       └── api/          # API client modules
├── plugins/              # Plugin system
├── scripts/              # Build and deployment scripts
└── tests/                # Unit, contract, and integration tests
```

---

## Project Commands Reference

### Backend
```bash
qwenpaw app                   # Start backend server (port 8088)
qwenpaw init --defaults       # Initialize with defaults
qwenpaw init                  # Interactive initialization
cognitwin app                 # (if installed via pip)
```

### Frontend
```bash
cd console
npm run dev                   # Start Vite dev server (port 5173)
npm run build                 # Build for production
npm run build:prod            # Production build (optimized)
npm run test                  # Run frontend tests
npm run lint                  # Lint frontend code
```

### Testing (Backend)
```bash
python -m pytest tests/         # Run all tests
python -m pytest tests/unit/    # Unit tests only
python -m pytest tests/integration/  # Integration tests
```

---

## Roadmap

| Area | Item | Status |
|---|---|---|
| **Models** | Multi-model switching | In Progress |
| **Browser** | Chrome extension support | In Progress |
| **Memory** | Personal knowledge base enhancements | In Progress |
| **Applications** | Cognitwin Creator | In Progress |
| | Cognitwin Insight | In Progress |
| **Multi-agent** | Claude Code compatibility | Planned |
| | Group chat | Planned |
| | Subagent visualization | Planned |
| **Community** | More channels, models, skills, MCPs | Seeking Contributors |

---

## Contributing

Cognitwin evolves through open collaboration. Read [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

We particularly welcome:
- **New channels** — DingTalk, Lark, Telegram, etc.
- **New model providers** — Any OpenAI-compatible API.
- **New skills** — Extend what Cognitwin can do.
- **Bug fixes & UX improvements** — Always welcome.

---

## License

Cognitwin is released under the [Apache License 2.0](LICENSE).

---

## Built With

- [AgentScope](https://github.com/agentscope-ai/agentscope) — Agent framework
- [ReMe](https://github.com/agentscope-ai/ReMe) — Self-evolving memory
- [Playwright](https://playwright.dev/) — Browser automation
- [React](https://react.dev/) + [Ant Design](https://ant.design/) — Frontend UI
- [FastAPI](https://fastapi.tiangolo.com/) — Backend API server
