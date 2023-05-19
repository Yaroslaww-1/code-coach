import coachesService from "api/coaches.service";
import studentsService from "api/students.service";
import usersService from "api/users.service";
import { Coach } from "domain/user/coach/coach";
import { Student } from "domain/user/student";
import { User } from "domain/user/user";
import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";

export class Auth {
  authenticatedUser?: User;
  authenticatedCoach?: Coach;
  authenticatedStudent?: Student;

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

      if (user.isCoach()) {
        const coach = await coachesService.getById(email);
        runInAction(() => {
          this.authenticatedCoach = coach!;
        });
      } else {
        const student = await studentsService.getById(email);
        runInAction(() => {
          this.authenticatedStudent = student!;
        });
      }
    }
  }

  isAuthenticated() {
    return this.authenticatedUser;
  }

  login(user: User, password: string) {
    localStorage.setItem("accessToken", `${user.email}:${password}`);
    this.authenticatedUser = user;
  }

  static getToken() {
    return localStorage.getItem("accessToken");
  }

  isCoach() {
    return this.authenticatedCoach;
  }
}

export const auth = new Auth();

export const AuthContext = createContext(auth);
