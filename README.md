# User Management App

A modern, responsive **CRUD (Create, Read, Update, Delete)** application built with **React + Vite + React Router + Tailwind CSS**.  
Uses **[JSONPlaceholder](https://jsonplaceholder.typicode.com)** as a fake REST API to simulate full backend functionality.

## Live Demo
(https://synergy-7aa8f.web.app/)

## Features

- **View All Users** – Responsive table (desktop) & cards (mobile)
- **User Detail Page** – Click email to view full profile
- **Add New User** – Clean form with POST simulation
- **Edit User** – Beautiful modal with pre-filled values + PUT request
- **Delete User** – Confirmation + DELETE request simulation
- **Fully Responsive** – Perfect on phones, tablets, and desktops
- **No Backend Needed** – 100% frontend with simulated API
- **Clean & Modern UI** – Powered by Tailwind CSS

## Tech Stack

| Technology         | Purpose                          |
|--------------------|----------------------------------|
| React              | Component-based UI               |
| Vite               | Fast dev server & build tool     |
| React Router v6    | Client-side routing              |
| Tailwind CSS       | Utility-first styling            |
| JSONPlaceholder    | Fake REST API for CRUD           |

## Project Structure

src/
├── components/
│   ├── Table.tsx              → User list + Edit/Delete modal
│   ├── Loader.tsx             → Loading spinner
│   └── ...
├── pages/
│   ├── HomePage.tsx           → Main users directory
│   ├── AddUserPage.tsx        → Add user form
│   └── IndividualUserPage.tsx → User detail view
├── hooks/
│   └── useFetch.ts            → Custom API hook
├── App.tsx                    → All routes
└── main.tsx                   → Entry point

## API Endpoints (Simulated)

| Action       | Method | URL                          | Response                          |
|------------|--------|------------------------------|-----------------------------------|
| Get Users  | GET    | `/users`                     | List of 10 users                  |
| Get User   | GET    | `/users/:id`                 | Single user details               |
| Add User   | POST   | `/users`                     | Returns data + `id: 11`           |
| Update     | PUT    | `/users/:id`                 | Returns updated user              |
| Delete     | DELETE | `/users/:id`                 | Returns `{}` (success)            |

> All changes are simulated — data resets on refresh.

## How to Run Locally

# Clone the repository
git clone https://github.com/Shaurya-Jha007/Synergy

cd synergy

# Install dependencies
npm install

# Start development server
npm run dev

