import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) => /^\S+@\S+\.\S+$/.test(v),
        message: 'Invalid email'
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model('User', userSchema);