import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    await User.create(data)

    return { message: 'success' }
  }

  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)

    return {
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token: {
          type: token.toJSON().type,
          value: token.toJSON().token,
        },
      },
    }
  }

  async logout({ auth }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user?.currentAccessToken.identifier)

    return { message: 'success' }
  }
}
