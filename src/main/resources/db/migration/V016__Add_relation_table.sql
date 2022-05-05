-- public.relation definition

-- Drop table

-- DROP TABLE public.relation;

CREATE TABLE public.relation (
	id int4 NOT NULL,
	relation_date_end int8 NULL,
	relation_date_start int8 NULL,
	"type" varchar(255) NULL,
	x int4 NULL,
	y int4 NULL,
	character_id int8 NULL,
	character_related_to_id int8 NULL,
	CONSTRAINT relation_pkey PRIMARY KEY (id)
);


-- public.relation foreign keys

ALTER TABLE public.relation ADD CONSTRAINT fkgh68cu8ij05oe58gefd87nlfv FOREIGN KEY (character_related_to_id) REFERENCES public."character"(external_id);
ALTER TABLE public.relation ADD CONSTRAINT fkneyqorupvvkhahsnxciicel48 FOREIGN KEY (character_id) REFERENCES public."character"(external_id);