import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const decoded = Buffer.from(request.headers["authorization"], "base64").toString();

    const token = decoded.split(" ")[1];
    const email = token.split(":")[0];
    const password = token.split(":")[1];

    return email;
  },
);