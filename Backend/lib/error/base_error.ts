interface IJsonError {
  code: number;
  message: string;
  explanation?: string;
  stack?: string[];
}

export default class BaseError extends Error {
  public code: number;
  public message: string;
  public explanation: string | undefined;

  public constructor(code: number, message: string, explanation?: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
    Error.captureStackTrace(this, BaseError);
    this.code = code;
    this.message = message;
    this.explanation = explanation;
  }
}
