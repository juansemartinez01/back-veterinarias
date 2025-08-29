import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
export declare class UsuariosService {
    private repo;
    constructor(repo: Repository<Usuario>);
    crear(dto: CreateUsuarioDto): Promise<Usuario>;
    buscarPorEmail(email: string): Promise<Usuario>;
    listarPorVeterinaria(veterinariaId: string): Promise<Usuario[]>;
}
