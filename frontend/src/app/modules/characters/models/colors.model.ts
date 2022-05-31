export interface IColors {
    eyeColor1: string;
    eyeColor2: string;
    themeColor1: string;
    themeColor2: string;
    themeColor3: string;
    hairColor: string;
    skinColor: string;
}
export class Colors implements IColors {
    eyeColor1: string = '';
    eyeColor2: string = '';
    themeColor1: string = '';
    themeColor2: string = '';
    themeColor3: string = '';
    hairColor: string = '';
    skinColor: string = '';
}
