import fs from 'fs';
import path from 'path';

// Helper function to resolve the menu path
const getMenuPath = () => {
  return path.join(process.cwd(), 'data', 'menu.json');
};

// Ensure the data directory and menu.json exist
const ensureMenuFileExists = () => {
  const dirPath = path.join(process.cwd(), 'data');
  const filePath = getMenuPath();
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  }
};

export default function handler(req, res) {
  ensureMenuFileExists();
  const menuPath = getMenuPath();

  try {
    switch (req.method) {
      case 'GET':
        const data = fs.readFileSync(menuPath, 'utf-8');
        const menuItems = JSON.parse(data);
        res.status(200).json(menuItems);
        break;

      case 'POST':
        const newItem = {
          id: Date.now().toString(),
          ...req.body
        };
        const currentItems = JSON.parse(fs.readFileSync(menuPath, 'utf-8'));
        const updatedItems = [...currentItems, newItem];
        fs.writeFileSync(menuPath, JSON.stringify(updatedItems, null, 2));
        res.status(201).json(newItem);
        break;

      case 'PUT':
        const itemsToUpdate = JSON.parse(fs.readFileSync(menuPath, 'utf-8'));
        const index = itemsToUpdate.findIndex(item => item.id === req.body.id);
        
        if (index === -1) {
          return res.status(404).json({ error: 'Item not found' });
        }
        
        itemsToUpdate[index] = { ...itemsToUpdate[index], ...req.body };
        fs.writeFileSync(menuPath, JSON.stringify(itemsToUpdate, null, 2));
        res.status(200).json(itemsToUpdate[index]);
        break;

      case 'DELETE':
        const items = JSON.parse(fs.readFileSync(menuPath, 'utf-8'));
        const filteredItems = items.filter(item => item.id !== req.query.id);
        fs.writeFileSync(menuPath, JSON.stringify(filteredItems, null, 2));
        res.status(204).end();
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error processing menu request:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}