import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { StudentsController } from "./students.controller";
import { GetAllStudentsQuery } from "./queries/get-all.query";

@Module({
  imports: [InfrastructureModule],
  controllers: [StudentsController],
  providers: [GetAllStudentsQuery],
})
export class StudentsModule {}
