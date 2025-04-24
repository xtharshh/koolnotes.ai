import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
  },
  name: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true,
    select: false, // Don't include by default in queries
    minlength: 1,  // Ensure password isn't empty
  },
  uploads: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Upload',
    default: [] 
  }],
  earnings: { 
    type: Number, 
    default: 0 
  },
  role: { 
    type: String, 
    enum: ['USER', 'ADMIN'],
    default: 'USER' 
  }
}, {
  timestamps: true
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
