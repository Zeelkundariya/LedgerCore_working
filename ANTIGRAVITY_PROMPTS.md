# 🚀 Antigravity "God-Tier" Execution Prompts

This document contains hyper-detailed, extremely prescriptive prompts designed specifically for the **Antigravity AI Assistant**. Each team member should copy their respective prompt and paste it into Antigravity to instantly kickstart their assigned work. 

These prompts leave absolutely no room for ambiguity. They enforce strict architectures, premium aesthetics, exact animation physics, and production-ready code generation.

---

## 🎨 1. Rani (Frontend Lead / UI Engineer)
**Role:** Next.js Setup, Employee Dashboard, Voice UI, Zustand State Management

**Copy and Paste this into Antigravity:**
> "You are acting as Rani, the Frontend Lead for LedgerCore (a modern FinTech platform). Your objective is to build the core Next.js architecture and the Employee Expense Dashboard.
> 
> **TECH STACK:** Next.js 14 (App Router), Tailwind CSS, shadcn/ui, Zustand, Framer Motion, Lucide Icons.
> 
> **STRICT REQUIREMENTS:**
> 1. **Directory Structure:** Set up an enterprise-grade structure: `app/(dashboard)`, `components/ui`, `components/shared`, `store/`, `lib/utils.ts`.
> 2. **God-Tier Aesthetics:** Do NOT use standard/boring designs. Use a deeply premium dark mode theme (`bg-slate-950`). Implement heavy glassmorphism for cards (`bg-white/5 backdrop-blur-xl border border-white/10`). Use vibrant, glowing neon accents (e.g., Electric Indigo, Emerald Green) for primary actions. Use the 'Inter' or 'Outfit' font family.
> 3. **Micro-Animations (Framer Motion):** Every interaction must be animated using spring physics (e.g., `type: 'spring', stiffness: 300, damping: 20`). Implement 'magnetic' buttons. Use `layoutId` for smooth layout transitions. Modals must scale up from `0.95` opacity `0` with a slight bounce. 
> 4. **Zustand Store:** Create `store/useExpenseStore.ts`. It must handle `expenses` array, `isRecording` boolean, `isUploading` boolean, and user session data. Include actions for `addExpense` and `updateStatus`.
> 5. **Core Components to Build:**
>    - **Expense Submission Form:** A beautifully animated multi-step form with drag-and-drop receipt upload. Show a shimmering skeleton loader during OCR processing.
>    - **Voice Recording UI:** A futuristic, floating microphone button. When `isRecording` is true, display pulsating, multi-layered CSS glowing rings around the button mimicking audio waveforms.
> 
> Please output the exact terminal commands to set up the dependencies, followed by the fully styled, production-ready code for the layout, the Zustand store, and the dashboard page."

---

## 📊 2. Anshu (Frontend Developer / Data Visualization)
**Role:** Manager/Admin Dashboards, Executive Health Dashboard, Natural Language Search UI

**Copy and Paste this into Antigravity:**
> "You are acting as Anshu, the Frontend Data & Dashboard Developer for LedgerCore. Your objective is to build complex, animated data-driven views for Managers and Admins.
> 
> **TECH STACK:** Next.js (App Router), Tailwind CSS, Framer Motion, Recharts (for charts), `cmdk` (for search).
> 
> **STRICT REQUIREMENTS:**
> 1. **Manager Approval Dashboard:** Build a sticky-header data table. Rows must have a staggered Framer Motion entrance (`staggerChildren: 0.1`). Implement color-coded pill badges for statuses: `bg-emerald-500/20 text-emerald-400` for Approved, `bg-rose-500/20 text-rose-400` for Flagged/Fraud. Include smooth, expanding rows to view OCR receipt details.
> 2. **Executive Health Dashboard:** Build an interactive grid (`grid-cols-3` or `grid-cols-4`). Create ultra-premium Recharts components:
>    - A gradient-filled Area Chart for 'Monthly Spend'. Provide custom, glassmorphic tooltips.
>    - A Donut Chart for 'Expenses by Category' with custom animated path drawing on mount.
> 3. **Natural Language Search (AI Copilot):** Implement a Cmd+K (Mac) / Ctrl+K (Windows) global shortcut that opens a glassmorphic command palette (using `cmdk`). The input should say 'Ask the AI Copilot (e.g., Show pending travel claims > ₹5000)'. Results must filter smoothly with layout animations.
> 4. **Aesthetics:** Maintain the ultra-premium dark theme. Use subtle hover glows (`hover:shadow-[0_0_15px_rgba(79,70,229,0.5)]`) on interactive dashboard widgets.
> 
> Please provide the terminal commands for Recharts and cmdk, and generate the fully functional, flawlessly animated React components for the Table, Charts, and Search Palette."

---

## ⚙️ 3. Saptak (Backend Lead / System Architect)
**Role:** FastAPI, PostgreSQL, RBAC, Payments, JSON Data Vault

**Copy and Paste this into Antigravity:**
> "You are acting as Saptak, the Backend Lead and System Architect for LedgerCore. Your objective is to build a highly secure, heavily-typed backend infrastructure.
> 
> **TECH STACK:** Python 3.11+, FastAPI, PostgreSQL, SQLAlchemy 2.0, Pydantic V2, PyJWT, Stripe SDK, APScheduler.
> 
> **STRICT REQUIREMENTS:**
> 1. **Enterprise Architecture:** Use a modular structure: `app/api/endpoints/`, `app/core/config.py`, `app/models/` (SQLAlchemy), `app/schemas/` (Pydantic), `app/services/`. Use Dependency Injection heavily (e.g., `Depends(get_db)`).
> 2. **Database Schema:** Create SQLAlchemy models for `User` (id, email, hashed_password, role Enum [EMPLOYEE, MANAGER, ADMIN]), and `Expense` (id, amount, currency, merchant, status, ai_risk_score, user_id).
> 3. **Security (RBAC):** Implement OAuth2 with Password Flow (JWT). Write a robust dependency `def get_current_active_user` and role checkers like `def require_admin(user: User = Depends(get_current_active_user))`.
> 4. **Payment Webhooks:** Create a `/payments/webhook` endpoint for Stripe. Implement signature verification and idempotency keys to ensure reimbursements are never processed twice.
> 5. **JSON Data Vault (Auto-Backup):** Use `APScheduler` to run a background cron job every 24 hours. The job must query the entire PostgreSQL database, serialize it into a structured JSON file, and securely save it to a local `/vault/backups/` directory. Create an Admin-only endpoint to trigger a manual backup.
> 
> Please output the requirements.txt, the core FastAPI setup (`main.py`), the database models, the auth utilities, and the background JSON vault logic. Code must strictly adhere to PEP8 and type hinting."

---

## 🧠 4. Zeel (AI & Machine Learning Engineer)
**Role:** OCR, Local LLMs (Ollama), Risk Scoring, Voice-to-Text (Whisper)

**Copy and Paste this into Antigravity:**
> "You are acting as Zeel, the AI & ML Engineer for LedgerCore. Your objective is to build the offline, 100% free AI 'brain' of the platform and expose them as modular Python services.
> 
> **TECH STACK:** Python, FastAPI (for ML inference), `pytesseract`, `ollama` (or `langchain`), `scikit-learn`, `openai-whisper`, `pandas`.
> 
> **STRICT REQUIREMENTS:**
> 1. **Service Architecture:** Isolate the ML logic into `services/ocr.py`, `services/llm_copilot.py`, `services/fraud.py`, and `services/voice.py`.
> 2. **AI Receipt Scanner:** In `ocr.py`, write a function that takes an image byte array, runs `pytesseract.image_to_string()`, and uses advanced Regex to extract `Total Amount`, `Date`, and `Merchant Name`. Return a clean JSON dictionary.
> 3. **Expense Risk Scoring:** In `fraud.py`, write a function that uses Scikit-Learn's `IsolationForest` (contamination=0.01). It should take a Pandas DataFrame of historical expenses and a new expense, returning an `anomaly_score` (0 to 100) and a boolean `is_flagged`.
> 4. **AI Approval Copilot (Ollama):** In `llm_copilot.py`, write a function connecting to a local Ollama instance (e.g., Llama 3). Inject a strict system prompt: 'You are a strict financial auditor API. Respond ONLY in JSON format extracting query parameters from the user's natural language search.'
> 5. **Voice Expense Processing:** In `voice.py`, use `whisper.load_model('base')`. Write an async function that accepts an audio file, transcribes it offline, and passes the text to the Ollama LLM to extract the expense amount and category.
> 
> Please output the Python code for these 4 distinct ML services. Ensure the code is optimized, handles exceptions (like corrupted images/audio gracefully), and is ready to be imported into the main FastAPI application."
