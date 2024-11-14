/* eslint-disable @typescript-eslint/naming-convention */
import Comment from '#models/comment'
import { createCommentValidator, deleteCommentValidator } from '#validators/comment'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentController {
  async createComment({ request, auth }: HttpContext) {
    try {
      const data = await request.validateUsing(createCommentValidator)
      const authenticatedUser = await auth.authenticate()
      await Comment.create({
        ...data,
        user_id: authenticatedUser.id,
        author: authenticatedUser.name,
      })

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

  async deleteComment({ request, auth }: HttpContext) {
    const { comment_id } = await request.validateUsing(deleteCommentValidator)

    const comment = await Comment.find(comment_id)

    if (comment?.user_id === auth.user?.id) {
      await comment?.delete()
    }

    return { message: 'success' }
  }
}
