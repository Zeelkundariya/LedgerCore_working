# LedgerCore

## 📖 Overview
**LedgerCore** is a comprehensive FinTech platform designed to streamline corporate expense tracking, prevent fraud using AI, and automate payments and reimbursements through a secure, role-based workflow. Built for personal finance management, corporate finance, and financial inclusion, LedgerCore empowers Employees, Managers, and Admins with real-time visibility, automated receipt verification, and instant payouts.

## ⚠️ Problem Statement
Organizations often struggle with manual, error-prone expense tracking and reimbursement processes. 
- **Employees** waste time on manual receipt entry.
- **Finance teams** face delayed approvals and fraud risks from duplicate or inflated claims.
- **Cross-border reimbursements** are slowed by currency conversion hassles.

This leads to poor financial transparency and low trust in corporate expense systems.

## ✨ Key Features & Benefits
- **📊 Smart Expense Tracking & Budgeting**: Category-wise expense logging with interactive dashboards and automated budget-limit alerts for smarter personal finance.
- **🤖 AI-Powered Fraud Prevention**: OCR-based receipt verification and anomaly detection to flag duplicate or unusual expenses.
- **💸 Automated Payments**: Instant simulated reimbursements with multi-currency support for global transactions, advancing financial inclusion.
- **👥 Role-Based Approval Workflow**: Multi-tier approval (Employee → Manager → Admin) with real-time, color-coded status tracking.
- **🔐 Admin & User Management**: Secure directory management linking employees to managers with strict access control.
- **💾 Secure Data Persistence**: Auto-saving local vault with one-click JSON backup/restore and admin reset controls.

### 🌟 Advanced AI Features
- **📸 AI Receipt Scanner**: OCR + auto-fill for seamless data extraction from physical receipts.
- **🛡️ AI Fraud Detection**: Advanced algorithms to proactively identify and block suspicious claims.
- **📊 Expense Risk Score**: Automated risk assessment scoring for each expense submission.
- **🧠 AI Approval Copilot**: Intelligent assistant for managers to streamline the review process.
- **🧾 AI Audit Report Generator**: Instant, comprehensive audit trails and compliance reports.
- **🎙️ Voice Expense Submission**: Hands-free expense logging using natural language voice commands.
- **📈 Executive Health Dashboard**: High-level visual insights into organizational spending health.
- **🔍 Natural Language Search**: Query data naturally (e.g., *"Show pending travel claims > ₹5000"*).

## 🔄 Architecture & Workflow
LedgerCore operates on a seamless, secure, and multi-tier workflow:

1. **Submit Expense**: Employee submits an expense along with a receipt.
2. **OCR Verify**: The system extracts and verifies receipt details using OCR technology.
3. **Fraud Check**: AI anomaly detection analyzes the claim and flags any irregular or duplicate expenses.
4. **Manager Review**: The Manager reviews the claim and approves it (`MANAGER_APPROVED`).
5. **Admin Approval**: The Admin provides the final review and approval (`APPROVED`).
6. **Payment**: A payment gateway triggers the reimbursement to the employee's account, applying multi-currency conversions where necessary.
7. **Data Vault**: All transaction data is auto-saved to a secure local vault with options for backup and export.

## 🛠️ Technology Stack

We chose a completely free, open-source, and highly scalable tech stack to power LedgerCore:

### 1. Frontend (User Interface)
*   **Next.js (React)**: Chosen for its incredible performance, Server-Side Rendering (SSR), and seamless routing. It is the industry standard for building robust enterprise web applications.
*   **Tailwind CSS & shadcn/ui**: Allows us to build beautiful, highly customized, and accessible dashboards (like the Executive Health Dashboard) quickly.
*   **Zustand / Redux Toolkit**: Essential for managing complex application states like user roles, active claims, and multi-currency data.

### 2. Backend & Core API
*   **FastAPI (Python)**: Python is the undisputed king of AI and Data Science ecosystems. FastAPI is a modern, high-performance web framework for building APIs with Python, perfectly bridging the web app with complex AI models.

### 3. AI & Machine Learning (100% Free & Open-Source)
*   **Tesseract OCR / PaddleOCR**: Powerful open-source engines that extract text and numbers from physical receipts completely for free.
*   **Local LLMs (Ollama, Llama 3)**: Running open-source Large Language Models locally guarantees total data privacy and eliminates API costs. They act as the AI Approval Copilot and parse unstructured data.
*   **Scikit-Learn / XGBoost**: Used to train custom anomaly detection models on past financial data to spot outliers and assign Expense Risk Scores without any third-party dependencies.
*   **OpenAI Whisper (Open-Source Version)**: Hosted locally to provide flawless, free voice-to-text transcription for Voice Expense Submissions.

### 4. Database & Secure Storage
*   **PostgreSQL**: The most robust open-source relational database. Ideal for financial transactions, strict data integrity, and natively supports JSON data for easy backup and restore capabilities.
*   **SQLAlchemy / Prisma**: Object-Relational Mappers (ORMs) that ensure secure, typo-safe database interactions.

### 5. Payments & Integrations
*   **Stripe Connect / Razorpay**: Chosen for their robust support of automated, multi-currency payouts, making it trivial to route reimbursements directly to employees' bank accounts globally.

## 🌍 Conclusion & Impact
LedgerCore modernizes corporate expense management by combining AI-driven fraud prevention with a transparent, role-based approval system. By automating payments and reimbursements across multi-currency transactions, it:
- Reduces financial fraud.
- Cuts down manual processing time.
- Promotes personal finance management and financial inclusion.
- Makes expense management faster, safer, and more accessible for organizations of any size.


