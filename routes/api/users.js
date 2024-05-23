const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// @route POST api/users
// @desc Register user
// @access Public

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = User.finOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg 'User already exist' }] });
    }
    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      'secret', // Replace 'secret' with your JWT secret
      { expiresIn: 360000 }
      (err, token) => {
        if (err) throw err;
	res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
});

module.exports = router;