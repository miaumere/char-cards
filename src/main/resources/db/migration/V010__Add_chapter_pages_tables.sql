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
CREATE TABLE public.page (
     id int8 NOT NULL,
     file_location varchar(255) NULL,
     page_number int4 NULL,
     CONSTRAINT page_pkey PRIMARY KEY (id)
);

CREATE TABLE public.page_chapters (
      pages_id int8 NOT NULL,
      chapters_external_id int8 NOT NULL,
      CONSTRAINT page_chapters_pkey PRIMARY KEY (pages_id, chapters_external_id),
      CONSTRAINT fkg7nx6513p43wljn26qp8r40ds FOREIGN KEY (pages_id) REFERENCES page(id),
      CONSTRAINT fko4293qqj1csal5h1bfk7gouh6 FOREIGN KEY (chapters_external_id) REFERENCES chapter(external_id)
);
