import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { HealthController } from "./health.controller";

@Module({
  imports: [InfrastructureModule],
  controllers: [HealthController],
  providers: [],
})
export class HealthModule {}
