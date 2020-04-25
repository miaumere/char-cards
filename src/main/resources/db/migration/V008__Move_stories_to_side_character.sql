insert into public."character_story" (id, title, index_on_list, story_desc, character_id)
select (nextval('hibernate_sequence')) as seq_num,
       (select titles.title from public."titles" where titles.id = title_id),
       (select titles."sequence" from public."titles" where titles.id = title_id),
       story, character_id from public."story";
