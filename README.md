# StackIt – A Minimal Q&A Forum Platform

## 📖 Overview
**StackIt** is a minimal question-and-answer platform that supports collaborative learning and structured knowledge sharing. It’s designed to be simple, user-friendly, and focused on the core experience of asking and answering questions within a community.

## 👥 User Roles
The platform operates on a strictly role-based permission system:

| Role | Permissions |
| :--- | :--- |
| **Guest** | View all questions and answers |
| **User** | Register, log in, post questions/answers, vote |
| **Admin** | Moderate content |

## ✨ Core Features (Must-Have)

### 1. Ask Question
Users can submit a new question with the following details:
- **Title**: Short and descriptive.
- **Description**: Written using the built-in rich text editor.
- **Tags**: Multi-select input (e.g., React, JWT) to properly categorize the question.

### 2. Rich Text Editor Features
The description editor supports robust text formatting for clarity:
- Bold, Italic, Strikethrough
- Numbered lists & Bullet points
- Emoji insertion
- Hyperlink insertion (URL)
- Image upload
- Text alignment (Left, Center, Right)

### 3. Answering Questions
- Users can post answers to any question on the platform.
- Answers are formatted using the same robust **Rich Text Editor**.
- *Restriction*: Only logged-in users can post answers.

### 4. Voting & Accepting Answers
- **Voting**: Users can upvote or downvote answers to bubble up the most helpful responses.
- **Accepting**: Question owners have the exclusive ability to mark one specific answer as "accepted".

### 5. Tagging
- All questions must include relevant tags, making it easy for the community to discover topics of interest.

### 6. Notification System
A highly responsive notification system keeps users engaged:
- A **notification icon (bell)** appears in the top navigation bar.
- Users are notified in real-time when:
  - Someone answers their question.
  - Someone comments on their answer.
  - Someone mentions them using `@username`.
- The bell icon displays a badge showing the number of **unread notifications**.
- Clicking the icon opens a dropdown list of recent notifications for quick access.
