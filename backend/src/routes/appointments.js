import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';

const router = express.Router();

// Create appointment (patient only)
router.post('/', authenticate, authorize('patient'), async (req, res) => {
  try {
    const appointmentData = {
      ...req.body,
      patient: req.user._id
    };

    // Validate doctor exists and is available
    const doctor = await Doctor.findById(appointmentData.doctor);
    if (!doctor || !doctor.isActive || !doctor.isVerified) {
      return res.status(400).json({ message: 'Doctor not available' });
    }

    // Check if time slot is available
    const existingAppointment = await Appointment.findOne({
      doctor: appointmentData.doctor,
      appointmentDate: appointmentData.appointmentDate,
      'timeSlot.startTime': appointmentData.timeSlot.startTime,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'Time slot not available' });
    }

    const appointment = new Appointment(appointmentData);
    await appointment.save();

    await appointment.populate([
      { path: 'patient', select: 'firstName lastName email phone' },
      { path: 'doctor', select: 'firstName lastName specialization' }
    ]);

    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's appointments
router.get('/my', authenticate, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = {};
    
    if (req.userRole === 'patient') {
      query.patient = req.user._id;
    } else if (req.userRole === 'doctor') {
      query.doctor = req.user._id;
    }
    
    if (status) {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .populate('patient', 'firstName lastName email phone')
      .populate('doctor', 'firstName lastName specialization profileImage')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ appointmentDate: -1 });

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

// Update appointment status (doctor only)
router.patch('/:id/status', authenticate, authorize('doctor'), async (req, res) => {
  try {
    const { status } = req.body;
    
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, doctor: req.user._id },
      { status },
      { new: true }
    ).populate([
      { path: 'patient', select: 'firstName lastName email phone' },
      { path: 'doctor', select: 'firstName lastName specialization' }
    ]);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Cancel appointment
router.patch('/:id/cancel', authenticate, async (req, res) => {
  try {
    const query = { _id: req.params.id };
    
    if (req.userRole === 'patient') {
      query.patient = req.user._id;
    } else if (req.userRole === 'doctor') {
      query.doctor = req.user._id;
    }

    const appointment = await Appointment.findOneAndUpdate(
      query,
      { status: 'cancelled' },
      { new: true }
    ).populate([
      { path: 'patient', select: 'firstName lastName email phone' },
      { path: 'doctor', select: 'firstName lastName specialization' }
    ]);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;