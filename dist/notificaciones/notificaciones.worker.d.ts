import { Repository } from 'typeorm';
import { NotificacionProgramada } from './notificacion-programada.entity';
export declare class NotificacionesWorker {
    private repo;
    private readonly logger;
    private readonly email;
    private readonly wa;
    constructor(repo: Repository<NotificacionProgramada>);
    procesarPendientes(): Promise<void>;
}
