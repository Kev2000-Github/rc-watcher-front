import { QuizFormSchema } from "../../components/Form/QuizForm/schema";
import { Paginated, Quiz, QuizForm, paginationProps } from "../interface";

export type answerQuizProps = {
    id: string|undefined,
    form: QuizFormSchema
}

export type quizFilterProps = {
    state?: string,
    tags? : string[]
}

export abstract class QuizServiceInterface {
    abstract getQuizzes: (paginationOpts: paginationProps, filters?: quizFilterProps) => Promise<Paginated<Quiz>>
    abstract getQuizForm: (id: string) => Promise<QuizForm>
    abstract answerQuizForm: (props: answerQuizProps) => Promise<boolean>
    abstract updateQuizForm: (props: answerQuizProps) => Promise<boolean>
    abstract getQuizDocumentBase64: (id: string, type: string) => Promise<string>
}