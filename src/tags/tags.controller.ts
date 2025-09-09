// src/tags/tags.controller.ts
import { Body, Controller, Get, Param, Post, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { TenantGuard } from '../shared/guards/tenant.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { TagsService } from './tags.service';

@Controller('tags')
@UseGuards(JwtAuthGuard, TenantGuard)
export class TagsController {
  constructor(private readonly service: TagsService) {}

  @Get()
  list(@CurrentUser() user: any) {
    return this.service.list(user.veterinariaId);
  }

  @Post()
  create(@Body() body: { name: string; color?: string }, @CurrentUser() user: any) {
    return this.service.create(user.veterinariaId, body.name, body.color);
  }

  @Post(':tagId/attach/:scope/:targetId')
  attach(@Param('tagId') tagId: string, @Param('scope') scope: 'paciente'|'informe'|'media', @Param('targetId') targetId: string, @CurrentUser() user: any) {
    return this.service.attach(user.veterinariaId, tagId, scope, targetId);
  }

  @Delete(':tagId/detach/:scope/:targetId')
  detach(@Param('tagId') tagId: string, @Param('scope') scope: 'paciente'|'informe'|'media', @Param('targetId') targetId: string, @CurrentUser() user: any) {
    return this.service.detach(user.veterinariaId, tagId, scope, targetId);
  }

  @Get(':scope/:targetId')
  listByTarget(@Param('scope') scope: 'paciente'|'informe'|'media', @Param('targetId') targetId: string, @CurrentUser() user: any) {
    return this.service.listByTarget(user.veterinariaId, scope, targetId);
  }
}
