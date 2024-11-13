import vine from '@vinejs/vine'

export const userValidator = vine.compile(
  vine.object({
    userID: vine.number(),
  })
)
