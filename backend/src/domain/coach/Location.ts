import { ValueObject } from "../lib/ValueObject";

export class Location extends ValueObject<Location> {
  public readonly country: string;
  public readonly city: string;
  
  public static createNew(country: string, city: string) {
    return new Location({ city, country })
  }
}