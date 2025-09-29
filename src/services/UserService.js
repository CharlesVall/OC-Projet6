const userRepository = require('../repositories/UserRepository')

class UserService {
  async getAllUser() {
    const userList = await userRepository.findAll()
    return userList
  }

  async deleteUserByEmail(email) {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const existingUser = await userRepository.findByEmail(email);

    if (!isValidEmail) throw new Error('Email is not valid')
    if (!existingUser) throw new Error('Email do not exist');

    const deletedUser = await userRepository.deleteByEmail(email)
    return deletedUser
  }
}

module.exports = new UserService();