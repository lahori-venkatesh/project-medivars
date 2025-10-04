import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Doctor from '../models/Doctor.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    let user;
    if (decoded.role === 'patient') {
      user = await User.findById(decoded.id);
    } else if (decoded.role === 'doctor') {
      user = await Doctor.findById(decoded.id);
    } else if (decoded.role === 'admin') {
      user = { _id: 'admin', role: 'admin' };
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};