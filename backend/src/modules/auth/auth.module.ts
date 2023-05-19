import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { LoginCommand } from "./commands/login.command";
import { RegisterCommand } from "./commands/register.command";
import { AuthController } from "./auth.controller";

@Module({
  imports: [InfrastructureModule],
  controllers: [AuthController],
  providers: [LoginCommand, RegisterCommand],
  exports: [],
})
export class AuthModule {}
