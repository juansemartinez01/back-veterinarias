import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateTenantSettingsDto {
  @IsOptional() @IsString() timezone?: string;
  @IsOptional() @IsInt() @Min(0) reminderHoursBefore?: number;
  @IsOptional() reminderChannels?: { email?: boolean; whatsapp?: boolean };
  @IsOptional() @IsString() fromEmail?: string;
  @IsOptional() @IsString() whatsappFrom?: string;
  @IsOptional() @IsString() s3Bucket?: string;
  @IsOptional() @IsString() s3Prefix?: string;
  @IsOptional() @IsBoolean() aiEnabled?: boolean;
}
