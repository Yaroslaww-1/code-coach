import { RemoveMethods } from "./typings";

export class ValueObject<T> {
  protected constructor(valueObject: RemoveMethods<T>) {
    Object.assign(this, valueObject);
  }
}