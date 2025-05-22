import { IsOptional, IsString, IsNumber } from 'class-validator';

export class ActivationFilterDto {
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @IsOptional()
  @IsString()
  REP_TRAVAUX_STT?: string;

  @IsOptional()
  @IsString()
  gouvernorat?: string;

  @IsOptional()
  @IsString()
  delegation?: string;

  @IsOptional()
  @IsString()
  DATE_AFFECTATION_STT?: string;

  @IsOptional()
  @IsString()
  DES_PACK?: string;

  @IsOptional()
  @IsString()
  offre?: string;

  @IsOptional()
  @IsString()
  REP_RDV?: string;

  @IsOptional()
  @IsString()
  DATE_PRISE_RDV?: string;

  @IsOptional()
  @IsString()
  CMT_RDV?: string;

  @IsOptional()
  @IsNumber()
  METRAGE_CABLE?: number;
}
