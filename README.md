

# 📌 CMS Backend Project

## 🚀 Tech Stack

* **Node.js** + **Express**
* **Prisma ORM** + **PostgreSQL**
* **JWT Authentication**
* **Nodemailer** (Email verification & reset password)

---

## ⚙️ Installation

Clone project:

```bash
git clone https://github.com/username/repo-name.git
cd repo-name
```

Install dependencies:

```bash
npm install
```

Setup `.env`:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your_jwt_secret"
USER_EMAIL="your_gmail"
USER_PASSWORD="your_app_password"
GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
```

Run project:

```bash
npm run dev
```

---

## 📌 API Endpoints

### 🔑 Auth

* `POST /api/auth/register` → Register new user
* `GET /api/auth/verify?token=xxx` → Verify email
* `POST /api/auth/login` → Login with email & password
* `POST /api/auth/google` → Login with Google
* `POST /api/auth/requestreset` → Request reset password
* `POST /api/auth/resetpassword?token=xxx` → Reset password
* `POST /api/auth/logout` → Logout
* * `POST /api/auth/profile` → profile





