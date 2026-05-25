import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArquivoModule } from './arquivo/arquivo.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [ArquivoModule, PhotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
