import { Solution, Paginated, paginationProps } from "../interface";

export type createSolutionProps = {
    title: string,
    description: string,
    responsableIds: string[],
    alertIds: string[],
    steps: string[]
}

export type SolutionFilterProps = {
    state?: string,
}

export abstract class SolutionServiceInterface {
    abstract getSolutions: (paginationOpts: paginationProps, filters?: SolutionFilterProps) => Promise<Paginated<Solution>>
    abstract createSolution: (props: createSolutionProps) => Promise<Solution>
    abstract getSolution: (id: string) => Promise<Solution>
}