import dbConnect from '../../../lib/dbConnect';
import MenuItem from '../../../models/MenuItem';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const menuItem = await MenuItem.findById(id);
        if (!menuItem) {
          return res.status(404).json({ error: 'Menu item not found' });
        }
        res.status(200).json(menuItem);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch menu item' });
      }
      break;

    case 'PUT':
      try {
        const menuItem = await MenuItem.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!menuItem) {
          return res.status(404).json({ error: 'Menu item not found' });
        }
        res.status(200).json(menuItem);
      } catch (error) {
        res.status(400).json({ error: 'Failed to update menu item' });
      }
      break;

    case 'DELETE':
      try {
        const menuItem = await MenuItem.findByIdAndDelete(id);
        if (!menuItem) {
          return res.status(404).json({ error: 'Menu item not found' });
        }
        res.status(200).json({ message: 'Menu item deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete menu item' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}