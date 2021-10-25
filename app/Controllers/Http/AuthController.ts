import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
  public async registerForm({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async loginForm({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async register({ request, response, session }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    await User.create(payload)

    session.flash('success', 'User successfully registered !')

    return response.redirect().toRoute('login.show')
  }

  public async login({ request, response, session, auth }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)

    try {
      await auth.attempt(email, password)
      session.flash('success', 'User successfully logged In !')

      return response.redirect().toRoute('home')
    } catch {
      session.flash('error', 'Invalid credentials !')

      return response.redirect('back')
    }
  }

  public async logout({ response, session, auth }: HttpContextContract) {
    await auth.logout()

    session.flash('success', 'User successfully logged Out !')

    return response.redirect().toRoute('login')
  }
}
