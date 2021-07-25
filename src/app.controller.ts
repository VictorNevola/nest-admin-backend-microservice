import { Controller, Get, Logger } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { categoria } from './interfaces/categorias/categoria.interface';

const ackErrors: string[] = ['E11000'];
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  logger = new Logger(AppController.name);

  @EventPattern('criar-categoria')
  async criarCategoria(
    @Payload() categoria: categoria,
    @Ctx() context: RmqContext
  ) {

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.appService.criarCategoria(categoria);
      await channel.ack(originalMsg);

    } catch (error) {
      this.logger.error(`Error: ${JSON.stringify(error.message)}`)

      ackErrors.map(async ackError => {
        if (error.message.includes(ackError)) {
          await channel.ack(originalMsg)
        }
      })

    }
  }

  @MessagePattern('consultar-categorias')
  async consultarCategorias(
    @Payload() _id: string,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      if (_id) {
        return await this.appService.consultarCategoriaPeloId(_id)
      }

      return await this.appService.consultarCategorias();

    } finally {
      await channel.ack(originalMsg)
    }

  }

  @EventPattern('atualizar-categoria')
  async atualizarCategoria(
    @Payload() data: any, @Ctx() context: RmqContext
  ){
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try{
      const { idCategoria, categoriaAtualizada } = data;

      await this.appService.atualizarCategoria(idCategoria, categoriaAtualizada)
      await channel.ack(originalMsg);

    } catch(error) {

    }

  }
}
