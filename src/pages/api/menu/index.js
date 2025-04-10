import dbConnect from '../../../lib/dbConnect';
import MenuItem from '../../../models/MenuItem';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const menuItems = await MenuItem.find({});
        res.status(200).json(menuItems);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch menu items' });
      }
      break;

    case 'POST':
      try {
        const menuItem = await MenuItem.create(req.body);
        res.status(201).json(menuItem);
      } catch (error) {
        res.status(400).json({ error: 'Failed to create menu item' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}