import dbConnect from '../../../lib/dbConnect';
import MenuItem from '../../../models/MenuItem';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        // const menuItems = await MenuItem.find({})
        // .sort({ category: 1 })
        // .select('name description price category isAvailable forMenu forCatering');
        // res.status(200).json(menuItems);
        const menuItems = await MenuItem.find({}).lean();
        console.log('Fetched menu items:', menuItems); // Debug log
        res.status(200).json(menuItems);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch menu items' });
      }
      break;

    case 'POST':
      try {
        // Validate required fields
        const { name, price, category, forMenu, forCatering } = req.body;
        console.log('Creating menu item:', req.body); // Debug log
        if (!name || !price || !category) {
          return res.status(400).json({ 
            error: 'Missing required fields',
            details: {
              name: !name ? 'Name is required' : null,
              price: !price ? 'Price is required' : null,
              category: !category ? 'Category is required' : null
            }
          });
        }

        // Create new menu item
        const menuItem = await MenuItem.create({
          name,
          description: req.body.description || '',
          price: parseFloat(price),
          category,
          isAvailable: req.body.isAvailable ?? true,
          forMenu: forMenu ?? true,
          forCatering: forCatering ?? false
        });

        console.log('Created menu item:', menuItem); // Debug log
        res.status(201).json(menuItem);
      } catch (error) {
        console.error('Menu item creation error:', error);
        res.status(400).json({ 
          error: 'Failed to create menu item',
          details: error.message 
        });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}