ALTER TABLE public.book
ADD symbol varchar(255);

ALTER TABLE public.chapter
  ADD action_place varchar(255),
  ADD action_time varchar(255),
  ADD  create_date int8,
  ADD  visible bool;

DROP TABLE public.relationship;