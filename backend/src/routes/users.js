import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticate, authorize('patient'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile
router.put('/profile', authenticate, authorize('patient'), async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Don't allow password updates here
    delete updates.email; // Don't allow email updates here

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add doctor to liked list
router.post('/liked-doctors/:doctorId', authenticate, authorize('patient'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { likedDoctors: req.params.doctorId } },
      { new: true }
    ).select('-password').populate('likedDoctors', 'firstName lastName specialization profileImage rating');

    res.json({ success: true, data: user.likedDoctors });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove doctor from liked list
router.delete('/liked-doctors/:doctorId', authenticate, authorize('patient'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { likedDoctors: req.params.doctorId } },
      { new: true }
    ).select('-password').populate('likedDoctors', 'firstName lastName specialization profileImage rating');

    res.json({ success: true, data: user.likedDoctors });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get liked doctors
router.get('/liked-doctors', authenticate, authorize('patient'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('likedDoctors')
      .populate('likedDoctors', 'firstName lastName specialization profileImage rating consultationFee');

    res.json({ success: true, data: user.likedDoctors });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;