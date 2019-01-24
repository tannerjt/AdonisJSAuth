'use strict'
const User = use('App/Models/User')
const Hash = use('Hash')

class LoginController {
    showLoginForm({ view }) {
        return view.render('auth.login')
    }

    async login ({ request, auth, response, session }) {
        // get form data
        const { email, password, remember } = request.all()

        // retrieve user based on the form data
        const user = await User.query()
            .where('email', email)
            .where('is_active', true)
            .first()

        // verify password
        if(user) {
            const passwordVerified = await Hash.verify(password, user.password)
            //login user
            if(passwordVerified) {
                await auth.remember(!!remember).login(user)

                return response.route('home')
            }
        }

        // display error message
        session.flash({
            notification: {
                type: 'danger',
                message: `We couldn't verify you're credentials.  Make sure you have confirmed your email address.`
            }
        })

        return response.redirect('back')
    }
}

module.exports = LoginController
