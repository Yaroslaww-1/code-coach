import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authorization = request.headers["authorization"];

    const decoded = Buffer.from(authorization, "base64").toString();
    const email = decoded.split(":")[0];
    const password = decoded.split(":")[1];

    return email;
  },
);