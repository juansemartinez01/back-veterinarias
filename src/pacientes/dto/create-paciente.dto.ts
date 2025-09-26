import {
  IsString,
  IsDateString,
  IsOptional,
  IsUUID,
  IsIn,
  IsBoolean,
  IsNumberString,
  Length,
} from "class-validator";

export class CreatePacienteDto {
  @IsString()
  @Length(1, 120)
  nombre: string;

  // Ahora referenciamos por ID
  @IsUUID()
  especieId: string;

  // Puede ser opcional (no todas las especies requieren raza)
  @IsUUID()
  @IsOptional()
  razaId?: string;

  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;

  @IsIn(["macho", "hembra", "desconocido"])
  @IsOptional()
  sexo?: "macho" | "hembra" | "desconocido";

  // numeric validado como string (p. ej. "12.50")
  @IsOptional()
  @IsNumberString()
  pesoKg?: string;

  @IsOptional()
  @IsBoolean()
  castrado?: boolean;

  // Datos del dueño (snapshot) – opcionales; si no vienen, se toman de Cliente
  @IsOptional() @IsString() duenoNombre?: string;
  @IsOptional() @IsString() duenoTelefono?: string;
  @IsOptional() @IsString() duenoEmail?: string;
  @IsOptional() @IsString() duenoDireccion?: string;

  @IsUUID()
  clienteId: string;
}
