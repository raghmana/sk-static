import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    ref: 'Category'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  forMenu: { 
    type: Boolean, 
    default: true 
  },
  forCatering: { 
    type: Boolean, 
    default: false 
  }
}, {
  timestamps: true
});

export default mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);