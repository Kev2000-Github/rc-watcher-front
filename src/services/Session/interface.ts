import { User } from "../interface";

export type loginProps = {
    username: string,
    password: string,
    companyId: string
}
export abstract class LoginServiceInterface {
    abstract login: ({username, password, companyId}: loginProps) => Promise<User>
    abstract logout: () => Promise<void>
}