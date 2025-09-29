const userRepository = require('../repositories/UserRepository')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  async signup({ email, password }) {

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) throw new Error('Email is not valid')
    
    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) throw new Error('Email already used');

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await userRepository.create({ email, password: hashedPassword })
    return newUser
  }
  
  async login({ email, password}) {
    const user = await userRepository.findUserByEmail(email);
    if (!user) throw new Error('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid email or password');

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { token, userId: user._id };
  }
}

module.exports = new AuthService();