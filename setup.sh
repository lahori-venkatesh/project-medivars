#!/bin/bash

# MediVars Setup Script
echo "🏥 Setting up MediVars Telemedicine Platform..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js $(node -v) is installed"

# Check if MongoDB is running (optional)
if command -v mongod &> /dev/null; then
    print_success "MongoDB is available"
else
    print_warning "MongoDB not found locally. Make sure you have MongoDB Atlas or local MongoDB running."
fi

# Install dependencies for all applications
print_status "Installing dependencies for all applications..."

# Backend
print_status "Installing backend dependencies..."
cd backend
if npm install; then
    print_success "Backend dependencies installed"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi
cd ..

# Frontend
print_status "Installing frontend dependencies..."
cd frontend
if npm install; then
    print_success "Frontend dependencies installed"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi
cd ..

# Doctors Portal
print_status "Installing doctors portal dependencies..."
cd doctors-portal
if npm install; then
    print_success "Doctors portal dependencies installed"
else
    print_error "Failed to install doctors portal dependencies"
    exit 1
fi
cd ..

# Admin Panel
print_status "Installing admin panel dependencies..."
cd admin-panel
if npm install; then
    print_success "Admin panel dependencies installed"
else
    print_error "Failed to install admin panel dependencies"
    exit 1
fi
cd ..

# Setup environment file
print_status "Setting up environment configuration..."
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    print_success "Environment file created at backend/.env"
    print_warning "Please edit backend/.env with your configuration before running the backend"
else
    print_success "Environment file already exists"
fi

# Create start script
print_status "Creating start scripts..."

cat > start-all.sh << 'EOF'
#!/bin/bash

# Start all MediVars services
echo "🚀 Starting MediVars Platform..."

# Function to kill background processes on exit
cleanup() {
    echo "Stopping all services..."
    kill $(jobs -p) 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

# Start backend
echo "Starting backend on port 5000..."
cd backend && npm run dev &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend
echo "Starting frontend on port 3000..."
cd frontend && npm run dev &
FRONTEND_PID=$!

# Start doctors portal
echo "Starting doctors portal on port 3002..."
cd doctors-portal && npm run dev &
DOCTORS_PID=$!

# Start admin panel
echo "Starting admin panel on port 3001..."
cd admin-panel && npm run dev &
ADMIN_PID=$!

echo ""
echo "🎉 All services started!"
echo ""
echo "📱 Access your applications:"
echo "   Frontend (Patients): http://localhost:3000"
echo "   Admin Panel:         http://localhost:3001"
echo "   Doctors Portal:      http://localhost:3002"
echo "   Backend API:         http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for all background processes
wait
EOF

chmod +x start-all.sh

print_success "Start script created: ./start-all.sh"

echo ""
print_success "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Edit backend/.env with your MongoDB URI and other configurations"
echo "   2. Run './start-all.sh' to start all services"
echo "   3. Or start services individually:"
echo "      - Backend: cd backend && npm run dev"
echo "      - Frontend: cd frontend && npm run dev"
echo "      - Doctors Portal: cd doctors-portal && npm run dev"
echo "      - Admin Panel: cd admin-panel && npm run dev"
echo ""
echo "📱 Application URLs:"
echo "   - Frontend (Patients): http://localhost:3000"
echo "   - Admin Panel: http://localhost:3001"
echo "   - Doctors Portal: http://localhost:3002"
echo "   - Backend API: http://localhost:5000"
echo ""
echo "📚 Documentation:"
echo "   - API Documentation: docs/API.md"
echo "   - Deployment Guide: docs/DEPLOYMENT.md"
echo "   - Contributing Guide: CONTRIBUTING.md"
echo ""
print_success "Happy coding! 🚀"