import dbConnect from '../../../lib/dbConnect';
import Category from '../../../models/Category';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const category = await Category.findById(id);
        if (!category) {
          return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch category' });
      }
      break;

    case 'PUT':
      try {
        const category = await Category.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!category) {
          return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
      } catch (error) {
        res.status(400).json({ error: 'Failed to update category' });
      }
      break;

    case 'DELETE':
      try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
          return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}