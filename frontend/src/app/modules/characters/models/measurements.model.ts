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
    babyHeight: number | null = null;
    babyWeight: number | null = null;
    childHeight: number | null = null;
    childWeight: number | null = null;
    teenHeight: number | null = null;
    teenWeight: number | null = null;
    adultHeight: number | null = null;
    adultWeight: number | null = null;

    constructor(initialValues?: IMeasurements) {
        if (initialValues) {
            Object.assign(this, initialValues);
        } else {
            this.babyHeight = null;
            this.babyWeight = null;
            this.childHeight = null;
            this.childWeight = null;
            this.teenHeight = null;
            this.teenWeight = null;
            this.adultHeight = null;
            this.adultWeight = null;
        }
    }

    getValueWithUnit(value: number | null, type: 'height' | 'weight') {
        if (!!value) {
            switch (type) {
                case 'height':
                    return value + ' cm';

                case 'weight':
                    return value + ' kg';
            }
        } else {
            return null;
        }
    }

    get hasBabyValues() {
        return !!(this.babyHeight && this.babyWeight);
    }

    get hasChildValues() {
        return !!(this.childHeight && this.childWeight);
    }

    get hasTeenValues() {
        return !!(this.teenHeight || this.teenWeight);
    }

    get hasAdultValues() {
        return !!(this.adultHeight && this.adultWeight);
    }

    get hasAnyValues() {
        return !!(
            this.hasBabyValues ||
            this.hasChildValues ||
            this.hasTeenValues ||
            this.hasAdultValues
        );
    }
}
