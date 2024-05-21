export class AuthRequiredError extends Error {

    constructor(message = "Auth is required to access this page") {
        super('Auth required')
        this.name = 'AuthRequiredError'
    }
}



