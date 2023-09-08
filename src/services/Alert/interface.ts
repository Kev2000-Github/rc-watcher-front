import { Alert, Paginated, paginationProps } from "../interface";

export type createAlertProps = {
    title: string,
    description: string,
    priority: string,
    regulationId: string
}

export type editAlertProps = Partial<createAlertProps>

export type AlertFilterProps = {
    state?: string,
    priority? : string
}

export abstract class AlertServiceInterface {
    abstract getAlerts: (paginationOpts: paginationProps, filters?: AlertFilterProps) => Promise<Paginated<Alert>>
    abstract createAlert: (props: createAlertProps) => Promise<Alert>
    abstract editAlert: (id: string, props: editAlertProps) => Promise<Alert>
    abstract deleteAlert: (id: string) => Promise<boolean>
    abstract getAlert: (id: string) => Promise<Alert>
}