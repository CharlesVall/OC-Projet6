const User = require('../models/User');

class UserRepository {
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  async findUserById(id) {
    return await User.findById(id);
  }

  async findAllUser() {
    return await User.find();
  }

  async deleteUserByEmail(email) {
    return await User.deleteOne({ email })
  }  
  async deleteUserById(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UserRepository();