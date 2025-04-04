export class Result<T, E extends Error> {
  #ok: T | null = null;
  #err: E | null = null;

  constructor(ok: T | null, err: E | null) {
    if (!ok === !err) {
      throw new Error("Result must have either value or Error")
    }

    if (ok !== null) {
      this.#ok = ok;
    }

    if (err !== null) {
      this.#err = err as E;
    }
  }

  unwrap(): T {
    if (this.isOk()) {
      return this.#ok as T;
    }

    if (this.isErr()) {
      throw this.#err as E;
    }

    throw new Error("Unknown Error");
  }
  isOk(): this is Result<T, never> {
    return this.#ok !== null;
  }
  isErr(): this is Result<never, E> {
    return this.#err !== null;
  }

  getErr(): E | null {
    if (this.isErr()) {
      return this.#err;
    }
    return null;
  }
}

export function Ok<T, E extends Error>(v: T) {
  return new Result<T, E>(v, null);
}

export function Err<T, E extends Error>(v: E | string) {
  if (typeof v === "string") {
    return new Result<T, E>(null, new Error(v) as E)
  }
  return new Result<T, E>(null, v)
}

export class InvalidTypeError extends Error {
}
