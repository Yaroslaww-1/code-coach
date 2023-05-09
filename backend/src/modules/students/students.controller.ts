import { Controller, Get, Param } from "@nestjs/common";
import { GetAllStudentsQuery } from "./queries/get-all.query";

@Controller("students")
export class StudentsController {
  constructor(
    private readonly getAllStudents: GetAllStudentsQuery,
  ) {}

  @Get()
  getAll() {
    return this.getAllStudents.execute();
  }
}