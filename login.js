const router = require('express').Router();
let Teacher = require('./models/teacher.model');
let Admin = require('./models/admin.model');
let Accountant = require('./models/accountant.model');
let Cashier = require('./models/cashier.model');

const userTypeModels = {
  Admin: Admin,
  Accountant: Accountant,
  Teacher: Teacher,
  Staff: Cashier
};

router.route('/').post(async (req, res) => {
    const { usertype, username, password } = req.body;
    
    try {
      const UserType = userTypeModels[usertype];
      if (!UserType) {
        return res.status(400).json({ message: 'Invalid user type' });
      }
  
      const user = await UserType.findOne({ username });
  
      if (user) {
        if (password === user.password) {
          res.json(user);          
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