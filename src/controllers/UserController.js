const userService = require('../services/UserService')

class UserController {
  async getUserList(req, res) {
     try {
      const userList = await userService.getUserList()

      res.status(201).json({
        userList
      })
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  }

  async deleteUserByEmail(req, res) {
    try {
      const {email} = req.body;

      const user = await userService.deleteUserByEmail(email)

      res.status(201).json({
        message: "User deleted",
      })
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  }
}

module.exports = new UserController();