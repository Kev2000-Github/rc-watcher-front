import { Overview } from "../interface";

export abstract class OverviewServiceInterface {
    abstract getOverview: () => Promise<Overview>
}