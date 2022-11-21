package com.meowmere.main.requests.characters.quotes;

import lombok.Getter;
import lombok.Setter;

public class UpsertQuoteRequest {
    @Getter
    @Setter
    private Long quoteId;
    @Getter
    @Setter
    private String quote;
    @Getter
    @Setter
    private String context;
    @Getter
    @Setter
    private Long characterId;

}
