const router = require('express').Router();
let Teacher = require('./models/teacher.model');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find user by username
      const user = await Teacher.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // Check if password matches
      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
    } catch (err) {
      res.status(500).json({ message: `Error: ${err}` });
    }
  });

  module.exports = router;