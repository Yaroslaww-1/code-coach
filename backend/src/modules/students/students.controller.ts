import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { GetAllStudentsQuery } from "./queries/get-all.query";
import { GetStudentByIdQuery } from "./queries/get-by-id.query";
import { EditStudentCommand } from "./commands/edit-student.command";
import { AuthenticatedUser } from "../auth/decorators/authenticated-user.decorator";

@Controller("students")
export class StudentsController {
  constructor(
    private readonly getAllStudents: GetAllStudentsQuery,
    private readonly getStudentByIdQuery: GetStudentByIdQuery,
    private readonly editStudentCommand: EditStudentCommand
  ) {}

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.getStudentByIdQuery.execute(id);
  }

  @Get()
  getAll() {
    return this.getAllStudents.execute();
  }

  @Post("self")
  edit(
    @AuthenticatedUser() authenticatedStudent: string,
    @Body("name") name: string,
    @Body("languages") languages: string[],
    @Body("programmingLanguages") programmingLanguages: string[],
    @Body("location") location: any
  ) {
    return this.editStudentCommand.execute(
      authenticatedStudent,
      {
        name,
        languages,
        programmingLanguages,
        location,
      }
    );
  }
}