import { Repository } from 'typeorm';
import { NotificacionProgramada } from './notificacion-programada.entity';
import { Turno } from '../turnos/turno.entity';
import { TenantSettingsService } from '../tenant-settings/tenant-settings.service';
import { PlantillasService } from '../plantillas/plantillas.service';
export declare class NotificacionesService {
    private repo;
    private turnosRepo;
    private readonly settings;
    private readonly plantillas;
    constructor(repo: Repository<NotificacionProgramada>, turnosRepo: Repository<Turno>, settings: TenantSettingsService, plantillas: PlantillasService);
    programarParaTurno(turnoId: string, veterinariaId: string): Promise<void>;
    cancelarPendientesDeTurno(turnoId: string, veterinariaId: string): Promise<void>;
    loadPlantillaOrDefault(veterinariaId: string, canal: 'email' | 'whatsapp'): Promise<import("../plantillas/plantilla-mensaje.entity").PlantillaMensaje | {
        subject: string;
        body: string;
    }>;
}
