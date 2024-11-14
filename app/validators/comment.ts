import vine from '@vinejs/vine'

export const createCommentValidator = vine.compile(
  vine.object({
    content: vine.string().minLength(1),
    company_id: vine.number(),
  })
)

export const deleteCommentValidator = vine.compile(
  vine.object({
    comment_id: vine.number(),
  })
)
