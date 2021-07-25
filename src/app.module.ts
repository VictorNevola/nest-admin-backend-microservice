import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaSchema } from './interfaces/categorias/categoria.schema';
import { JogadorSchema } from './interfaces/jogadores/jogador.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot("mongodb://localhost:27017/sradmbackend", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }),
    MongooseModule.forFeature([
      { name: 'Categoria', schema: CategoriaSchema },
      { name: 'Jogador', schema: JogadorSchema }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
