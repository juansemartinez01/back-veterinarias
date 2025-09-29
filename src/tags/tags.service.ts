// src/tags/tags.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { TagRel, TagScope } from './tag-rel.entity';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private tags: Repository<Tag>,
    @InjectRepository(TagRel) private rels: Repository<TagRel>
  ) {}

  async create(veterinariaId: string, name: string, color?: string) {
    const exists = await this.tags.findOne({
      where: { veterinaria: { id: veterinariaId }, name },
    });
    if (exists) throw new ConflictException("Tag duplicado");
    return this.tags.save(
      this.tags.create({
        veterinaria: { id: veterinariaId } as any,
        name,
        color: color ?? null,
      })
    );
  }

  list(veterinariaId: string) {
    return this.tags.find({
      where: { veterinaria: { id: veterinariaId } },
      order: { name: "ASC" },
    });
  }

  async attach(
    veterinariaId: string,
    tagId: string,
    scope: TagScope,
    targetId: string
  ) {
    const tag = await this.tags.findOne({
      where: { id: tagId, veterinaria: { id: veterinariaId } },
    });
    if (!tag) throw new NotFoundException("Tag no encontrado");

    const exists = await this.rels.findOne({
      where: {
        veterinaria: { id: veterinariaId },
        tag: { id: tagId },
        scope,
        targetId,
      },
    });
    if (exists) return exists;

    return this.rels.save(
      this.rels.create({
        veterinaria: { id: veterinariaId } as any,
        tag: { id: tagId } as any,
        scope,
        targetId,
      })
    );
  }

  async detach(
    veterinariaId: string,
    tagId: string,
    scope: TagScope,
    targetId: string
  ) {
    await this.rels.delete({
      veterinaria: { id: veterinariaId } as any,
      tag: { id: tagId } as any,
      scope,
      targetId,
    });
    return { ok: true };
  }

  listByTarget(veterinariaId: string, scope: TagScope, targetId: string) {
    return this.rels.find({
      where: { veterinaria: { id: veterinariaId }, scope, targetId },
    });
  }

  async update(
    veterinariaId: string,
    tagId: string,
    dto: UpdateTagDto
  ): Promise<Tag> {
    const tag = await this.tags.findOne({
      where: { id: tagId, veterinaria: { id: veterinariaId } },
      relations: ["veterinaria"],
    });
    if (!tag) throw new NotFoundException("Tag no encontrado");

    // Normalizamos y validamos nombre único dentro del tenant
    if (dto.name) {
      const newName = dto.name.trim();
      if (newName.length === 0)
        throw new ConflictException("El nombre no puede estar vacío");

      if (newName.toLowerCase() !== tag.name.toLowerCase()) {
        const exists = await this.tags.exist({
          where: {
            name: ILike(newName), // case-insensitive
            veterinaria: { id: veterinariaId },
          },
        });
        if (exists)
          throw new ConflictException("Ya existe un tag con ese nombre");
        tag.name = newName;
      }
    }

    if (dto.color !== undefined) {
      // Podés permitir null para “quitar color”
      tag.color = dto.color as any;
    }

    return this.tags.save(tag);
  }

  async remove(veterinariaId: string, tagId: string): Promise<{ ok: true }> {
    const tag = await this.tags.findOne({
      where: { id: tagId, veterinaria: { id: veterinariaId } },
      relations: ["veterinaria"],
    });
    if (!tag) throw new NotFoundException("Tag no encontrado");

    // 1) Borramos todas las relaciones del tag dentro del tenant
    await this.rels
      .createQueryBuilder()
      .delete()
      .where('"tagId" = :tagId', { tagId })
      .andWhere('"veterinariaId" = :veterinariaId', { veterinariaId })
      .execute();

    // 2) Borramos el tag
    await this.tags.delete(tag.id);

    return { ok: true };
  }
}
