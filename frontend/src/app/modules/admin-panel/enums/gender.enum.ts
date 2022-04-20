export enum Gender {
    MALE,
    FEMALE,
    NONBINARY,
    UNKNOWNGENDER,
}

export type GenderString = keyof typeof Gender;
