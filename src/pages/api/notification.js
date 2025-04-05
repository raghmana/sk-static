import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'notification.json');

const ensureFileExists = () => {
  const dirPath = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({
      enabled: false,
      message: '',
      backgroundColor: '#ff0000',
      textColor: '#ffffff'
    }, null, 2));
  }
};

export default function handler(req, res) {
  ensureFileExists();

  try {
    switch (req.method) {
      case 'GET':
        const data = fs.readFileSync(filePath, 'utf-8');
        res.status(200).json(JSON.parse(data));
        break;

      case 'POST':
        const newSettings = req.body;
        fs.writeFileSync(filePath, JSON.stringify(newSettings, null, 2));
        res.status(200).json(newSettings);
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Notification API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}