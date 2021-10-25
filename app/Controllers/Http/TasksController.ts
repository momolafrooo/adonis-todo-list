import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import StoreTaskValidator from 'App/Validators/StoreTaskValidator'

export default class TasksController {
  public async index({ view, auth, request }: HttpContextContract) {
    const userId = auth.user?.id
    const page = request.input('page')
    const search = request.input('search')
    const limit = 10

    if (search) {
      var tasks = await Task.query()
        .where('user_id', userId || '')
        .where('title', 'LIKE', `%${search}%`)
        .orderBy('id', 'desc')
        .paginate(page, limit)
    } else {
      var tasks = await Task.query()
        .where('user_id', userId || '')
        .orderBy('id', 'desc')
        .paginate(page, limit)
    }

    return view.render('home', { tasks })
  }

  public async store({ request, session, response, auth }: HttpContextContract) {
    const payload = await request.validate(StoreTaskValidator)

    await auth.user?.related('tasks').create(payload)

    session.flash('success', 'Task created successfully !')

    return response.redirect('back')
  }

  public async changeStatus({ request, session, response }: HttpContextContract) {
    const id = request.input('id')
    const status = request.input('status')

    const task = await Task.findOrFail(id)

    await task.merge({ status }).save()

    session.flash('success', 'Task updated successfully !')

    return response.redirect('back')
  }

  public async destroy({ session, response, params }: HttpContextContract) {
    const id = params.id

    const task = await Task.findOrFail(id)

    await task.delete()

    session.flash('success', 'Task deleted successfully !')

    return response.redirect('back')
  }
}
