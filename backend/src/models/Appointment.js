import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  timeSlot: {
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
  },
  consultationType: {
    type: String,
    enum: ['audio', 'video', 'chat', 'in-person'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'],
    default: 'pending'
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  },
  symptoms: {
    type: String,
    required: true
  },
  notes: {
    patient: String,
    doctor: String
  },
  prescription: [{
    medication: String,
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String
  }],
  payment: {
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    paymentId: String,
    paymentMethod: String
  },
  meetingLink: String,
  reminderSent: {
    type: Boolean,
    default: false
  },
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: Date
}, {
  timestamps: true
});

export default mongoose.model('Appointment', appointmentSchema);