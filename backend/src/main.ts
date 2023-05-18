import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { IoAdapter } from "@nestjs/platform-socket.io";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(8000);
}
bootstrap();
