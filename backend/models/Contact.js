
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    match: [/^\d{10}$/, "Phone must be a 10-digit number"], // India example
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    minlength: [5, "Message should be at least 5 characters"],
    maxlength: [500, "Message cannot exceed 500 characters"],
    trim: true,
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

export default mongoose.model("Contact", contactSchema);
