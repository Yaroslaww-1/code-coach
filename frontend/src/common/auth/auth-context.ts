import usersService from "api/users.service";
import { User } from "domain/user/user";
import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";

export class Auth {
  authenticatedUser?: User;

  constructor() {
    makeAutoObservable(this);
  }

  async initialize() {
    if (Auth.getToken()) {
      const email = Auth.getToken()!.split(":")[0];
      const user = await usersService.getById(email);
      runInAction(() => {
        this.authenticatedUser = user;
      });
    }
  }

  isAuthenticated() {
    return this.authenticatedUser !== null;
  }

  login(user: User, password: string) {
    localStorage.setItem("accessToken", `${user.email}:${password}`);
    this.authenticatedUser = user;
  }

  static getToken() {
    return localStorage.getItem("accessToken");
  }

  isCoach() {
    return this.authenticatedUser!.role.toLowerCase() === "coach";
  }
}

export const auth = new Auth();

export const AuthContext = createContext(auth);
