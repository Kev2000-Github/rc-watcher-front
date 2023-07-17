
export type Boolify<Fields> = {
    [Key in keyof Fields]: boolean|undefined
}