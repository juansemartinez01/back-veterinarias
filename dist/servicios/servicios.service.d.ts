import { Repository } from 'typeorm';
import { Servicio } from './servicio.entity';
export declare class ServiciosService {
    private repo;
    constructor(repo: Repository<Servicio>);
    list(tenantId: string): Promise<Servicio[]>;
    get(tenantId: string, id: string): Promise<Servicio>;
    create(tenantId: string, dto: Partial<Servicio>): Promise<Servicio>;
    update(tenantId: string, id: string, dto: Partial<Servicio>): Promise<Servicio>;
    remove(tenantId: string, id: string): Promise<Servicio>;
}
