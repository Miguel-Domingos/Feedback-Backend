import User from '#models/user'
import { loginValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginValidator)
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user)

      return {
        status: 200,
        message: 'success',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            description: user.description,
          },
          token: {
            type: token.toJSON().type,
            value: token.toJSON().token,
          },
        },
        error: null,
      }
    } catch (error) {
      return {
        status: 401,
        message: 'error',
        data: null,
        error: error.messages ? error.messages[0].message : error.message,
      }
    }
  }

  async logout({ auth }: HttpContext) {
    try {
      const user = auth.user!
      await User.accessTokens.delete(user, user?.currentAccessToken.identifier)

      return {
        status: 200,
        message: 'success',
        data: null,
        error: null,
      }
    } catch (error) {
      return {
        status: 401,
        message: 'error',
        data: null,
        error: error.messages ? error.messages[0].message : error.message,
      }
    }
  }
}
