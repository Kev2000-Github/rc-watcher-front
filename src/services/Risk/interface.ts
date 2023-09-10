import { Paginated, Risk, paginationProps } from "../interface";

export abstract class RiskServiceInterface {
    abstract getRisks: (pagination: paginationProps) => Promise<Paginated<Risk>>
}