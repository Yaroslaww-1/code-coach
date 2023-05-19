import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { StudentsController } from "./students.controller";
import { GetAllStudentsQuery } from "./queries/get-all.query";
import { GetStudentByIdQuery } from "./queries/get-by-id.query";

@Module({
  imports: [InfrastructureModule],
  controllers: [StudentsController],
  providers: [GetAllStudentsQuery, GetStudentByIdQuery],
})
export class StudentsModule {}
