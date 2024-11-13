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

router.get('/', async () => {
  return {
    greetings: 'Welcome to Feedback api',
  }
})

// Auth Routes
router.post('/register', [AuthController, 'register']).as('auth_register')
router.post('/login', [AuthController, 'login']).as('auth_login')
router.delete('/logout', [AuthController, 'logout']).as('auth_logout').use(middleware.auth())

// Comment Routes
router
  .group(() => {
    router.post('', [CommentController, 'createComment']).as('comment_create')
    router.delete('', [CommentController, 'deleteComment']).as('comment_delete')
  })
  .prefix('/comment')
  .use(middleware.auth())

// User(Company) Route
router.get('/user/:id', [UserController, 'getUser']).as('get_user')
