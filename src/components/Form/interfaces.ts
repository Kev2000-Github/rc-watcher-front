
export type Boolify<Fields> = {
    [Key in keyof Fields]: boolean|undefined
}

export type BoolifyInnerTwo<T> = {
    [K in keyof T]: {
      [P in keyof T[K]]: boolean;
    };
  };