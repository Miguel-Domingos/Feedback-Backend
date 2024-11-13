import vine from '@vinejs/vine'

const passwordValidator = vine.string().minLength(8)

export const registerValidator = vine.compile(
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
    password: passwordValidator,
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: passwordValidator,
  })
)
