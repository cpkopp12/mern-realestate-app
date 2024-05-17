import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  // hash password
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: 'user created succesfully' });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  // read req.body
  const { email, password } = req.body;

  try {
    // validate email
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found.'));
    // check password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials.'));
  } catch (error) {
    next(error);
  }
};
