import { Event } from "./Event";
import { RemoveMethods } from "./typings";

export class Entity<T> {
  public readonly events: Event[];

  constructor(entity: RemoveMethods<T>) {
    Object.assign(this, entity);
    this.events = [];
  }
}