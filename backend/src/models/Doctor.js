import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  experience: {
    type: Number,
    required: true
  },
  education: [{
    degree: String,
    institution: String,
    year: Number
  }],
  certifications: [String],
  profileImage: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: 500
  },
  consultationFee: {
    audio: { type: Number, default: 0 },
    video: { type: Number, default: 0 },
    chat: { type: Number, default: 0 },
    inPerson: { type: Number, default: 0 }
  },
  availability: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    slots: [{
      startTime: String,
      endTime: String,
      isAvailable: { type: Boolean, default: true }
    }]
  }],
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  reviews: [{
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  documents: [{
    type: String,
    url: String,
    verified: { type: Boolean, default: false }
  }],
  languages: [String],
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  }
}, {
  timestamps: true
});

doctorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

doctorSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('Doctor', doctorSchema);