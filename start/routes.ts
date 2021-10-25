/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/login', 'AuthController.loginForm').as('login.show')
Route.post('/login', 'AuthController.login').as('login')

Route.get('/register', 'AuthController.registerForm').as('register.show')
Route.post('/register', 'AuthController.register').as('register')

Route.group(() => {
  Route.get('/', 'TasksController.index').as('home')
  Route.post('/tasks/store', 'TasksController.store').as('tasks.store')
  Route.put('/tasks/update-status', 'TasksController.changeStatus').as('tasks.update.status')
  Route.delete('/tasks/delete/:id', 'TasksController.destroy').as('tasks.destroy')

  Route.post('/logout', 'AuthController.logout').as('logout')
}).middleware('auth')
