import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateArquivoDto } from './dto/create-arquivo.dto';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ArquivoService {
  private readonly pastaUpload = './drive'; // Sua pasta real do projeto
  
  constructor(){
    if(!fs.existsSync(this.pastaUpload)){
      fs.mkdirSync(this.pastaUpload, { recursive: true });
    }
  }

  // =========================================================
  // ITEM 1 & 2: CRIAÇÃO / CONFIRMAÇÃO DE UPLOAD
  // =========================================================
  create(arquivo: Express.Multer.File) {
    // Como o Controller (Multer + ParseFilePipe) já valida tamanho e tipo perfeitamente,
    // o Service só precisa receber o arquivo já gravado e retornar a resposta de sucesso!
    return {
      message: 'Arquivo enviado com sucesso!',
      filename: arquivo.filename,
      originalname: arquivo.originalname,
      size: arquivo.size,
    };
  }

  // =========================================================
  // LISTAGEM DE ARQUIVOS
  // =========================================================
  findAll() {
    try {
      const files = fs.readdirSync(this.pastaUpload);
      const fileList = files.map((filename) => {
        const stats = fs.statSync(`${this.pastaUpload}/${filename}`);
        return {
          filename,
          size: stats.size,
          criado: stats.birthtime,
        };
      });
      return {
        total: fileList.length,
        files: fileList,
      };
    } catch (error) {
      throw new BadRequestException('Não foi possível listar os arquivos.');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} arquivo`;
  }

  update(id: number, updateArquivoDto: UpdateArquivoDto) {
    return `This action updates a #${id} arquivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} arquivo`;
  }

  // =========================================================
  // ITEM 3: FUNCIONALIDADE DE REMOÇÃO DE ARQUIVO POR NOME
  // =========================================================
  removePorNome(filename: string) {
    // Localiza o arquivo na sua pasta real './drive'
    const filePath = path.resolve(process.cwd(), this.pastaUpload, filename);

    // ITEM BÔNUS 3: Se não encontrar o nome enviado, joga o erro 404 Not Found
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Arquivo não encontrado no servidor.');
    }

    try {
      // Deleta fisicamente o arquivo da pasta drive
      fs.unlinkSync(filePath);
      
      // Confirmação de sucesso requisitada
      return {
        message: `Arquivo ${filename} deletado com sucesso!`,
      };
    } catch (error) {
      throw new InternalServerErrorException('Não foi possível deletar o arquivo do servidor.');
    }
  }
}