import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Paciente } from "../pacientes/paciente.entity";
import { Estudio, EstudioTipo } from "../estudios/estudio.entity";
import { Informe } from "../informes/informe.entity";
import { ClinicalResumeInputDto } from "./dto/clinical-resume.dto";

@Injectable()
export class ClinicalResumeBuilderService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepo: Repository<Paciente>,
    @InjectRepository(Estudio)
    private readonly estudioRepo: Repository<Estudio>,
    @InjectRepository(Informe) private readonly informeRepo: Repository<Informe>
  ) {}

  
  private toYears(d?: Date | string | null): number {
    if (!d) return 0;

    let birth: Date | null = null;

    if (d instanceof Date) {
      birth = d;
    } else if (typeof d === "string") {
      // Esperamos "YYYY-MM-DD" (tipo DATE). Parseo seguro sin zonas.
      const onlyDate = d.split("T")[0];
      const parts = onlyDate.split("-").map((x) => parseInt(x, 10));
      if (parts.length === 3 && parts.every((n) => Number.isFinite(n))) {
        const [y, m, day] = parts;
        // Usamos UTC para evitar off-by-one por TZ
        birth = new Date(Date.UTC(y, m - 1, day));
      }
    }

    if (!birth || isNaN(birth.getTime())) return 0;

    const now = new Date();
    // Comparación en UTC para evitar desviaciones de TZ
    let age = now.getUTCFullYear() - birth.getUTCFullYear();
    const monthDiff = now.getUTCMonth() + 1 - (birth.getUTCMonth() + 1);
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && now.getUTCDate() < birth.getUTCDate())
    ) {
      age--;
    }
    return age < 0 ? 0 : age;
  }

  private mapTipoToEstudioLabel(t: EstudioTipo): string {
    switch (t) {
      case "eco_abdomen":
        return "ecografía abdominal";
      case "eco_torax":
        return "ecografía torácica";
      case "rx":
        return "radiografía";
      case "control":
        return "control";
      default:
        return "consulta";
    }
  }

  private mapTipoToOrgan(t: EstudioTipo): string {
    switch (t) {
      case "eco_abdomen":
        return "abdomen";
      case "eco_torax":
        return "tórax";
      case "rx":
        return "región estudiada";
      default:
        return "general";
    }
  }

  /**
   * Construye el payload que consume /integraciones/clinical-resume
   * a partir del pacienteId y tenant.
   */
  async buildPayloadFromPaciente(
    veterinariaId: string,
    pacienteId: string,
    language: "es" | "en" = "es"
  ): Promise<ClinicalResumeInputDto> {
    const paciente = await this.pacienteRepo.findOne({
      where: { id: pacienteId, veterinaria: { id: veterinariaId } },
      relations: ["especie", "raza", "veterinaria"],
    });
    if (!paciente) {
      throw new NotFoundException("Paciente no encontrado en este tenant");
    }

    const specie = (paciente.especie?.nombre ?? "desconocido").toLowerCase();
    const raze = paciente.raza?.nombre ?? "SIN RAZA";
    const age = this.toYears(paciente.fechaNacimiento ?? undefined);

    const estudios = await this.estudioRepo.find({
      where: {
        paciente: { id: paciente.id },
        veterinaria: { id: veterinariaId },
      },
      order: { createdAt: "ASC" },
    });

    const history = [];
    for (const e of estudios) {
      // Tomamos el informe más reciente (o el final si querés filtrar por estado)
      const ultimo = await this.informeRepo.findOne({
        where: { estudio: { id: e.id }, veterinaria: { id: veterinariaId } },
        order: { version: "DESC" },
      });

      const informeTexto =
        (ultimo?.cuerpo && ultimo.cuerpo.trim()) ||
        (e.notas && e.notas.trim()) ||
        "Sin observaciones registradas.";

      history.push({
        fecha: e.createdAt.toISOString().slice(0, 10),
        estudio: this.mapTipoToEstudioLabel(e.tipo),
        reportes: [
          {
            organ: this.mapTipoToOrgan(e.tipo),
            inform: informeTexto,
          },
        ],
      });
    }

    const payload: ClinicalResumeInputDto = {
      specie,
      raze,
      age,
      language,
      history,
    };

    return payload;
  }
}
