import { Paginated, Quiz, paginationProps } from "../interface";

export abstract class QuizServiceInterface {
    abstract getQuizzes: (paginationOpts: paginationProps) => Promise<Paginated<Quiz>>
}