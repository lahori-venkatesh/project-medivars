import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import Doctor from '../models/Doctor.js';

const router = express.Router();

// Get all doctors (public)
router.get('/', async (req, res) => {
  try {
    const { 
      specialization, 
      availability, 
      rating, 
      page = 1, 
      limit = 10,
      search 
    } = req.query;

    const query = { isActive: true, isVerified: true };

    // Add filters
    if (specialization) {
      query.specialization = { $regex: specialization, $options: 'i' };
    }

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } }
      ];
    }

    if (rating) {
      query['rating.average'] = { $gte: parseFloat(rating) };
    }

    const doctors = await Doctor.find(query)
      .select('-password -documents')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ 'rating.average': -1 });

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

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .select('-password -documents')
      .populate('reviews.patient', 'firstName lastName');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update doctor profile (doctor only)
router.put('/profile', authenticate, authorize('doctor'), async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Don't allow password updates here
    delete updates.email; // Don't allow email updates here

    const doctor = await Doctor.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select('-password -documents');

    res.json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get doctor's appointments
router.get('/appointments/my', authenticate, authorize('doctor'), async (req, res) => {
  try {
    const { status, date, page = 1, limit = 10 } = req.query;
    
    const query = { doctor: req.user._id };
    
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
      .populate('patient', 'firstName lastName email phone')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ appointmentDate: 1 });

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