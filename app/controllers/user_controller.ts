import Comment from '#models/comment'
import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  async getUser({ params }: HttpContext) {
    try {
      const user = await User.find(params.id)
      const userID = params.id
      const comments = await Comment.query()
        .from('comments')
        .select('*')
        .where({ company_id: userID })
        .preload('user')

      return {
        status: 200,
        message: 'success',
        data: {
          user: {
            name: user?.name,
            email: user?.email,
            description: user?.description,
            id: user?.id,
            role: user?.role,
            comments: comments,
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

  async create({ request }: HttpContext) {
    try {
      const data = await request.validateUsing(createUserValidator)
      await User.create(data)

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

  async geAllUser({}: HttpContext) {
    try {
      const users = await User.query().from('users').select('*').where({ role: 'company' })

      return {
        status: 200,
        message: 'success',
        data: {
          users: users,
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
}
