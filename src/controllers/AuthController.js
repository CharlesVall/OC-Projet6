const authService = require('../services/AuthService')

class AuthController {
  async signup(req, res) {
    try {
      const { email, password } = req.body;

      const user = await authService.signup({ email, password })

      res.status(201).json({
        message: "User created",
      })
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  }
}

module.exports = new AuthController();