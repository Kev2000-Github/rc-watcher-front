import { Alert, Paginated, paginationProps } from "../interface";

export type createAlertProps = {
    title: string,
    description: string,
    priority: string,
    regulationId: string
}

export type AlertFilterProps = {
    state?: string,
    priority? : string
}

export abstract class AlertServiceInterface {
    abstract getAlerts: (paginationOpts: paginationProps, filters?: AlertFilterProps) => Promise<Paginated<Alert>>
    abstract createAlert: (props: createAlertProps) => Promise<Alert>
    abstract getAlert: (id: string) => Promise<Alert>
}