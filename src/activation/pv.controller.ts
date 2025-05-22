// pv.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Res,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActivationService } from './activation.service';
import { Response } from 'express';

@Controller('activations/:crmCase/pdf')
export class PdfController {
  constructor(private readonly activationService: ActivationService) {}

  @Post('/:metrageCable')
  @UseInterceptors(FileInterceptor('pdf'))
  async uploadPdf(
    @Param('crmCase') crmCase: string,
    @Param('metrageCable') metrageCable: number,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    body: {
      imeiOdu: string;
      snIdu: string;
    },
  ) {
    await this.activationService.savePdf(
      crmCase,
      file.buffer,
      metrageCable,
      body.imeiOdu,
      body.snIdu,
      file.mimetype,
    );
    return { message: 'PDF et informations IMEI sauvegardés avec succès' };
  }

  @Get(':crmCase')
  async downloadPdf(@Param('crmCase') crmCase: string, @Res() res: Response) {
    const { buffer } = await this.activationService.getPdf(crmCase);
    const sanitizedCrmCase = String(crmCase).replace(/[^a-zA-Z0-9_-]/g, '_');

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="rapport_${sanitizedCrmCase}.pdf"`,
    });

    return res.end(buffer);
  }
}
