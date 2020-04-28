export interface IMeasurements {
  babyHeight: number | null;
  babyWeight: number | null;
  childHeight: number | null;
  childWeight: number | null;
  teenHeight: number | null;
  teenWeight: number | null;
  adultHeight: number | null;
  adultWeight: number | null;
}

export class Measurements implements IMeasurements {
  babyHeight: number | null;
  babyWeight: number | null;
  childHeight: number | null;
  childWeight: number | null;
  teenHeight: number | null;
  teenWeight: number | null;
  adultHeight: number | null;
  adultWeight: number | null;

  constructor(initialValues: IMeasurements) {
    Object.assign(this, initialValues);
  }

  get hasBabyValues() {
    return !!(this.babyHeight && this.babyWeight);
  }

  get hasChildValues() {
    return !!(this.childHeight && this.childWeight);
  }

  get hasTeenValues() {
    return !!(this.teenHeight && this.teenWeight);
  }

  get hasAdultValues() {
    return !!(this.adultHeight && this.adultWeight);
  }

  get hasAnyValues() {
    return !!(this.hasBabyValues || this.hasChildValues || this.hasTeenValues || this.hasAdultValues);
  }
}
