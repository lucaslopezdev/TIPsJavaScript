import { userModel } from '../model/user.js'

export class userController {
  static async login(req, res) {
    try {
      const { email, password } = req.body
      const token = await userModel.login({ email, password })
      return res.status(200).send(token)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async signup(req, res) {
    try {
      const { email, password } = req.body
      const user = await userModel.signup({ email, password })
      console.log(user)

      return res.status(200).json(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async profile(req, res) {
    try {
      const user = req.user
      const data = await userModel.profile({user})
      return res.status(200).json(data)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

  static async users(req, res) {
    try {
      const users = await userModel.users()

      return res.status(200).json(users)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}
