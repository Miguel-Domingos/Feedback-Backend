import Comment from '#models/comment'
import { createCommentValidator, deleteCommentValidator } from '#validators/comment'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentController {
  async createComment({ request }: HttpContext) {
    const data = await request.validateUsing(createCommentValidator)

    await Comment.create(data)

    return { message: 'success' }
  }

  async deleteComment({ request, auth }: HttpContext) {
    const { comment_id } = await request.validateUsing(deleteCommentValidator)

    const comment = await Comment.find(comment_id)

    console.log()

    if (comment?.user_id === auth.user?.id) {
      console.log('funciona')
      await comment?.delete()
    }

    return { message: 'success' }
  }
}
