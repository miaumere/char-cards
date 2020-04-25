CREATE TABLE public.character_story (
    id int8 NOT NULL,
    index_on_list int4 NULL,
    story_desc varchar(255) NULL,
    title varchar(255) NULL,
    character_id int8 NULL,
    CONSTRAINT character_story_pkey PRIMARY KEY (id),
    CONSTRAINT ukpxa664cslsmqmajs86l8h165n UNIQUE (character_id, index_on_list),
    CONSTRAINT fkmwnq2w7tnubs27mq4hxepco0u FOREIGN KEY (character_id) REFERENCES "character"(external_id)
);
