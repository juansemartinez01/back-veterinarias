import { Tag } from './tag.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
export type TagScope = 'paciente' | 'informe' | 'media';
export declare class TagRel {
    id: string;
    veterinaria: Veterinaria;
    tag: Tag;
    scope: TagScope;
    targetId: string;
}
