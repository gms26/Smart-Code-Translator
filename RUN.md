# Smart Code Translator — Run Instructions 🚀

Follow these steps to run the application locally on your machine.

---

## 1. Prerequisites
- **Node.js**: (v18 or higher recommended)
- **MongoDB**: A valid `MONGODB_URI` from MongoDB Atlas.
- **Gemini AI**: A valid `GEMINI_API_KEY` from Google AI Studio.

---

## 2. Configuration (`.env` Files)
Ensure both `.env` files are correctly set up before starting:

### Backend (`server/.env`)
```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_client_id
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 3. How to Start the App

### Step A: Start the Backend (Server)
Open a terminal in the root directory and run:
```powershell
cd server
npm run dev
```
- **Port**: `5000`
- **Output**: `🚀 Server running on port 5000`

### Step B: Start the Frontend (Client)
Open a **new** terminal and run:
```powershell
cd client
npm run dev
```
- **Port**: `5173` (default Vite port)
- **URL**: [http://localhost:5173/](http://localhost:5173/)

---

## 4. Key Commands Reference

| Action | Command (from folder) |
| :--- | :--- |
| **Install Server Deps** | `npm install` (in `server/`) |
| **Install Client Deps** | `npm install` (in `client/`) |
| **Run Backend (Dev)** | `npm run dev` (in `server/`) |
| **Run Frontend (Dev)** | `npm run dev` (in `client/`) |
| **Build Web App** | `npm run build` (in `client/`) |

---

## 5. Troubleshooting
- **Port 5000 already in use**: Change the `PORT` in `server/.env`.
- **Database Error**: Ensure your IP address is whitelisted in MongoDB Atlas.
- **Vite Error**: Run `npm install` in the `client/` directory to ensure all dependencies are resolved.

---

*Verified by Antigravity QA | 2026*
