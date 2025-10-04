# MediVars API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### POST /auth/register/patient
Register a new patient account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john.doe@email.com",
  "password": "password123",
  "phone": "+1234567890",
  "dateOfBirth": "1990-01-01",
  "gender": "male"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@email.com",
    "role": "patient"
  }
}
```

#### POST /auth/register/doctor
Register a new doctor account.

**Request Body:**
```json
{
  "firstName": "Dr. Sarah",
  "lastName": "Johnson",
  "email": "sarah.johnson@email.com", 
  "password": "password123",
  "phone": "+1234567890",
  "specialization": "Cardiology",
  "licenseNumber": "MD123456789",
  "experience": 10
}
```

#### POST /auth/login
Login for patients and doctors.

**Request Body:**
```json
{
  "email": "user@email.com",
  "password": "password123",
  "role": "patient" // or "doctor"
}
```

#### POST /auth/admin/login
Admin login.

**Request Body:**
```json
{
  "email": "admin@medivars.com",
  "password": "admin123"
}
```

### Doctors

#### GET /doctors
Get all verified doctors (public).

**Query Parameters:**
- `specialization` - Filter by specialization
- `rating` - Minimum rating filter
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search by name or specialization

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "doctor_id",
      "firstName": "Dr. Sarah",
      "lastName": "Johnson",
      "specialization": "Cardiology",
      "experience": 10,
      "rating": {
        "average": 4.8,
        "count": 125
      },
      "consultationFee": {
        "video": 75,
        "audio": 50,
        "chat": 35,
        "inPerson": 120
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

#### GET /doctors/:id
Get doctor details by ID.

#### PUT /doctors/profile
Update doctor profile (doctor only).

### Appointments

#### POST /appointments
Create new appointment (patient only).

**Request Body:**
```json
{
  "doctor": "doctor_id",
  "appointmentDate": "2024-01-25",
  "timeSlot": {
    "startTime": "10:00",
    "endTime": "10:30"
  },
  "consultationType": "video",
  "urgency": "medium",
  "symptoms": "Chest pain and shortness of breath",
  "payment": {
    "amount": 75
  }
}
```

#### GET /appointments/my
Get user's appointments (patient or doctor).

**Query Parameters:**
- `status` - Filter by status
- `page` - Page number
- `limit` - Items per page

#### PATCH /appointments/:id/status
Update appointment status (doctor only).

**Request Body:**
```json
{
  "status": "confirmed" // or "cancelled", "completed"
}
```

### Users

#### GET /users/profile
Get user profile (patient only).

#### PUT /users/profile
Update user profile (patient only).

#### POST /users/liked-doctors/:doctorId
Add doctor to liked list (patient only).

#### DELETE /users/liked-doctors/:doctorId
Remove doctor from liked list (patient only).

#### GET /users/liked-doctors
Get liked doctors (patient only).

### Admin

#### GET /admin/stats
Get dashboard statistics (admin only).

**Response:**
```json
{
  "success": true,
  "data": {
    "totalPatients": 1234,
    "totalDoctors": 89,
    "activeDoctors": 76,
    "pendingDoctors": 13,
    "todayAppointments": 156,
    "totalAppointments": 5678,
    "completedAppointments": 4321
  }
}
```

#### GET /admin/patients
Get all patients (admin only).

#### GET /admin/doctors
Get all doctors (admin only).

#### PATCH /admin/doctors/:id/verify
Verify or reject doctor (admin only).

**Request Body:**
```json
{
  "isVerified": true
}
```

#### GET /admin/appointments
Get all appointments (admin only).

### Payments

#### POST /payments/create-intent
Create Stripe payment intent.

**Request Body:**
```json
{
  "appointmentId": "appointment_id"
}
```

#### POST /payments/confirm
Confirm payment completion.

**Request Body:**
```json
{
  "paymentIntentId": "pi_xxx",
  "appointmentId": "appointment_id"
}
```

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

API requests are limited to prevent abuse:
- 100 requests per 15 minutes per IP
- 1000 requests per hour per authenticated user

## WebSocket Events

Real-time messaging uses Socket.io:

### Events
- `join-room` - Join a conversation room
- `send-message` - Send a message
- `receive-message` - Receive a message
- `user-online` - User came online
- `user-offline` - User went offline