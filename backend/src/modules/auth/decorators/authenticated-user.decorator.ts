import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers["authorization"].split(" ")[1];

    const decoded = Buffer.from(token, "base64").toString();
    const email = decoded.split(":")[0];
    const password = decoded.split(":")[1];

    return email;
  },
);