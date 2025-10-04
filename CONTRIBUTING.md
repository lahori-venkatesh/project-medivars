# Contributing to MediVars

Thank you for your interest in contributing to MediVars! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud)
- Git

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/medivars.git
   cd medivars
   ```

2. **Install dependencies for all applications**
   ```bash
   # Backend
   cd backend && npm install

   # Frontend
   cd ../frontend && npm install

   # Doctors Portal
   cd ../doctors-portal && npm install

   # Admin Panel
   cd ../admin-panel && npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment file
   cp backend/.env.example backend/.env
   # Edit backend/.env with your configuration
   ```

4. **Start all services**
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

## 📁 Project Structure

```
medivars/
├── frontend/                 # Patient-facing React app (Port 3000)
├── doctors-portal/          # Doctors dashboard React app (Port 3002)
├── admin-panel/             # Admin dashboard React app (Port 3001)
├── backend/                 # Node.js Express API server (Port 5000)
├── shared/                  # Shared TypeScript types and utilities
└── docs/                    # Documentation
```

## 🛠️ Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Add comments for complex logic

### Commit Messages
Follow conventional commit format:
```
type(scope): description

Examples:
feat(frontend): add patient registration form
fix(backend): resolve authentication bug
docs(readme): update installation instructions
```

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Add tests if applicable
   - Update documentation

3. **Test your changes**
   ```bash
   # Run linting
   npm run lint

   # Run tests (if available)
   npm test
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat(scope): your description"
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Provide clear description
   - Reference related issues
   - Add screenshots for UI changes

## 🧪 Testing

### Frontend Testing
```bash
cd frontend && npm test
```

### Backend Testing
```bash
cd backend && npm test
```

### API Testing
Use tools like Postman or curl to test API endpoints:
```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password","role":"patient"}'
```

## 📝 Documentation

### API Documentation
- Document all new API endpoints
- Include request/response examples
- Update Postman collection

### Code Documentation
- Add JSDoc comments for functions
- Document complex algorithms
- Update README for new features

## 🐛 Bug Reports

When reporting bugs, include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details

## 💡 Feature Requests

For new features:
- Describe the problem it solves
- Provide use cases
- Consider implementation complexity
- Discuss with maintainers first

## 🔒 Security

- Never commit sensitive data (API keys, passwords)
- Use environment variables for configuration
- Follow OWASP security guidelines
- Report security issues privately

## 📞 Getting Help

- Create an issue for bugs or questions
- Join our Discord/Slack (if available)
- Email: lahorivenkatesh709@gmail.com

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to MediVars! 🚀