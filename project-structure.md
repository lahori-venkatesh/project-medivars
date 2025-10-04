# MediVars Project Structure

```
medivars/
├── frontend/                 # Patient-facing React app
├── admin-panel/             # Admin React app
├── backend/                 # Node.js Express API
└── shared/                  # Shared types and utilities
```

## Architecture Overview

- **Frontend**: Patient-facing web application (React + TypeScript)
- **Admin Panel**: Separate admin dashboard (React + TypeScript)  
- **Backend**: RESTful API server (Node.js + Express + MongoDB)
- **Shared**: Common TypeScript types and utilities

## Development Setup

1. Backend API runs on port 5000
2. Frontend runs on port 3000
3. Admin panel runs on port 3001