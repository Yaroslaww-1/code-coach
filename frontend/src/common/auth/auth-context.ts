import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class Auth {
  authenticatedUser: string = "abe.ryland@gmail.com";

  constructor() {
    makeAutoObservable(this);
  }
}

export const auth = new Auth();

export const AuthContext = createContext(auth);
