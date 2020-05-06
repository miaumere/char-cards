-- Drop table

-- DROP TABLE public.chapter;

CREATE TABLE public.chapter (
    external_id int8 NOT NULL,
    chapter_desc varchar(255) NULL,
    chapter_number int4 NULL,
    name varchar(255) NULL,
    book_id int8 NULL,
    CONSTRAINT chapter_pkey PRIMARY KEY (external_id),
    CONSTRAINT ukqqh3dsnxqcjayge3i1ypwjii7 UNIQUE (book_id, chapter_number),
    CONSTRAINT fkfxaijiug52tyrl5ifextmcfqb FOREIGN KEY (book_id) REFERENCES book(external_id)
);
