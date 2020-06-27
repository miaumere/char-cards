CREATE TABLE public.preference (
   id int8 NOT NULL,
   date_of_origin timestamp NULL,
   "range" int4 NULL,
   character_id int8 NULL,
   prefered_character_id int8 NULL,
   CONSTRAINT preference_pkey PRIMARY KEY (id),
   CONSTRAINT preference_range_check CHECK (((range <= 100) AND (range >= 0))),
   CONSTRAINT ukrtaafgohr0gjelb8filiu33gl UNIQUE (character_id, prefered_character_id, date_of_origin),
   CONSTRAINT fkdh4t7o18kf9vt34m7mo3tlhks FOREIGN KEY (character_id) REFERENCES "character"(external_id),
   CONSTRAINT fkk1rigda8ffljrl9fs302b8p8v FOREIGN KEY (prefered_character_id) REFERENCES "character"(external_id)
);
