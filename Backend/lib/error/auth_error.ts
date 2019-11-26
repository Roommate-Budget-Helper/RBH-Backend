import BaseError from "./base_error";

export enum AuthErrorType {
  NameInUse = 50001,
  NameNotValid = 50002
}

export class AuthError extends BaseError {
  public constructor(code: number, exp?: string) {
    super(code, AuthErrorType[code], exp);
    Object.setPrototypeOf(
      this,
      Object.assign(AuthError.prototype, BaseError.prototype)
    );
    this.name = this.constructor.name;
  }
}
