import mongoose from 'mongoose';

const jobRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    category: {
      type: String,
      trim: true,
      default: ''
    },
    location: {
      type: String,
      trim: true,
      default: ''
    },
    contactName: {
      type: String,
      trim: true,
      default: ''
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value) => !value || /^\S+@\S+\.\S+$/.test(value),
        message: 'Contact email must be valid'
      },
      default: ''
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Closed'],
      default: 'Open'
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false }
  }
);

export default mongoose.model('JobRequest', jobRequestSchema);