

// INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
// ACCOUNT_NOT_FOUND: 'ACCOUNT_NOT_FOUND',
// EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
// PROVIDER_MISTMATCH: 'PROVIDER_MISTMATCH',
// INVALID_TOKEN: 'INVALID_TOKEN',
// EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
// USER_REGISTERATION_FAILED: 'USER_REGISTERATION_FAILED',
// USERNAME_ALREADY_EXISTS: 'USERNAME_ALREADY_EXISTS',

export class AuthRequiredError extends Error {
    constructor(message = 'You must be logged in to access this page.') {
        super(message);
        this.name = 'AuthRequiredError'
    }
}

export class InvalidCredentialError extends Error {
    constructor(message = 'Invalid email or password. Please try again.') {
        super(message);
        this.name = 'InvalidCredentialError'
    }
}

export class AccountNotFoundError extends Error {
    constructor(message = 'No account found with the provided credentials. Please check your username or email and try again.') {
        super(message);
        this.name = 'AccountNotFoundError'
    }
}

export class EmailNotVerifiedError extends Error {
    constructor(message = 'Email not verified. Please check your email for a verification link.') {
        super(message);
        this.name = 'EmailNotVerifiedError'
    }
}

export class EmailAlreadyExistsError extends Error {
    constructor(message = 'The email address you provided is already associated with an existing account. Please use a different email address or log in with your existing account.') {
        super(message);
        this.name = 'EmailAlreadyExistsError'
    }
}

export class ProviderMismatchError extends Error {
    constructor(message = 'This account was registered using a different authentication method. Please log in using your original provider.') {
        super(message);
        this.name = 'ProviderMismatchError'
    }
}

export class InvalidTokenError extends Error {
    constructor(message = 'The token you provided is invalid or has expired. Please try again or request a new token.') {
        super(message);
        this.name = 'InvalidTokenError'
    }
}


export class UserRegistrationFailedError extends Error {
    constructor(message = 'An error occurred while registering your account. Please try again.') {
        super(message);
        this.name = 'UserRegistrationFailedError'
    }
}

export class UsernameAlreadyExistsError extends Error {
    constructor(message = 'The username you provided is already taken. Please choose a different username.') {
        super(message);
        this.name = 'UsernameAlreadyExistsError'
    }
}

export class ServerError extends Error {
    constructor(message = 'An error occurred while processing your request. Please try again.') {
        super(message);
        this.name = 'ServerError'
    }
}









