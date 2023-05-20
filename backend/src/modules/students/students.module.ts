import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { StudentsController } from "./students.controller";
import { GetAllStudentsQuery } from "./queries/get-all.query";
import { GetStudentByIdQuery } from "./queries/get-by-id.query";
import { EditStudentCommand } from "./commands/edit-student.command";

@Module({
  imports: [InfrastructureModule],
  controllers: [StudentsController],
  providers: [GetAllStudentsQuery, GetStudentByIdQuery, EditStudentCommand],
})
export class StudentsModule {}
