# 🚀 UserFlow - User Management Application

A full-featured User Management application built using modern frontend technologies. This project demonstrates authentication, protected routing, CRUD operations, API integration, and a responsive UI.

---

## 📌 Features

- 🔐 User Registration & Login (Authentication)
- 🛡️ Protected Routes using TanStack Router
- 👥 User Dashboard with CRUD Operations
  - Add User
  - Edit User
  - Delete User
- 🌐 API Integration using React Query
- 🔍 Search Users (by ID, Name, Email)
- 🎯 Filter Users (Local / API)
- 🔃 Sorting (Ascending / Descending by ID)
- 📄 Pagination (5 users per page)
- 📱 Responsive UI with Tailwind CSS
- 🔔 Toast Notifications for better UX

---

## 🛠️ Tech Stack

- ⚛️ React.js (with TypeScript)
- 🧭 TanStack Router (Routing)
- 🔄 React Query (API handling & caching)
- 🎨 Tailwind CSS (Styling)
- 💾 LocalStorage (Data persistence)
- 🔔 React Hot Toast (Notifications)

---
## 📂 Project Structure

src/
- components → reusable UI
- pages → main screens
- routes → routing config
- schema → validation logic
- 
---

## 🔐 Authentication Flow

- User registers → Data stored in localStorage
- User logs in → Stored as `currentUser`
- Protected routes check authentication before access

---

## 🔄 Data Handling

- API users fetched using React Query
- Local users stored in localStorage
- Both are merged and displayed in dashboard

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
