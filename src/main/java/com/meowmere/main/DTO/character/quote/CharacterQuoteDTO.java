package com.meowmere.main.DTO.character.quote;

public class CharacterQuoteDTO {
    public Long id;
    public String quote;
    public String context;

    public Long getId() {
        return id;
    }

    public String getQuote() {
        return quote;
    }

    public void setQuote(String quote) {
        this.quote = quote;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }
}
