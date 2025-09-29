const userRepository = require('../repositories/UserRepository')
const bcrypt = require('bcrypt');

class AuthService {
  async signup({ email, password }) {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const existingUser = await userRepository.findByEmail(email);

    if (!isValidEmail) throw new Error('Email is not valid')
    if (existingUser) throw new Error('Email already used');

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await userRepository.create({ email, password: hashedPassword })
    return newUser
  }
}

module.exports = new AuthService();