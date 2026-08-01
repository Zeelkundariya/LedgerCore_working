# Skill Swap Platform 🔄

## 📖 Overview
The **Skill Swap Platform** is a collaborative web application designed to connect individuals who want to exchange knowledge. It allows users to list the skills they can teach and request the skills they want to learn, facilitating a 1-on-1 "skill swap" without any monetary transactions.

## 🚀 Tech Stack
To ensure a highly responsive, scalable, and secure application, we utilize the following modern technologies:
- **Frontend**: Next.js (React) and Tailwind CSS for a sleek, lightning-fast, and responsive UI.
- **Backend**: Node.js with Express.js for building robust RESTful APIs.
- **Database**: MongoDB (with Mongoose) for flexible and scalable storage of user profiles and swap relationships.
- **Authentication**: JWT (JSON Web Tokens) for secure user sessions and strict Role-Based Access Control (Admin vs User).

## ✨ Core Features

### 👤 User Profiles
Users can create comprehensive profiles to facilitate the best skill matches:
- **Basic Info**: Name, optional Location, and optional Profile Photo.
- **Skill Inventory**: Dedicated lists for **Skills Offered** and **Skills Wanted**.
- **Availability**: Specify preferred meeting times (e.g., Weekends, Evenings).
- **Privacy Controls**: Users have full control to toggle their profiles between **Public** or **Private**.

### 🔍 Search & Discovery
- **Skill Search**: Users can easily browse the community or search for specific skills (e.g., "Photoshop", "Excel", "React") to find the perfect learning partner.

### 🤝 Request & Swap Management
- **Send & Receive Offers**: Initiate swap requests with other public users.
- **Offer Management**: Instantly **Accept** or **Reject** incoming swap offers.
- **Tracking Dashboard**: A dedicated view to monitor all **current** and **pending** swap requests.
- **Cancellation**: Users retain the ability to **delete or cancel** a swap request if the other party has not yet accepted it.
- **Feedback System**: Upon completing a swap, users can leave **Ratings and Feedback** to help build community trust.

## 🛡️ Admin Role & Moderation
To ensure a safe and high-quality learning environment, Admins are equipped with a powerful moderation dashboard:
- **Content Moderation**: Ability to reject and remove inappropriate or spammy skill descriptions.
- **User Management**: Authority to ban users who violate platform policies.
- **Platform Monitoring**: Track system health by monitoring all pending, accepted, and cancelled swaps globally.
- **Announcements**: Send platform-wide broadcast messages (such as new feature updates or downtime alerts).
- **Data & Analytics**: Download comprehensive reports detailing user activity, feedback logs, and swap statistics.
