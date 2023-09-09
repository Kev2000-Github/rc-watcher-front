import { Solution, Paginated, paginationProps } from "../interface";

export type createSolutionProps = {
    title: string,
    description: string,
    responsableIds: string[],
    alertIds: string[],
    steps: string[]
}
export type editSolutionProps = Partial<createSolutionProps>

export type SolutionFilterProps = {
    state?: string,
}

export abstract class SolutionServiceInterface {
    abstract getSolutions: (paginationOpts: paginationProps, filters?: SolutionFilterProps) => Promise<Paginated<Solution>>
    abstract createSolution: (props: createSolutionProps) => Promise<Solution>
    abstract editSolution: (id: string, props: editSolutionProps) => Promise<Solution>
    abstract deleteSolution: (id: string) => Promise<boolean>
    abstract getSolution: (id: string) => Promise<Solution>
    abstract updateSolutionState: (id: string, state: string) => Promise<boolean>
}