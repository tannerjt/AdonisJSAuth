'use strict'

class AuthenticatedController {
    async logout({auth, response, session}) {
        await auth.logout()

        session.flash({
            notification: {
                type: 'info',
                message: 'You have successfully logged out.  See you next time!'
            }
        })

        return response.redirect('/login')
    }
}

module.exports = AuthenticatedController
