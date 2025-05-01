import { IsString, MinLength } from 'class-validator';

export class CreateHistoryDto {
  @IsString()
  @MinLength(5)
  diagnosis: string;

  @IsString()
  treatment: string;

  @IsString()
  doctorNotes: string;
}
