import { 
  Controller, Get, Post, Delete, Param, UseInterceptors, UploadedFile, 
  BadRequestException, ParseFilePipe, MaxFileSizeValidator
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ArquivoService } from './arquivo.service';

@Controller('arquivo')
export class ArquivoController {
  constructor(private readonly arquivoService: ArquivoService) {}

  // ==========================================
  // 1. ROTA DE UPLOAD (POST /arquivo/upload)
  // ==========================================
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './drive',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|tiff)$/i)) {
          return callback(
            new BadRequestException('Formato de arquivo inválido. Apenas JPG, JPEG, PNG e TIFF são permitidos.'), 
            false
          );
        }
        callback(null, true);
      },
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ 
            maxSize: 5 * 1024 * 1024,
            message: 'O arquivo enviado é muito grande. O limite máximo permitido é de 5MB.' 
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }
    return this.arquivoService.create(file);
  }

  // ==========================================
  // 2. ROTA DE LISTAGEM (GET /arquivo)
  // ==========================================
  @Get()
  findAll() {
    return this.arquivoService.findAll();
  }

  // ==========================================
  // 3. ROTA DE DELEÇÃO POR NOME (DELETE /arquivo/:nome)
  // ==========================================
  @Delete(':nome')
  remove(@Param('nome') nome: string) {
    return this.arquivoService.removePorNome(nome);
  }
}