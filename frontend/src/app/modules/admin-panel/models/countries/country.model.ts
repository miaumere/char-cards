
export interface ICountry {
  flag: string;
  name: string;
  alpha2Code: string;
}

export class Country implements ICountry {
  flag: string;
  name: string;
  alpha2Code: string;

  constructor(initialValues: ICountry) {
    Object.assign(this, initialValues);
  }
}
