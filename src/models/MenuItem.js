import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Breakfast', 'Appetizers', 'Curries', 'Vegetarian', 'Non-Vegetarian', 'Rice']
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);