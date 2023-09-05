import { Regulation } from "../interface";

export abstract class RegulationServiceInterface {
    abstract getRegulations: () => Promise<Regulation[]>
}