readme for this project'
Bite 🍽️

A MERN Stack Nutrition Tracking and Food Scanner Application

📌 Overview

Bite is a full-stack MERN application that helps users track meals, scan food products, and monitor nutrition details. The application provides authentication, barcode scanning, meal history, nutrition summaries, and a responsive modern UI.

🚀 Features
🔐 User Authentication (Register/Login)
🍔 Food Nutrition Search
📷 Barcode Scanner Integration
📊 Nutrition Dashboard
🥗 Meal Tracking
📜 Meal History
🌙 Dark Mode Support
📱 Responsive Design
⚡ Fast Vite Frontend
☁️ Render + Vercel Deployment
🛠️ Tech Stack
Frontend
React.js
Vite
Tailwind CSS
Axios
React Router
Backend
Node.js
Express.js
MongoDB Atlas
Mongoose
JWT Authentication
Deployment
Vercel (Frontend)
Render (Backend)
📂 Project Structure
bite/
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── README.md
⚙️ Installation
1️⃣ Clone Repository
git clone https://github.com/va-ru-n/bite.git
cd bite
📦 Backend Setup
cd server
npm install

Create .env

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
CLIENT_URL=http://localhost:5173

Run backend:

npm run dev
💻 Frontend Setup
cd client
npm install

Create .env

VITE_API_BASE_URL=http://localhost:5000/api

Run frontend:

npm run dev
🌐 API Routes
Auth Routes
Method	Endpoint
POST	/api/auth/register
POST	/api/auth/login
Food Routes
Method	Endpoint
GET	/api/foods/search
Meal Routes
Method	Endpoint
GET	/api/meals
POST	/api/meals
🚀 Deployment
Frontend (Vercel)

Add Environment Variable:

VITE_API_BASE_URL=https://your-backend.onrender.com/api
Backend (Render)

Add Environment Variables:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLIENT_URL=https://your-frontend.vercel.app
🔒 Security
Environment variables secured using .env
.env excluded using .gitignore
JWT-based authentication
MongoDB Atlas secured access
📸 Screenshots

Add your project screenshots here.

👨‍💻 Author

Pakala Venkata Varun Kumar

GitHub: va-ru-n GitHub

📄 License

This project is developed for learning and educational purposes.
