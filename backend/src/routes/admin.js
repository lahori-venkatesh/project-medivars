import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';

const router = express.Router();

// Get dashboard stats
router.get('/stats', authenticate, authorize('admin'), async (req, res) => {
  try {
    const [
      totalPatients,
      totalDoctors,
      activeDoctors,
      pendingDoctors,
      todayAppointments,
      totalAppointments,
      completedAppointments
    ] = await Promise.all([
      User.countDocuments({ isActive: true }),
      Doctor.countDocuments(),
      Doctor.countDocuments({ isActive: true, isVerified: true }),
      Doctor.countDocuments({ isVerified: false }),
      Appointment.countDocuments({
        appointmentDate: {
          $gte: new Date().setHours(0, 0, 0, 0),
          $lt: new Date().setHours(23, 59, 59, 999)
        }
      }),
      Appointment.countDocuments(),
      Appointment.countDocuments({ status: 'completed' })
    ]);

    res.json({
      success: true,
      data: {
        totalPatients,
        totalDoctors,
        activeDoctors,
        pendingDoctors,
        todayAppointments,
        totalAppointments,
        completedAppointments
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all patients
router.get('/patients', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    
    const query = {};
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const patients = await User.find(query)
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: patients,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all doctors
router.get('/doctors', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;
    
    const query = {};
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } }
      ];
    }

    if (status === 'pending') {
      query.isVerified = false;
    } else if (status === 'verified') {
      query.isVerified = true;
    }

    const doctors = await Doctor.find(query)
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Doctor.countDocuments(query);

    res.json({
      success: true,
      data: doctors,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Verify/Reject doctor
router.patch('/doctors/:id/verify', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { isVerified } = req.body;
    
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { isVerified },
      { new: true }
    ).select('-password');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all appointments
router.get('/appointments', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10, status, date } = req.query;
    
    const query = {};
    if (status) {
      query.status = status;
    }
    
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.appointmentDate = { $gte: startDate, $lt: endDate };
    }

    const appointments = await Appointment.find(query)
      .populate('patient', 'firstName lastName email')
      .populate('doctor', 'firstName lastName specialization')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Appointment.countDocuments(query);

    res.json({
      success: true,
      data: appointments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;