import dbConnect from '../../../lib/dbConnect';
import Notification from '../../../models/Notification';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        let notification = await Notification.findOne({});
        if (!notification) {
          notification = await Notification.create({
            enabled: false,
            message: '',
            backgroundColor: '#ff0000',
            textColor: '#ffffff'
          });
        }
        res.status(200).json(notification);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notification settings' });
      }
      break;

    case 'PUT':
      try {
        let notification = await Notification.findOne({});
        if (!notification) {
          notification = await Notification.create(req.body);
        } else {
          notification = await Notification.findOneAndUpdate({}, req.body, {
            new: true,
            runValidators: true
          });
        }
        res.status(200).json(notification);
      } catch (error) {
        res.status(400).json({ error: 'Failed to update notification settings' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}