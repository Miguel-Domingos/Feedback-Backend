/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UserController = () => import('#controllers/user_controller')
const CommentController = () => import('#controllers/comment_controller')

router
  .group(() => {
    router
      .group(() => {
        // Welcome Route
        router.get('/', async () => {
          return {
            greetings: 'Welcome to Feedback api',
          }
        })

        // Auth Routes
        router
          .group(() => {
            router.post('/login', [AuthController, 'login']).as('auth_login')
            router
              .delete('/logout', [AuthController, 'logout'])
              .as('auth_logout')
              .use(middleware.auth())
          })
          .prefix('/auth')

        // Comment Routes
        router
          .group(() => {
            router.post('', [CommentController, 'createComment']).as('comment_create')
            router.delete('', [CommentController, 'deleteComment']).as('comment_delete')
          })
          .prefix('/comment')
          .use(middleware.auth())

        // User Routes
        router
          .group(() => {
            router.get('/all', [UserController, 'geAllUser']).as('getAll_user')
            router.post('/create', [UserController, 'create']).as('create_user')
            router.get('/:id', [UserController, 'getUser']).as('get_user')
          })
          .prefix('/user')
      })
      .prefix('/v1')
  })
  .prefix('/api')
