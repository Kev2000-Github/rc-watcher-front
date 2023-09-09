import { User } from "../interface";

export type registerProps = {
    user: {
        fullName: string,
        username: string,
        email: string,
        password: string
    },
    company: {
        name: string,
        companyId: string,
        countryId: string,
        address: string
    }
}

export abstract class RegisterServiceInterface {
    abstract register: (props: registerProps) => Promise<User>
}