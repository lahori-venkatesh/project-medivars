# MediVars - Complete Telemedicine Platform

## [🌐 Check out the live web app](https://medivars.netlify.app/)

A comprehensive full-stack telemedicine platform connecting patients with healthcare providers through video consultations, instant messaging, and online appointment management.

## 🏗️ Project Structure

```
medivars/
├── frontend/                 # Patient-facing React app (Port 3000)
├── doctors-portal/          # Doctors dashboard React app (Port 3002)
├── admin-panel/             # Admin dashboard React app (Port 3001)
├── backend/                 # Node.js Express API server (Port 5000)
├── shared/                  # Shared TypeScript types and utilities
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Doctors Portal Setup

```bash
cd doctors-portal
npm install
npm run dev
```

### 4. Admin Panel Setup

```bash
cd admin-panel
npm install
npm run dev
```

## 🔧 Environment Configuration

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medivars
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
```

## 📱 Applications

### Frontend (Patient App) - http://localhost:3000
- Patient registration and login
- Doctor search and filtering
- Appointment booking
- Video consultations
- Payment processing
- Medical records

### Doctors Portal - http://localhost:3002
- Doctor registration and verification
- Professional dashboard
- Appointment management
- Patient consultation tools
- Schedule management
- Earnings tracking
- Secure messaging with patients

### Admin Panel - http://localhost:3001
- Doctor verification and management
- Patient management
- Appointment oversight
- Analytics and reporting
- System configuration

**Admin Credentials:**
- Email: admin@medivars.com
- Password: admin123

### Backend API - http://localhost:5000
- RESTful API endpoints
- JWT authentication
- MongoDB integration
- Real-time messaging (Socket.io)
- Payment processing (Stripe)

## 🛠️ Technology Stack

### Frontend & Admin Panel
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Socket.io** for real-time features
- **Stripe** for payments
- **Bcrypt** for password hashing

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register/patient` - Patient registration
- `POST /api/auth/register/doctor` - Doctor registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login

<<<<<<< HEAD
### Users & Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
=======
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/medivars.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
>>>>>>> 5559e4be828f73933f92511018f9bb90ceba831d

### Appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/my` - Get user appointments
- `PATCH /api/appointments/:id/status` - Update appointment status

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/doctors` - Manage doctors
- `GET /api/admin/patients` - Manage patients
- `PATCH /api/admin/doctors/:id/verify` - Verify doctor

## 🚀 Development

### Running All Services
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev

# Terminal 3 - Doctors Portal
cd doctors-portal && npm run dev

# Terminal 4 - Admin Panel
cd admin-panel && npm run dev
```

### Building for Production
```bash
# Frontend
cd frontend && npm run build

# Doctors Portal
cd doctors-portal && npm run build

# Admin Panel
cd admin-panel && npm run build

<<<<<<< HEAD
# Backend
cd backend && npm start
```
=======
**Admin Panel:**
1. Approve or reject doctor applications

2. Manage platform users and analytics
>>>>>>> 5559e4be828f73933f92511018f9bb90ceba831d

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes and middleware
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 📊 Features

### Patient Features
- ✅ User registration and authentication
- ✅ Doctor search and filtering
- ✅ Multiple consultation types (Audio, Video, Chat, In-Person)
- ✅ Appointment scheduling
- ✅ Instant booking with urgency levels
- ✅ Secure payment integration
- ✅ Liked doctors management

### Doctor Features
- ✅ Doctor registration and verification
- ✅ Profile and availability management
- ✅ Appointment management
- ✅ Patient consultation tools
- ✅ Earnings tracking

### Admin Features
- ✅ Doctor verification system
- ✅ User and appointment management
- ✅ Dashboard analytics
- ✅ System configuration
- ✅ Content moderation tools

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<<<<<<< HEAD
## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support
=======
## License
Distributed under the MIT License. See `LICENSE` for more information.
![License](https://img.shields.io/badge/license-MIT-blue.svg)
## Contact
Project Maintainer: [Lahori Venkatesh] - lahorivenkatesh709@gmail.com

>>>>>>> 5559e4be828f73933f92511018f9bb90ceba831d

For support, email lahorivenkatesh709@gmail.com or create an issue in the repository.

## 🌟 Acknowledgments

- React community for excellent documentation
- MongoDB for robust database solutions
- Stripe for secure payment processing
- All contributors and testers