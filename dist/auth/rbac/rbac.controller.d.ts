import { RbacService } from './rbac.service';
export declare class RbacController {
    private readonly rbac;
    constructor(rbac: RbacService);
    createRole(body: {
        name: string;
        permissions?: string[];
        isSystem?: boolean;
    }): Promise<import("./role.entity").Role>;
    assign(body: {
        usuarioId: string;
        roleId: string;
        veterinariaId: string;
    }): Promise<import("./user-role.entity").UserRole>;
}
