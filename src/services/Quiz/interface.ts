import { QuizFormSchema } from "../../components/Form/QuizForm/schema";
import { Paginated, Quiz, QuizForm, paginationProps } from "../interface";

export type answerQuizProps = {
    id: string|undefined,
    form: QuizFormSchema
}

export abstract class QuizServiceInterface {
    abstract getQuizzes: (paginationOpts: paginationProps) => Promise<Paginated<Quiz>>
    abstract getQuizForm: (id: string) => Promise<QuizForm>
    abstract answerQuizForm: (props: answerQuizProps) => Promise<boolean>
}