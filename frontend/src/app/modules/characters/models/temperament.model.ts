export interface ITemperament {
  melancholic: number;
  sanguine: number;
  flegmatic: number;
  choleric: number;
}

export class Temperament implements ITemperament {
  choleric: number;
  flegmatic: number;
  melancholic: number;
  sanguine: number;

  constructor(choleric, flegmatic, melancholic, sanguine) {
    this.choleric = choleric;
    this.flegmatic = flegmatic;
    this.melancholic = melancholic;
    this.sanguine = sanguine;
  }
}
