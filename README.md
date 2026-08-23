# Prajakta Khochage — Animated MERN Portfolio

A polished, responsive portfolio for **Prajakta Prakash Khochage**, inspired by the interaction style of modern developer portfolios while using an original lavender / violet / rose visual identity.

## Highlights
- Animated hero with typewriter role rotation
- Professional portrait with orbit/glow treatment
- Scroll reveal animations
- Responsive mobile navigation
- Projects, experience, skills, achievements, certifications, publications, education and leadership
- Certificate / publication modal cards
- MongoDB-backed contact API
- Reduced-motion support for accessibility
- Centralized portfolio content in `client/src/data.js`

## Run locally

### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Set `MONGO_URI` in `.env` for the contact form to store messages.

The frontend uses `VITE_API_URL` when provided, otherwise `https://prajakta-s-portfolio.onrender.com/api`.

## Deploy

### Vercel frontend
- Import the project and set the root directory to `client`.
- Build command: `npm run build`.
- Output directory: `dist`.
- Add `VITE_API_URL=https://YOUR-BACKEND.onrender.com/api`.

### Render backend
- Create a Web Service with root directory `server`.
- Build command: `npm install`.
- Start command: `npm start`.
- Add `MONGO_URI` and `CLIENT_ORIGIN` environment variables.

## Add certificates

Put certificate images in `client/public/certificates/` and extend `certifications` in `client/src/data.js` with an image/link field if you want the modal to show the actual certificate.
