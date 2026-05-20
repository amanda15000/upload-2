import { 
  Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, ParseFilePipe,FileTypeValidator,MaxFileSizeValidator
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ArquivoService } from './arquivo.service';

@Controller('arquivo')
export class ArquivoController {
  constructor(private readonly arquivoService: ArquivoService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './drive', // Garante que vai para a pasta ./drive
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // ==========================================
          // ITEM 1: VALIDAÇÃO DE TAMANHO (MÁXIMO 5MB)
          // ==========================================
          new MaxFileSizeValidator({ 
            maxSize: 5 * 1024 * 1024,
            message: 'O arquivo enviado é muito grande. O limite máximo permitido é de 5MB.' 
          }),
          // ==========================================
          // ITEM 2: VALIDAÇÃO DE FORMATO (IMAGENS POPULARES)
          // ==========================================
          new FileTypeValidator({ 
            // Expressão regular que aceita apenas jpeg, jpg, png e tiff
            fileType: /(jpg|jpeg|png|tiff)$/, 
          }),
        ],
        // Caso o arquivo falhe em qualquer validador acima, o NestJS corta o upload na hora!
        exceptionFactory: (error) => {
          // Personaliza a mensagem se o erro for do formato de arquivo
          if (error.includes('validation failed (expected type')) {
            return new BadRequestException('Formato de arquivo inválido. Apenas JPG, JPEG, PNG e TIFF são permitidos.');
          }
          return new BadRequestException(error);
        }
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }
    return this.arquivoService.create(file);
  }

  // ... Seus métodos @Get, @Patch e @Delete continuam iguais aqui para baixo
}