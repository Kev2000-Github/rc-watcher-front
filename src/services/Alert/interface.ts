import { QuizFormSchema } from "../../components/Form/QuizForm/schema";
import { Alert, Paginated, Quiz, QuizForm, paginationProps } from "../interface";



export type AlertFilterProps = {
    state?: string,
    priority? : string
}

export abstract class AlertServiceInterface {
    abstract getAlerts: (paginationOpts: paginationProps, filters?: AlertFilterProps) => Promise<Paginated<Alert>>
}