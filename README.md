# SlayTix

SlayTix is a full-stack movie ticket booking platform that allows users to browse current and upcoming movies, select showtimes, add billing details, and complete checkout — all within a sleek, responsive interface. Designed with user experience and admin efficiency in mind, SlayTix also includes an admin dashboard for managing movies and showtimes.

## Team Members
- Katie Dao  
- Angela Hoang  
- Natalie Mayer  
- Thu Tran

## Technologies Used
- **Frontend**: Next.js, React, CSS Modules  
- **Backend**: Spring Boot, Java  
- **Database**: MySQL (or your specific DB)  
- **Authentication**: JWT or Spring Security  
- **API Communication**: RESTful endpoints  
- **Deployment**: (Optional – add if deployed to Vercel, Render, etc.)

## Features

### User Features
- Browse “Currently Running” and “Coming Soon” movies
- View showtimes and select tickets
- Add or edit billing addresses and payment details
- Complete purchase via a streamlined checkout flow

### Admin Features
- Admin login authentication
- Add, edit, or delete movies and showtimes
- Dashboard to manage listings and scheduling

## Project Structure
- `frontend/` – Contains the Next.js app and React components
- `backend/` – Spring Boot application with REST endpoints and database integration
- `public/` – Movie assets, poster images, and static content

## Lessons Learned
- Effective collaboration across a full development stack
- Handling cross-origin requests (CORS) between frontend and backend
- Implementing secure login with encrypted passwords (BCrypt)
- Styling with modular, scoped CSS
- Managing complex forms and validation in React

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev

cd backend
./mvnw spring-boot:run
