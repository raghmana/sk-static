import dbConnect from '../../../lib/dbConnect';
import Category from '../../../models/Category';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const categories = await Category.find({}).sort({ name: 1 });
        res.status(200).json(categories);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
      }
      break;

    case 'POST':
      try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
      } catch (error) {
        res.status(400).json({ error: 'Failed to create category' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}