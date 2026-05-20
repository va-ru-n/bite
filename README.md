# Bite

Bite is a MERN nutrition tracking app with barcode scanning, manual food search, JWT authentication, and per-user meal history.

## Stack

- MongoDB
- Express.js
- React + Vite
- Node.js
- Tailwind CSS
- Recharts
- OpenFoodFacts API
- JWT authentication

## Features

- User registration and login with JWT
- Protected dashboard, scanner, search, and meal history pages
- Barcode nutrition lookup with OpenFoodFacts
- Manual food search
- Per-user meal logging in MongoDB
- Meal filtering, deletion, and pagination
- Daily macro summary and charts
- Dark mode with saved preference

## Run Locally

1. Install dependencies from the project root:

```bash
npm install
npm install --prefix server
npm install --prefix client
```

2. Create env files:

- `server/.env`
- `client/.env`

3. Add server env values:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
OPEN_FOOD_FACTS_BASE_URL=https://world.openfoodfacts.org
JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=7d
```

4. Add client env values:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

5. Start the backend:

```bash
cd server
npm run dev
```

6. Start the frontend in a second terminal:

```bash
cd client
npm run dev
```

## Auth API

### Register

- `POST /api/auth/register`

```json
{
  "name": "Asha",
  "email": "asha@example.com",
  "password": "secret123"
}
```

Sample response:

```json
{
  "success": true,
  "message": "Account created successfully",
  "token": "jwt_token_here",
  "user": {
    "_id": "665000000000000000000001",
    "name": "Asha",
    "email": "asha@example.com"
  }
}
```

### Login

- `POST /api/auth/login`

```json
{
  "email": "asha@example.com",
  "password": "secret123"
}
```

### Current User

- `GET /api/auth/me`
- Header: `Authorization: Bearer <token>`

## Meal API

All meal routes require:

```http
Authorization: Bearer <token>
```

### Get Meals

- `GET /api/meals?page=1&limit=6&search=oats&from=2026-05-01&to=2026-05-20`

### Create Meal

- `POST /api/meals`

```json
{
  "foodName": "Greek Yogurt",
  "calories": 120,
  "protein": 10,
  "carbs": 8,
  "fats": 4,
  "barcode": "1234567890123"
}
```

### Meal Stats

- `GET /api/meals/stats`

### Delete Meal

- `DELETE /api/meals/:id`

## Food API

### Barcode Lookup

- `GET /api/foods/barcode/3017620422003`

### Search

- `GET /api/foods/search?q=peanut%20butter`

## Deployment

### Frontend on Vercel

- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`
- Env: `VITE_API_BASE_URL=https://your-backend-url/api`

### Backend on Render

- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Required env:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=https://your-frontend-url.vercel.app
OPEN_FOOD_FACTS_BASE_URL=https://world.openfoodfacts.org
JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=7d
```

## Notes

- Meal data is now scoped to the logged-in user.
- The frontend stores the JWT in local storage and sends it as a Bearer token.
- If you previously exposed a real MongoDB credential in local env files, rotate that password in MongoDB Atlas.
