import { Entity } from "src/domain/lib/Entity";

export interface Repository<E extends Entity<E>> {
  save(entity: E): Promise<void>;
}
