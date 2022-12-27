ALTER TABLE "character" ADD COLUMN IF NOT EXISTS "story" text;


CREATE OR REPLACE FUNCTION LoopThroughTable()
  RETURNS VOID
AS
$$
DECLARE
   t_row "character"%rowtype;
BEGIN
    FOR t_row in SELECT external_id  FROM "character" LOOP
        update "character"
            set story =(
            SELECT
				string_agg(
				    concat('<h2>', cs.title, '</h2> <p>' , cs.story_desc, '</p>'), ' '
				    ORDER BY cs.index_on_list
				)
				FROM "character_story" cs
				INNER JOIN "character" c
				ON cs.character_id = c.external_id
 				where c.external_id  = t_row.external_id
 				GROUP BY c.external_id
				order by c.external_id
       )
        where external_id  = t_row.external_id;
    END LOOP;
END;
$$
LANGUAGE plpgsql;


DO $$
BEGIN
        IF EXISTS
        ( SELECT 1
              FROM   information_schema.tables
              WHERE  table_schema = 'public'
              AND    table_name = 'character_story'
            )
            then

                PERFORM LoopThroughTable();

                DROP TABLE character_story;
            end if;

           END
$$



