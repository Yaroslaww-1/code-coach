import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class Auth {
  authenticatedUser: string = "";

  constructor() {
    makeAutoObservable(this);
    if (Auth.getToken()) {
      this.authenticatedUser = Auth.getToken()!.split(":")[0];
    }
  }

  isAuthenticated() {
    return this.authenticatedUser !== "";
  }

  login(email: string, password: string) {
    localStorage.setItem("accessToken", `${email}:${password}`);
    this.authenticatedUser = email;
  }

  static getToken() {
    return localStorage.getItem("accessToken");
  }
}

export const auth = new Auth();

export const AuthContext = createContext(auth);
