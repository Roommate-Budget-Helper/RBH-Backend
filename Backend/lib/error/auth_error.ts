import BaseError from './base_error';

export enum AuthErrorType {
    NameInUse,
    NameNotValid,
    UsernameNotExists,
    WrongPassword
}

export class AuthError extends BaseError {
    public constructor(code: number, exp?: string) {
        super(code, AuthErrorType[code], exp);
        Object.setPrototypeOf(this, Object.assign(AuthError.prototype, BaseError.prototype));
        this.name = this.constructor.name;
    }
}
