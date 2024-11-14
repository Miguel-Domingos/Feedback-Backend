import vine from '@vinejs/vine'

export const userValidator = vine.compile(
  vine.object({
    userID: vine.number(),
  })
)

export const createUserValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()

        return !match
      }),
    role: vine.string(),
    description: vine.string().optional(),
    password: vine.string().minLength(8),
  })
)
