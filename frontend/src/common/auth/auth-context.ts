import coachesService from "api/coaches.service";
import studentsService from "api/students.service";
import { Coach } from "domain/user/coach/coach";
import { Student } from "domain/user/student";
import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";

export class Auth {
  authenticatedCoach?: Coach;
  authenticatedStudent?: Student;
  isAuthenticated: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async initialize() {
    if (Auth.getToken()) {
      const email = Auth.getToken()!.split(":")[0];

      const coach = await coachesService.getById(email);
      runInAction(() => {
        if (coach) {
          this.authenticatedCoach = coach;
          this.isAuthenticated = true;
        }
      });

      const student = await studentsService.getById(email);
      runInAction(() => {
        if (student) {
          this.authenticatedStudent = student;
          this.isAuthenticated = true;
        }
      });
    }
  }

  async login(email: string, password: string) {
    localStorage.setItem("accessToken", `${email}:${password}`);
    await this.initialize();
  }

  async logout() {
    localStorage.removeItem("accessToken");
    window.location.reload();
  }

  static getToken() {
    return localStorage.getItem("accessToken");
  }

  isCoach() {
    return this.authenticatedCoach;
  }

  authenticatedUser(): Student | Coach {
    return (this.authenticatedStudent ?? this.authenticatedCoach)!;
  }
}

export const auth = new Auth();

export const AuthContext = createContext(auth);
