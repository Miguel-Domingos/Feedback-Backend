import Comment from '#models/comment'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  async getUser({ params }: HttpContext) {
    const user = await User.find(params.id)
    // userID = params.id
    const comments = await Comment.query().from('comments').select('*').where({ company_id: 1 })

    return {
      data: {
        user: {
          name: user?.name,
          email: user?.email,
          description: user?.description,
          id: user?.id,
          role: user?.role,
        },
        comments: comments,
      },
    }
  }
}
