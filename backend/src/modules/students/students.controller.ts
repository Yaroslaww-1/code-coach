import { Controller, Get, Param } from "@nestjs/common";
import { GetAllStudentsQuery } from "./queries/get-all.query";
import { GetStudentByIdQuery } from "./queries/get-by-id.query";

@Controller("students")
export class StudentsController {
  constructor(
    private readonly getAllStudents: GetAllStudentsQuery,
    private readonly getStudentByIdQuery: GetStudentByIdQuery,
  ) {}

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.getStudentByIdQuery.execute(id);
  }

  @Get()
  getAll() {
    return this.getAllStudents.execute();
  }
}