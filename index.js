const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

app.post('/api/v1/rooms-types', authenticate, authorize('admin'), async (req, res) => {
  // code from last week
  try {
    const { name } = req.body;
    const roomType = await roomType.create({ name });
    res.status(201).json(roomType);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
