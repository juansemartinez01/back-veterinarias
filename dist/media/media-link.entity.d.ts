import { MediaFile } from './media-file.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
export type MediaScope = 'paciente' | 'estudio' | 'informe';
export declare class MediaLink {
    id: string;
    veterinaria: Veterinaria;
    media: MediaFile;
    scope: MediaScope;
    targetId: string;
}
