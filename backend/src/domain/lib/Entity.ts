import { RemoveMethods } from "./typings";

export class Entity<T> {
  public readonly events: Event[];

  protected constructor(entity: RemoveMethods<T>) {
    Object.assign(this, entity);
    this.events = [];
  }
}