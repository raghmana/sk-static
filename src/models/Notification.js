import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  enabled: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
  backgroundColor: {
    type: String,
    default: '#ff0000'
  },
  textColor: {
    type: String,
    default: '#ffffff'
  }
}, {
  timestamps: true
});

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);