SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: book; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book (
    external_id bigint NOT NULL,
    book_order bigint,
    color character varying(255),
    name character varying(255)
);


ALTER TABLE public.book OWNER TO postgres;

--
-- Name: book_side_characters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book_side_characters (
    book_external_id bigint NOT NULL,
    side_characters_external_id bigint NOT NULL
);


ALTER TABLE public.book_side_characters OWNER TO postgres;

--
-- Name: character; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."character" (
    external_id bigint NOT NULL,
    archived boolean,
    birthday bigint,
    char_name character varying(255),
    char_surname character varying(255),
    death bigint,
    death_reason character varying(255),
    occupation character varying(255),
    story character varying(2000)
);


ALTER TABLE public."character" OWNER TO postgres;

--
-- Name: colors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.colors (
    id bigint NOT NULL,
    eye_color1 character varying(7),
    eye_color2 character varying(7),
    hair_color character varying(7),
    skin_color character varying(7),
    theme_color1 character varying(7),
    theme_color2 character varying(7),
    theme_color3 character varying(7),
    character_id bigint
);


ALTER TABLE public.colors OWNER TO postgres;

--
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hibernate_sequence OWNER TO postgres;

--
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    id bigint NOT NULL,
    extension character varying(255),
    image bytea,
    is_profile_pic boolean,
    name character varying(255),
    character_id bigint
);


ALTER TABLE public.images OWNER TO postgres;

--
-- Name: measurements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.measurements (
    id bigint NOT NULL,
    adult_height integer,
    adult_weight integer,
    baby_height integer,
    baby_weight integer,
    child_height integer,
    child_weight integer,
    teen_height integer,
    teen_weight integer,
    character_id bigint
);


ALTER TABLE public.measurements OWNER TO postgres;

--
-- Name: profile_pic; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile_pic (
    id bigint NOT NULL,
    extension character varying(255),
    name character varying(255),
    profile_pic bytea,
    character_id bigint
);


ALTER TABLE public.profile_pic OWNER TO postgres;

--
-- Name: quote; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quote (
    id bigint NOT NULL,
    context character varying(255),
    quote character varying(255),
    character_id bigint
);


ALTER TABLE public.quote OWNER TO postgres;

--
-- Name: side_character; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.side_character (
    external_id bigint NOT NULL,
    archived boolean,
    side_character_desc character varying(2000),
    side_character_name character varying(255),
    side_character_surname character varying(255)
);


ALTER TABLE public.side_character OWNER TO postgres;

--
-- Name: side_character_books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.side_character_books (
    side_character_external_id bigint NOT NULL,
    books_external_id bigint NOT NULL
);


ALTER TABLE public.side_character_books OWNER TO postgres;

--
-- Name: story; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.story (
    id bigint NOT NULL,
    story character varying(2000),
    character_id bigint,
    title_id bigint
);


ALTER TABLE public.story OWNER TO postgres;

--
-- Name: temperament; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.temperament (
    id bigint NOT NULL,
    choleric integer,
    flegmatic integer,
    melancholic integer,
    sanguine integer,
    character_id bigint
);


ALTER TABLE public.temperament OWNER TO postgres;

--
-- Name: titles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.titles (
    id bigint NOT NULL,
    sequence bigint,
    title character varying(255)
);


ALTER TABLE public.titles OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    external_id bigint NOT NULL,
    password character varying(255),
    username character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;


--
-- Name: book book_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_pkey PRIMARY KEY (external_id);


--
-- Name: character character_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."character"
    ADD CONSTRAINT character_pkey PRIMARY KEY (external_id);


--
-- Name: colors colors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_pkey PRIMARY KEY (id);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- Name: measurements measurements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.measurements
    ADD CONSTRAINT measurements_pkey PRIMARY KEY (id);


--
-- Name: profile_pic profile_pic_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_pic
    ADD CONSTRAINT profile_pic_pkey PRIMARY KEY (id);


--
-- Name: quote quote_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quote
    ADD CONSTRAINT quote_pkey PRIMARY KEY (id);


--
-- Name: side_character side_character_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.side_character
    ADD CONSTRAINT side_character_pkey PRIMARY KEY (external_id);


--
-- Name: story story_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.story
    ADD CONSTRAINT story_pkey PRIMARY KEY (id);


--
-- Name: temperament temperament_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temperament
    ADD CONSTRAINT temperament_pkey PRIMARY KEY (id);


--
-- Name: titles titles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.titles
    ADD CONSTRAINT titles_pkey PRIMARY KEY (id);


--
-- Name: colors uk_229p227dhlm0wiojlpd2860vh; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT uk_229p227dhlm0wiojlpd2860vh UNIQUE (character_id);


--
-- Name: temperament uk_8wkeyxmsc2ycuh75uhrhuesas; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temperament
    ADD CONSTRAINT uk_8wkeyxmsc2ycuh75uhrhuesas UNIQUE (character_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (external_id);


--
-- Name: book_side_characters fk3rpqvrp6nydrla23seqbwldv4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_side_characters
    ADD CONSTRAINT fk3rpqvrp6nydrla23seqbwldv4 FOREIGN KEY (book_external_id) REFERENCES public.book(external_id);


--
-- Name: temperament fk79kibl7yn07u79o2tf76e5wy0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temperament
    ADD CONSTRAINT fk79kibl7yn07u79o2tf76e5wy0 FOREIGN KEY (character_id) REFERENCES public."character"(external_id);


--
-- Name: story fkaajphy6ny1hq51pdyajd7ga90; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.story
    ADD CONSTRAINT fkaajphy6ny1hq51pdyajd7ga90 FOREIGN KEY (title_id) REFERENCES public.titles(id);


--
-- Name: measurements fkaq8kabhrwx2d0f1ydqf3usx4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.measurements
    ADD CONSTRAINT fkaq8kabhrwx2d0f1ydqf3usx4 FOREIGN KEY (character_id) REFERENCES public."character"(external_id);


--
-- Name: colors fkarq3o2hmikkq9j84e5yegk9iy; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT fkarq3o2hmikkq9j84e5yegk9iy FOREIGN KEY (character_id) REFERENCES public."character"(external_id);


--
-- Name: side_character_books fkcgvt3aq69bfrhtckytl5mruju; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.side_character_books
    ADD CONSTRAINT fkcgvt3aq69bfrhtckytl5mruju FOREIGN KEY (side_character_external_id) REFERENCES public.side_character(external_id);


--
-- Name: quote fkdxiy06e0rqfo9rir8khh9dxdj; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quote
    ADD CONSTRAINT fkdxiy06e0rqfo9rir8khh9dxdj FOREIGN KEY (character_id) REFERENCES public."character"(external_id);


--
-- Name: story fkhm4asuf5yhbp6s7fyngjeh379; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.story
    ADD CONSTRAINT fkhm4asuf5yhbp6s7fyngjeh379 FOREIGN KEY (character_id) REFERENCES public."character"(external_id);


--
-- Name: profile_pic fkj4hhsax5k89x601rh14fu5ds0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_pic
    ADD CONSTRAINT fkj4hhsax5k89x601rh14fu5ds0 FOREIGN KEY (character_id) REFERENCES public.side_character(external_id);


--
-- Name: images fkloqmlqn70lp3ehahelf93rku2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT fkloqmlqn70lp3ehahelf93rku2 FOREIGN KEY (character_id) REFERENCES public."character"(external_id);


--
-- Name: side_character_books fkovsemsw33kgrrfxm371lwy04l; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.side_character_books
    ADD CONSTRAINT fkovsemsw33kgrrfxm371lwy04l FOREIGN KEY (books_external_id) REFERENCES public.book(external_id);


--
-- Name: book_side_characters fkq3difwi0fxi5ameoepinvmhh5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_side_characters
    ADD CONSTRAINT fkq3difwi0fxi5ameoepinvmhh5 FOREIGN KEY (side_characters_external_id) REFERENCES public.side_character(external_id);

--
-- PostgreSQL database dump complete
--