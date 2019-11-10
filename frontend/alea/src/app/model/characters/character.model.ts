export class Character {
  externalId: number;
  charName: string;
  charSurname: string;
  birthday: number;
  death: number;
  deathReason: string;
  occupation: string;
  story: string;
  colors: Colors;
  imagesList: string[];
}

class Colors {
  eyeColor1: string;
  eyeColor2: string;
  themeColor1: string;
  themeColor2: string;
  themeColor3: string;
}
