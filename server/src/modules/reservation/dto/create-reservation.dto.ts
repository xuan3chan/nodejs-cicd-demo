import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  guests: string;

  @IsString()
  @IsOptional()
  message?: string;
}
