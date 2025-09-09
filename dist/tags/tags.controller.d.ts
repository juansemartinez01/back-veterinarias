import { TagsService } from './tags.service';
export declare class TagsController {
    private readonly service;
    constructor(service: TagsService);
    list(user: any): Promise<import("./tag.entity").Tag[]>;
    create(body: {
        name: string;
        color?: string;
    }, user: any): Promise<import("./tag.entity").Tag>;
    attach(tagId: string, scope: 'paciente' | 'informe' | 'media', targetId: string, user: any): Promise<import("./tag-rel.entity").TagRel>;
    detach(tagId: string, scope: 'paciente' | 'informe' | 'media', targetId: string, user: any): Promise<{
        ok: boolean;
    }>;
    listByTarget(scope: 'paciente' | 'informe' | 'media', targetId: string, user: any): Promise<import("./tag-rel.entity").TagRel[]>;
}
