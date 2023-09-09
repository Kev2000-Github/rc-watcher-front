import { Country } from "../interface";

export abstract class CountryServiceInterface {
    abstract getCountries: () => Promise<Country[]>
}