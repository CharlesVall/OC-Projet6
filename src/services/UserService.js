const userRepository = require('../repositories/UserRepository')

class UserService {
  async getUserList() {
    const userList = await userRepository.findAllUser()
    return userList
  }

  async deleteUserByEmail(email) {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const existingUser = await userRepository.findUserByEmail(email);

    if (!isValidEmail) throw new Error('Email is not valid')
    if (!existingUser) throw new Error('Email do not exist');

    const deletedUser = await userRepository.deleteUserByEmail(email)
    return deletedUser
  }
}

module.exports = new UserService();