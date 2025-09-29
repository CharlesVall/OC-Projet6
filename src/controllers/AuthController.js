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

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { token, userId } = await authService.login({ email, password });

      res.status(200).json({
        userId,
        token
      })
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  }
}

module.exports = new AuthController();