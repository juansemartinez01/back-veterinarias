import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { TagRel, TagScope } from './tag-rel.entity';
export declare class TagsService {
    private tags;
    private rels;
    constructor(tags: Repository<Tag>, rels: Repository<TagRel>);
    create(veterinariaId: string, name: string, color?: string): Promise<Tag>;
    list(veterinariaId: string): Promise<Tag[]>;
    attach(veterinariaId: string, tagId: string, scope: TagScope, targetId: string): Promise<TagRel>;
    detach(veterinariaId: string, tagId: string, scope: TagScope, targetId: string): Promise<{
        ok: boolean;
    }>;
    listByTarget(veterinariaId: string, scope: TagScope, targetId: string): Promise<TagRel[]>;
}
