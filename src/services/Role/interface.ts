import { Role } from "../interface";

export abstract class RoleServiceInterface {
    abstract getRoles: () => Promise<Role[]>
}