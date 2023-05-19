import { Body, Controller, Get, Post } from "@nestjs/common";
import { RegisterCommand } from "./commands/register.command";
import { LoginCommand } from "./commands/login.command";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly registerCommand: RegisterCommand,
    private readonly loginCommand: LoginCommand
  ) {}

  @Post("login")
  login(@Body("email") email: string, @Body("password") password: string) {
    return this.loginCommand.execute(email, password);
  }

  @Post("register")
  register(
    @Body("email") email: string,
    @Body("password") password: string,
    @Body("role") role: string) {
    return this.registerCommand.execute(email, password, role);
  }
}
