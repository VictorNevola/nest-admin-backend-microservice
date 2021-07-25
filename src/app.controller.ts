import { Controller, Get, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { categoria } from './interfaces/categorias/categoria.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  logger = new Logger(AppController.name);

  @EventPattern('criar-categoria')
  async criarCategoria(
    @Payload() categoria: categoria
  ){
    this.logger.log(`categoria: ${JSON.stringify(categoria)}`)
    await this.appService.criarCategoria(categoria)
  }

  @MessagePattern('consultar-categorias')
  async consultarCategorias(
    @Payload() _id: string
  ) {

    if(_id){
      return await this.appService.consultarCategoriaPeloId(_id)
    }

    return await this.appService.consultarCategorias();
  }

}
