import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { GetAllFairsQuery } from "./queries/get-all-fairs.query";
import { FairsController } from "./fairs.controller";

@Module({
  imports: [InfrastructureModule],
  controllers: [FairsController],
  providers: [GetAllFairsQuery],
})
export class FairsModule {}
