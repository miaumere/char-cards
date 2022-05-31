-- public.relation_coordinates definition

-- Drop table

-- DROP TABLE public.relation_coordinates;

CREATE TABLE public.relation_coordinates (
	id serial NOT NULL,
	x_target int4 NULL,
	y_target int4 NULL,
	id_source int8 NULL,
	id_target int8 NULL,
	CONSTRAINT relation_coordinates_pkey PRIMARY KEY (id),
	CONSTRAINT ukgrc72ky4bt9c8x3qwnmpb8imt UNIQUE (id_source, id_target)
);


-- public.relation_coordinates foreign keys

ALTER TABLE public.relation_coordinates ADD CONSTRAINT fk4ync4qt2p0rp2mds4x99b59ub FOREIGN KEY (id_source) REFERENCES public."character"(external_id);
ALTER TABLE public.relation_coordinates ADD CONSTRAINT fkokmscpk5jq6a77fpw2df137y3 FOREIGN KEY (id_target) REFERENCES public."character"(external_id);