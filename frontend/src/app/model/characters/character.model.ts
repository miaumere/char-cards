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
  temperament: Temperament;
  quotes: Quote;
}

class Colors {
  eyeColor1: string;
  eyeColor2: string;
  themeColor1: string;
  themeColor2: string;
  themeColor3: string;
  hairColor: string;
  skinColor: string;
}

class Temperament {
  melancholic: number;
  sanguine: number;
  flegmatic: number;
  choleric: number;
}

class Quote {
  id: number;
  quote: string;
  context?: string;
}
