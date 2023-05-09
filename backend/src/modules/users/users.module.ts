import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { UsersController } from "./users.controller";
import { GetUserByIdQuery } from "./queries/get-by-id.query";

@Module({
  imports: [InfrastructureModule],
  controllers: [UsersController],
  providers: [GetUserByIdQuery],
})
export class UsersModule {}
