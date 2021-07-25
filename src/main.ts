import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import * as momentTimeZone from 'moment-timezone';
import { AppModule } from './app.module';


async function bootstrap() {
  
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://user:${process.env.USERRABBIT}@${process.env.SERVERAWSEC2}/smartranking`],
      queue: 'admin-backend'
    },
  });

  Date.prototype.toJSON = function (): any {
    return momentTimeZone(this).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  await app.listen();
}
bootstrap();
