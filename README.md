# 🧠 Preptalk – AI-Powered Mock Interviews & Business Pitch Practice

**Preptalk** is an AI-driven web platform that helps freelancers and microentrepreneurs prepare for job interviews or pitch meetings. With realistic mock sessions, tailored questions, and intelligent feedback, it supports skill growth, confidence-building, and global readiness—especially for underserved communities.

🔗 **Live Website:** [https://preptalkai-ruddy.vercel.app](https://preptalkai-ruddy.vercel.app)
> ⚠️ **Note:** Google Sign-In is currently **not working** on the live website but works correctly in **local development**.

---

## 🚀 Features

### ✅ Working:
- **Resume & Business Profile Scanning**
    - Upload a resume.
    - Automatically parses and pre-fills user details for tailored interview simulations.

### 🛠 Under Development:
- AI Persona Selection (Recruiter, Investor, HR, Loan Officer)
- Customizable Interview & Pitch Practice
- Real-Time AI Follow-ups and Feedback
- Post-Interview Skill Assessment
- Performance Tracker Dashboard

---

## 🧰 Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT & Google OAuth 2.0
- **Deployment:** Vercel (frontend), Render for backend
- **Email Service:** SMTP
- **Planned:** OpenAI integration for question generation & assessment

---

## 📁 Folder Structure

```
/root
├── .idea/
│   └── inspectionProfiles/
├── client/
│   ├── public/
│   │   ├── img/
│   │   └── video/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── modals/
│   │   │   ├── navigation/
│   │   │   ├── section/
│   │   │   └── shared/
│   │   ├── context/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── layout/
│   │   ├── pages/
│   │   └── utils/
│   └── .env
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── utils/
│   └── .env

```

---

## 🧪 Local Development Setup

### 1. **Clone the Repository**
```bash
git clone https://github.com/johnandrewsanvictores/PreptalkAI.git
cd PreptalkAI
```

---

### 2. **Backend Setup (`server/`)**
```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SESSION_SECRET=your-session-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
FRONTEND_BASE_URL=http://localhost:3000

SMTP_TO_EMAIL=your-email@example.com
SMTP_TO_PASSWORD=your-email-password

MONGODB_URI=mongodb://localhost:27017/preptalk
JWT_SECRET=your-jwt-secret
NODE_ENV=development
```

Run the backend server:
```bash
npm run dev
```

---

### 3. **Frontend Setup (`client/`)**
```bash
cd ../client
npm install
```

Create a `.env` file in `client/`:

```env
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

Run the frontend:
```bash
npm run dev
```

Visit the app locally at:  
🌐 `http://localhost:5173`

---

## 🔐 Google OAuth Configuration Notes

In Google Cloud Console, for your OAuth Client ID:

- **Authorized JavaScript Origins:**
  ```
  http://localhost:3000
  https://your-live-frontend.com (optional)
  ```

- **Authorized Redirect URIs:**
  ```
  http://localhost:3000/auth/google/callback
  https://your-live-backend.com/auth/google/callback (optional)
  ```

> Ensure live backend URL is correctly set when deployed.

---

## 📌 Roadmap

- [ ] Mock Interviews with AI Personas
- [ ] Live AI Follow-ups
- [ ] Business Pitch Practice Mode
- [ ] Skill Tracking Dashboard
- [ ] Email Feedback Summaries

---

## 🤝 Contributing

We welcome contributions!  
To contribute:

1. Fork the repo
2. Create a feature branch
3. Submit a pull request

---
