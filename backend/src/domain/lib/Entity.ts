import { RemoveMethods } from "./typings";

export class Entity<T> {
  protected constructor(entity: RemoveMethods<T>) {
    Object.assign(this, entity);
  }
}