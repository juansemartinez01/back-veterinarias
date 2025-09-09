import { Veterinaria } from '../veterinarias/veterinaria.entity';
import { Usuario } from '../usuarios/usuario.entity';
export declare class MediaFile {
    id: string;
    veterinaria: Veterinaria;
    uploader?: Usuario | null;
    s3Key?: string | null;
    mime?: string | null;
    sizeBytes?: string | null;
    checksum?: string | null;
    legacyPath?: string | null;
    originalName?: string | null;
    createdAt: Date;
}
