
CREATE TABLE public.starring_characters (
    external_id int8 NOT NULL,
    starring_type varchar(255) NULL,
    chapter_id int8 NULL,
    character_id int8 NULL,
    CONSTRAINT starring_characters_pkey PRIMARY KEY (external_id),
    CONSTRAINT ukcqmbcyl0qw4ygncirtqr2vj62 UNIQUE (character_id, chapter_id),
    CONSTRAINT fkfckarp3s72qt0iymwo2ctqevs FOREIGN KEY (chapter_id) REFERENCES chapter(external_id),
    CONSTRAINT fknopdm19n0ts4akovocg1s57ee FOREIGN KEY (character_id) REFERENCES "character"(external_id)
);
