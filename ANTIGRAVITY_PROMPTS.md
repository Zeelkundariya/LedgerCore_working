# 🚀 Antigravity "God-Tier" Execution Prompts

This document contains highly detailed, context-rich prompts designed specifically for the **Antigravity AI Assistant**. Each team member can copy their respective prompt and paste it into Antigravity to instantly kickstart their assigned work. 

These prompts are engineered to instruct the AI to produce **perfect, professional, highly aesthetic, and heavily animated** results, exactly as envisioned for LedgerCore.

---

## 🎨 1. Rani (Frontend Lead / UI Engineer)
**Role:** Next.js Setup, Employee Dashboard, Voice UI, Zustand State Management

**Prompt to paste into Antigravity:**
> "You are acting as Rani, the Frontend Lead for LedgerCore. We are building a comprehensive FinTech platform. Your task is to initialize the frontend architecture and build the core **Employee Dashboard**. 
> 
> **Tech Stack:** Next.js (App Router), Tailwind CSS, shadcn/ui, Zustand, Framer Motion.
> 
> **Requirements:**
> 1. **Setup:** Initialize a Next.js project with Tailwind and shadcn/ui. Set up a robust Zustand store to handle active expense claims and user sessions.
> 2. **Design Language (GOD-TIER AESTHETICS):** The UI must be breathtakingly beautiful, professional, and ultra-modern. Use curated premium color palettes (deep sleek dark mode by default), subtle glassmorphism effects, smooth gradients, and modern typography (e.g., Inter or Outfit). Do NOT use generic colors or basic layouts.
> 3. **Micro-Animations:** Use Framer Motion to add flawless, buttery-smooth micro-animations to every interactive element (hover states, page transitions, loading skeletons, modal popups). The UI must feel alive and highly responsive.
> 4. **Features to Build:** Create the primary Employee Dashboard layout, including an 'Expense Submission' form with drag-and-drop receipt upload, and a highly aesthetic 'Voice Recording' UI for hands-free logging with pulsing audio visualizers.
> 
> Please generate the full directory structure, implement the foundational layout, and provide the fully styled components. Make it look like a multi-million dollar SaaS product."

---

## 📊 2. Anshu (Frontend Developer / Data Visualization)
**Role:** Manager/Admin Dashboards, Executive Health Dashboard, Natural Language Search UI

**Prompt to paste into Antigravity:**
> "You are acting as Anshu, the Frontend Data & Dashboard Developer for LedgerCore. Your task is to build the complex data-driven views for Managers and Admins.
> 
> **Tech Stack:** Next.js (App Router), Tailwind CSS, Framer Motion, Recharts (or similar charting library).
> 
> **Requirements:**
> 1. **Manager & Admin Dashboards:** Build a stunning, intuitive interface for reviewing expense claims. Include real-time status tracking with beautifully color-coded badges (e.g., Pending, Approved, Flagged). 
> 2. **Executive Health Dashboard:** This is the centerpiece. Build an interactive, ultra-premium data dashboard showing organizational spending. Use beautiful, animated charts (line graphs, donut charts) that elegantly transition when data changes. 
> 3. **Natural Language Search UI:** Implement a sleek, AI-powered search bar component (like a spotlight search) where users can type complex queries (e.g., 'Show pending travel claims > ₹5000'). Include animated loading states and slick dropdown results.
> 4. **Aesthetics & Animations (GOD-TIER):** The design must match a state-of-the-art enterprise SaaS. Use staggered entrance animations for list items, smooth layout transitions, and rich hover effects. Everything must feel cohesive, premium, and lightning-fast.
> 
> Please write the code for these dashboards and components, ensuring they are visually spectacular and ready to consume real API data."

---

## ⚙️ 3. Saptak (Backend Lead / System Architect)
**Role:** FastAPI, PostgreSQL, RBAC, Payments, JSON Data Vault

**Prompt to paste into Antigravity:**
> "You are acting as Saptak, the Backend Lead and System Architect for LedgerCore. Your task is to build a highly secure, robust, and scalable backend infrastructure.
> 
> **Tech Stack:** Python, FastAPI, PostgreSQL, SQLAlchemy (or SQLModel), Stripe/Razorpay SDKs.
> 
> **Requirements:**
> 1. **Architecture & Database:** Initialize a production-ready FastAPI project. Design a strict PostgreSQL database schema using SQLAlchemy to handle multi-tier relationships (Employee -> Manager -> Admin) and secure financial transaction records.
> 2. **Authentication & RBAC:** Implement highly secure JWT-based authentication and Role-Based Access Control (RBAC). Ensure that endpoints are strictly protected based on user roles.
> 3. **Payment Gateway:** Create the foundational endpoints and webhooks for automated, multi-currency payouts using Stripe or Razorpay.
> 4. **Secure Data Vault:** Implement a background utility to auto-save transaction data into a secure local vault, with a clean API endpoint to trigger a full JSON backup/restore.
> 5. **Code Quality:** Use strict Pydantic models for request/response validation, comprehensive error handling, and modular routing. Provide the foundational server code and database models."

---

## 🧠 4. Zeel (AI & Machine Learning Engineer)
**Role:** OCR, Local LLMs (Ollama), Risk Scoring, Voice-to-Text (Whisper)

**Prompt to paste into Antigravity:**
> "You are acting as Zeel, the AI & Machine Learning Engineer for LedgerCore. Your task is to build the 'brain' of the platform using 100% free and open-source AI tools.
> 
> **Tech Stack:** Python, FastAPI, Tesseract OCR/PaddleOCR, Ollama (Local LLMs), Scikit-Learn/XGBoost, OpenAI Whisper (local).
> 
> **Requirements:**
> 1. **AI Receipt Scanner Pipeline:** Build a robust Python service that takes an uploaded image, processes it using Tesseract or PaddleOCR, and uses regex/heuristics to auto-fill merchant names, amounts, and dates.
> 2. **AI Approval Copilot & Search:** Write the integration code to connect the backend to a locally running LLM (via Ollama API). Create prompts and functions to parse unstructured receipt data and translate Natural Language queries into SQL/JSON filters.
> 3. **Expense Risk Scoring:** Create a foundational machine learning pipeline (using Scikit-Learn) that trains an Isolation Forest or similar anomaly detection model on sample expense data to flag fraudulent or unusual claims.
> 4. **Voice Processing:** Integrate the open-source Python library for OpenAI Whisper to create an endpoint that accepts an audio file and returns highly accurate transcribed text.
> 
> Please write the clean, modular Python microservices and API endpoints necessary to expose these AI features to the main backend."
