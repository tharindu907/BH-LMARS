const router = require('express').Router();
const User = require('./models/user.model');

router.post('/', async (req, res) => {  // This way it becomes /login
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      if (password === user.password) {
        res.json({ username: user.username, role: user.role });
      } else {
        return res.status(400).json({ message: 'Invalid password' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid username' });
    }
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` });
  }
});

module.exports = router;
