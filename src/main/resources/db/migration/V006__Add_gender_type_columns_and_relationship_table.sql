ALTER TABLE public."character" ADD "gender" varchar(255);

CREATE TABLE public."relationship" (
         id int4 NOT NULL,
         relation_name varchar(255) NULL,
         character_id int8 NULL,
         related_character_id int8 NULL,
         CONSTRAINT relationship_pkey PRIMARY KEY (id),
         CONSTRAINT fkagg1jplnf5nrxpnk48h1ecg7c FOREIGN KEY (related_character_id) REFERENCES "character"(external_id),
         CONSTRAINT fkr4i5jlscmc5c68rw3tkfapwq5 FOREIGN KEY (character_id) REFERENCES "character"(external_id)
);

