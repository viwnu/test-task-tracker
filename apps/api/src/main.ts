import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { configApp } from '../config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const port = new ConfigService().get('PORT');
  const app = await NestFactory.create(ApiModule);

  configApp(app);
  await app.listen(port || 3000, () => console.log(`Server running on PORT: ${port || 3000}`));
}
bootstrap();
