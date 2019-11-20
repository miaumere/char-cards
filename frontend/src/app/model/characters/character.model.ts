export class Character {
  externalId: number;
  charName: string;
  charSurname: string;
  birthday: number;
  death: number;
  deathReason: string;
  occupation: string;
  story: Story[];
  colors: Colors;
  imagesList: string[];
  temperament: Temperament;
  measurements: Measurements;
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

class Measurements {
  babyHeight: number;
  babyWeight: number;
  childHeight: number;
  childWeight: number;
  teenHeight: number;
  teenWeight: number;
  adultHeight: number;
  adultWeight: number;
}

class Story {
  id: number;
  title: string;
  story: string;
}
