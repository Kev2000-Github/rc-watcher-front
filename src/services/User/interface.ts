import { Paginated, User, paginationProps } from "../interface";

export type mutateUserProps = {
    email?: string,
    fullName?: string,
    username?: string,
    password?: string,
    roleId?: string
}

export type mutateProps<T> = {
    companyId: string,
    userId: string,
    body: T
}

export type deleteUserProps = Omit<mutateProps<null>, 'body'>

export abstract class UserServiceInterface {
    abstract getUsers: (companyId: string, paginationOpts: paginationProps) => Promise<Paginated<User>>
    abstract updateUser: (props: mutateProps<mutateUserProps>) => Promise<User>
    abstract createUser: (props: mutateProps<mutateUserProps>) => Promise<User>
    abstract deleteUser: (props: deleteUserProps) => Promise<User>
}