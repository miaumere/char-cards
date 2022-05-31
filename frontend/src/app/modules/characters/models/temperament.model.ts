export interface ITemperament {
    melancholic: number;
    sanguine: number;
    flegmatic: number;
    choleric: number;
}

export class Temperament implements ITemperament {
    choleric: number = 0;
    flegmatic: number = 0;
    melancholic: number = 0;
    sanguine: number = 0;

    constructor(
        choleric: number,
        flegmatic: number,
        melancholic: number,
        sanguine: number
    ) {
        this.choleric = choleric;
        this.flegmatic = flegmatic;
        this.melancholic = melancholic;
        this.sanguine = sanguine;
    }
}
