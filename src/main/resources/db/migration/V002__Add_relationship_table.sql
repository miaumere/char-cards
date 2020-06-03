CREATE TABLE public.relationship (
	id int8 NOT NULL,
	relation_type varchar(255) NULL,
	character_id int8 NULL,
	side_character_id int8 NULL,
	CONSTRAINT relationship_pkey PRIMARY KEY (id),
	CONSTRAINT fk4auo2mdu10ryvpp7wr5686lmx FOREIGN KEY (side_character_id) REFERENCES side_character(external_id),
	CONSTRAINT fkr4i5jlscmc5c68rw3tkfapwq5 FOREIGN KEY (character_id) REFERENCES "character"(external_id)
);

ALTER TABLE public.side_character ALTER COLUMN side_character_desc set data type text using side_character_desc::text;

ALTER TABLE public.character DROP COLUMN story;