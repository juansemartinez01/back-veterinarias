import { Permission } from './permission.entity';
export declare class Role {
    id: string;
    name: string;
    isSystem: boolean;
    permissions: Permission[];
}
