// src/informes/informes.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Informe } from './informe.entity';
import { Estudio } from '../estudios/estudio.entity';
import { InformeSeccion } from './informe-seccion.entity';
import { Medicion } from './medicion.entity';
import { CreateInformeDto } from './dto/create-informe.dto';

@Injectable()
export class InformesService {
  constructor(
    @InjectRepository(Informe) private informesRepo: Repository<Informe>,
    @InjectRepository(Estudio) private estudiosRepo: Repository<Estudio>,
    @InjectRepository(InformeSeccion) private seccionesRepo: Repository<InformeSeccion>,
    @InjectRepository(Medicion) private medicionesRepo: Repository<Medicion>,
  ) {}

  private async nextVersion(estudioId: string, tenantId: string) {
    const max = await this.informesRepo
      .createQueryBuilder('i')
      .select('COALESCE(MAX(i.version), 0)', 'max')
      .where('i.estudio_id = :estudioId AND i.veterinaria_id = :tenant', { estudioId, tenant: tenantId })
      .getRawOne<{ max: number }>();
    return (Number(max?.max) || 0) + 1;
  }

  async crear(tenantId: string, estudioId: string, autorUserId: string | undefined, dto: CreateInformeDto) {
    const estudio = await this.estudiosRepo.findOne({ where: { id: estudioId, veterinaria: { id: tenantId } } });
    if (!estudio) throw new NotFoundException('Estudio no encontrado');

    const v = await this.nextVersion(estudioId, tenantId);
    const informe = await this.informesRepo.save(
      this.informesRepo.create({
        veterinaria: { id: tenantId } as any,
        estudio: { id: estudioId } as any,
        autor: autorUserId ? ({ id: autorUserId } as any) : null,
        version: v,
        estado: 'borrador',
        cuerpo: dto.cuerpo ?? null,
      }),
    );

    // secciones + mediciones
    for (const s of dto.secciones ?? []) {
      const sec = await this.seccionesRepo.save(
        this.seccionesRepo.create({
          informe: { id: informe.id } as any,
          orden: s.orden,
          nombre: s.nombre,
          texto: s.texto ?? null,
        }),
      );
      for (const m of s.mediciones ?? []) {
        await this.medicionesRepo.save(
          this.medicionesRepo.create({
            seccion: { id: sec.id } as any,
            nombre: m.nombre,
            unidad: m.unidad ?? null,
            valor: m.valor ?? null,
            referencia: m.referencia ?? null,
          }),
        );
      }
    }

    return this.detalle(informe.id, tenantId);
  }

  async detalle(informeId: string, tenantId: string) {
    const i = await this.informesRepo.findOne({ where: { id: informeId, veterinaria: { id: tenantId } } });
    if (!i) throw new NotFoundException('Informe no encontrado');

    const secciones = await this.seccionesRepo.find({ where: { informe: { id: i.id } }, order: { orden: 'ASC' } });
    const mapMed = new Map<string, any[]>();
    for (const s of secciones) {
      const meds = await this.medicionesRepo.find({ where: { seccion: { id: s.id } }, order: { nombre: 'ASC' } });
      mapMed.set(s.id, meds);
    }
    return { ...i, secciones: secciones.map(s => ({ ...s, mediciones: mapMed.get(s.id) || [] })) };
  }

  async versiones(estudioId: string, tenantId: string) {
    return this.informesRepo.find({
      where: { estudio: { id: estudioId }, veterinaria: { id: tenantId } },
      order: { version: 'DESC' },
    });
  }

  async finalizar(informeId: string, tenantId: string, confirmar: boolean) {
    const i = await this.informesRepo.findOne({ where: { id: informeId, veterinaria: { id: tenantId } } });
    if (!i) throw new NotFoundException('Informe no encontrado');
    if (!confirmar) throw new BadRequestException('Se requiere confirmar=true para finalizar');
    if (i.estado === 'final') return i;

    i.estado = 'final';
    return this.informesRepo.save(i);
  }
}
