// src/tags/tags.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { TagRel, TagScope } from './tag-rel.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private tags: Repository<Tag>,
    @InjectRepository(TagRel) private rels: Repository<TagRel>,
  ) {}

  async create(veterinariaId: string, name: string, color?: string) {
    const exists = await this.tags.findOne({ where: { veterinaria: { id: veterinariaId }, name } });
    if (exists) throw new ConflictException('Tag duplicado');
    return this.tags.save(this.tags.create({ veterinaria: { id: veterinariaId } as any, name, color: color ?? null }));
  }

  list(veterinariaId: string) {
    return this.tags.find({ where: { veterinaria: { id: veterinariaId } }, order: { name: 'ASC' } });
  }

  async attach(veterinariaId: string, tagId: string, scope: TagScope, targetId: string) {
    const tag = await this.tags.findOne({ where: { id: tagId, veterinaria: { id: veterinariaId } } });
    if (!tag) throw new NotFoundException('Tag no encontrado');

    const exists = await this.rels.findOne({ where: { veterinaria: { id: veterinariaId }, tag: { id: tagId }, scope, targetId } });
    if (exists) return exists;

    return this.rels.save(this.rels.create({ veterinaria: { id: veterinariaId } as any, tag: { id: tagId } as any, scope, targetId }));
  }

  async detach(veterinariaId: string, tagId: string, scope: TagScope, targetId: string) {
    await this.rels.delete({ veterinaria: { id: veterinariaId } as any, tag: { id: tagId } as any, scope, targetId });
    return { ok: true };
  }

  listByTarget(veterinariaId: string, scope: TagScope, targetId: string) {
    return this.rels.find({ where: { veterinaria: { id: veterinariaId }, scope, targetId } });
  }
}
