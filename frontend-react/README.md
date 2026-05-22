# React + Vite Frontend

This is the frontend of my HR Management System built with React and Vite.

It provides an interface for managing employees and departments with role-based access control.

---

# Features

- JWT-based authentication
- Role-based UI (Admin and User)
- View departments and employees
- Search employees by name, surname, or email
- Pagination support
- Department filtering
- Real-time UI updates after changes

---

# User Roles

## Admin
- Can create, update, and delete employees
- Can create, update, and delete departments
- Has full access to all features

## User
- Can only view departments and employees
- Can search and filter data
- Cannot modify any data

---

# How to Run

Install dependencies:
> npm install

Run development server:
> npm run dev

Frontend will run at:
http://localhost:5173

---

# Authentication Flow

1. User opens the application
2. User logs in using username and password
3. Backend validates credentials and returns JWT token
4. Token is stored in the frontend
5. All API requests use this token for authorization
6. UI changes based on user role (admin/user)

---

# Project Structure

src
├── components
│ ├── DepartmentTable.jsx
│ ├── EmployeeTable.jsx
│ └── Pagination.jsx
├── pages
│ ├── Dashboard.jsx
│ └── Login.jsx
├── services
│ ├── api.js
│ ├── departmentService.js
│ └── employeeService.js
├── App.jsx
├── main.jsx
└── index.css

---

# Notes

- All data is fetched from a FastAPI backend.
- API communication is handled using Axios.
- UI updates automatically after successful API operations.