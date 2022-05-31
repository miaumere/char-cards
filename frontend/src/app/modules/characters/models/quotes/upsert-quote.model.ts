export class UpsertQuote {
    quoteId: number | null = null;
    characterId: number = 0;

    quote: string = '';
    context: string = '';

    constructor(
        formValue: { quote: string; context: string },
        characterId: number,
        quoteId: number | null
    ) {
        this.characterId = characterId;
        this.quoteId = quoteId;

        this.quote = formValue.quote;
        this.context = formValue.context;
    }
}
