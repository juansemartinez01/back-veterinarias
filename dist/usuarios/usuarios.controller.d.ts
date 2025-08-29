import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
export declare class UsuariosController {
    private service;
    constructor(service: UsuariosService);
    crear(dto: CreateUsuarioDto): Promise<import("./usuario.entity").Usuario>;
    listar(user: any): Promise<import("./usuario.entity").Usuario[]>;
}
