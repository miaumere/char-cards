
-- Rewrite 'side_character' to 'character' table
insert into public."character" (external_id, char_name, char_surname, archived)
select external_id, side_character_name, side_character_surname, archived from public."side_character";
update public."character" set character_type = 'SIDE' where character_type is null;


-- Fill 'colors' table
insert into public."colors" (id, character_id)
(select (nextval('hibernate_sequence')) as seq_num, c.external_id char_id
from public."character" c
left join public."colors" o on c.external_id = o.character_id
where o.character_id is null);


-- Fill 'temperament' table
insert into public."temperament" (id, character_id)
(select (nextval('hibernate_sequence')) as seq_num, c.external_id char_id
from public."character" c
left join public."temperament" o on c.external_id = o.character_id
where o.character_id is null);

-- Fill 'measurements' table
insert into public."measurements" (id, character_id)
    (select (nextval('hibernate_sequence')) as seq_num, c.external_id char_id
     from public."character" c
              left join public."measurements" o on c.external_id = o.character_id
     where o.character_id is null);


-- Rewrite 'profile_pic' to 'images' table
insert into public."images" ("id", "extension", "name", "image", "character_id", "is_profile_pic" )
select "id", "extension", "name", "profile_pic", "character_id", (true) from public."profile_pic";


-- Fill story from side_char desc
DO $$
DECLARE
    title_id int = (select nextval('hibernate_sequence'))::int;
BEGIN
    insert into public."titles" (id, "sequence", title) values
    (title_id, (select count(*)  from public."titles"), 'Opis');

    insert into public."story" (id, story, character_id, title_id)
    select nextval('hibernate_sequence') as seq, side_character_desc, external_id, title_id from public.side_character;
END $$;


drop table public."relationship";
drop table public."profile_pic";
drop table public."side_character_books";
drop table public."book_side_characters";
drop table public."side_character";