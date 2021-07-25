import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { categoria } from './interfaces/categorias/categoria.interface';
import { Jogador } from './interfaces/jogadores/jogador.interface';

@Injectable()
export class AppService {

  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<categoria>,
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>
  ) { }

  private readonly logger = new Logger(AppService.name)

  async criarCategoria(categoria: categoria): Promise<categoria> {
    try {
      const categoriaCriada = new this.categoriaModel(categoria);
      return await categoriaCriada.save();
    } catch (error) {
      this.logger.error(`Error: ${JSON.stringify(error.message)}`)
      throw new RpcException(error.message);
    }
  }

  async consultarCategorias(): Promise<Array<categoria>> {
    return await this.categoriaModel.find().populate("jogadores").exec();
  }

  async consultarCategoriaPeloId(categoria: string): Promise<categoria> {
    const categoriaEncontrada = await this.procuraCategoriaPeloNome(categoria);

    if (!categoriaEncontrada) {
      throw new RpcException(`Categoria ${categoria} não encontrada`);
    }

    return categoriaEncontrada;
  }

  private async procuraCategoriaPeloNome(categoria: string): Promise<categoria> {
    return await this.categoriaModel.findOne({ categoria }).exec();
  }

}
