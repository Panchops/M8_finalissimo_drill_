const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { User } = require('./app/models');
require('dotenv').config();
const util = require('util');
const { verifySingUp, verifyToken } = require('./app/middleware');
const userRoutes = require('./app/routes/user.routes');
const bootcampRoutes = require('./app/routes/bootcamp.routes');

const PORT = process.env.PORT;

app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', verifyToken, userRoutes);
app.use('/api/bootcamp', bootcampRoutes);

app.post('/api/signup', verifySingUp, async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = await util.promisify(jwt.sign)(
      {
        userId: user.id,
        email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: '5m',
      }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const user = await User.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await util.promisify(jwt.sign)(
        {
          userId: user.id,
          email,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: '2m',
        }
      );

      res.status(200).json({ token, message: 'Authenticated' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

