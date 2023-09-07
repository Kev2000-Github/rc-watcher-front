import { AML } from "../interface";

export type AMLFilter = {
    name: string,
    country?: string
}

export abstract class AMLServiceInterface {
    abstract getAML: (props: AMLFilter) => Promise<AML>
}