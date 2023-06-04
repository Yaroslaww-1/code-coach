import { Controller, Get, Param } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get("")
  getCurrent() {
    return { ok: true };
  }
}
