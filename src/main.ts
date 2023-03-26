import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

export default () => ({
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USER || 'test',
    password: process.env.password || 'password',
    name: process.env.database || 'test',
  },
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();

