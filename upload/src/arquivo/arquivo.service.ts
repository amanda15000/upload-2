import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, PayloadTooLargeException } from '@nestjs/common';
import { CreateArquivoDto } from './dto/create-arquivo.dto';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';
import { NotFoundException } from '@nestjs/common';
import { PayloadTooLargeException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ArquivoService {
  private readonly pastaUpload = './drive'; // Sua pasta real do projeto
  
  constructor(){
    if(!fs.existsSync(this.pastaUpload)){
      fs.mkdirSync(this.pastaUpload,{recursive:true});
    }
  }

  create(arquivo: Express.Multer.File) {
<<<<<<< HEAD
    const limiteArquivo = 5 * 1024 * 1024;

    if (arquivo.size>limiteArquivo){
       if (fs.existsSync(arquivo.path)) fs.unlinkSync(arquivo.path);
      throw new PayloadTooLargeException('O arquivo enviado ele passa do  limite permitido de 5MB.');
    }
    const tiposPermitidos = ['./jpg','./png','./tiff','/.jpeg'];
    const ext = arquivo.originalname.substring(arquivo.originalname.lastIndexOf('.')).toLowerCase();
    if(!tiposPermitidos.includes(ext)){
       throw new PayloadTooLargeException('Só são permetidos os arquivos jpg,png,tiff,jpeg');
    }
=======
    const limiteTamanho = 5 * 1024 * 1024;
    if (arquivo.size > limiteTamanho) {
      throw new PayloadTooLargeException({
        erro: 'Arquivo muito grande',
        mensagem: 'O tamanho máximo permitido é de 5MB.',
      });
    }

    const formatosPermitidos = ['./jpeg', './jpg', './png', './tiff'];
    if (!formatosPermitidos.includes(arquivo.mimetype)) {
      throw new BadRequestException({
        erro: 'Formato inválido',
        mensagem: 'Apenas imagens nos formatos JPG, JPEG, PNG e TIFF são aceitas.',
      });
    }


    return {
      message: 'Arquivo enviado com sucesso!',
      filename: arquivo.filename,
      originalname: arquivo.originalname,
      size: arquivo.size,
    };
  }

  findAll() {
    try {
      const files = fs.readdirSync(this.pastaUpload);

      const fileList = files.map((filename) => {
        // Correção aqui: removido o "stats =" duplicado da linha 31
        const stats = fs.statSync(`${this.pastaUpload}/${filename}`);
        return {
          filename,
          size: stats.size,
          criado: stats.birthtime,
        };
      });
=======
      const fileList = files.map(
        (filename) => {
          const stats = fs.statSync(`${this.pastaUpload}/${filename}`);
          return {
            filename,
            size: stats.size,
            criado: stats.birthtime,
          };
        }
      );
>>>>>>> 11e683940df8cbc6db8c6c2a7504c1b55fe2f19b
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

  removePorNome(nome: string) {
    const caminhoArquivo = path.join(this.pastaUpload, nome);

    if (!fs.existsSync(caminhoArquivo)) {
      throw new NotFoundException({
        erro: 'Não encontrado',
        mensagem: `Nenhum arquivo com o nome "${nome}" foi localizado.`,
      });
    }
  }

removerPorNome(nome: string) {
  const caminhoArquivo = `${this.pastaUpload}/${nome}`;

  if (!fs.existsSync(caminhoArquivo)) {
    throw new NotFoundException({
      erro: 'Não encontrado',
      mensagem: `Nenhum arquivo com o nome "${nome}" foi localizado.`,
    });
  }

  try {
    fs.unlinkSync(caminhoArquivo);
    
    return {
      sucesso: true,
      mensagem: `O arquivo ${nome} foi removido com sucesso.`,
    };
  } catch (error) {
    throw new BadRequestException('Não foi possível deletar o arquivo.');
  }
<<<<<<< HEAD

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
=======
}
>>>>>>> 11e683940df8cbc6db8c6c2a7504c1b55fe2f19b
}