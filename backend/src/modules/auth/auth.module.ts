import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { IdentityManagerService } from "./services/identity-manager.service";

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [IdentityManagerService],
  exports: [IdentityManagerService],
})
export class AuthModule {}
