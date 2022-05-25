-- public.tag definition

-- Drop table

-- DROP TABLE public.tag;

CREATE TABLE public.tag (
	id int4 NOT NULL,
	color varchar(255) NULL,
	"name" varchar(255) NULL,
	CONSTRAINT tag_pkey PRIMARY KEY (id),
	CONSTRAINT ukhd8mr8xeuc0qpf8toc36w25w2 UNIQUE (name, color)
);


-- public.character_tag definition

-- Drop table

-- DROP TABLE public.character_tag;

CREATE TABLE public.character_tag (
	id int4 NOT NULL,
	character_id int8 NULL,
	tag_id int4 NULL,
	CONSTRAINT character_tag_pkey PRIMARY KEY (id)
);


-- public.character_tag foreign keys

ALTER TABLE public.character_tag ADD CONSTRAINT fkkhj4h4bfve0y7pdip3wpkt6gm FOREIGN KEY (tag_id) REFERENCES public.tag(id);
ALTER TABLE public.character_tag ADD CONSTRAINT fkl3hiky7voi1oq9qcqqeawibvw FOREIGN KEY (character_id) REFERENCES public."character"(external_id);