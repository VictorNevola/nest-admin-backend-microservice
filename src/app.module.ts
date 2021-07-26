import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot("mongodb://localhost:27017/sradmbackend", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }),
    CategoriasModule,
    JogadoresModule
  ]
})
export class AppModule { }
