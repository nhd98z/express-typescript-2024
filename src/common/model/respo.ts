export class Respo<T = null> {
  readonly success: boolean;
  readonly message: string;
  readonly data: T;

  private constructor(success: boolean, message: string, data: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success<T>(message: string, data: T) {
    return new Respo(true, message, data);
  }

  static failure<T>(message: string, data: T) {
    return new Respo(false, message, data);
  }
}
