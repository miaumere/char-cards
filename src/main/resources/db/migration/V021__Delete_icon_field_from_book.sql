DO $$

BEGIN
        IF EXISTS
        ( SELECT 1
              FROM   information_schema.columns
              WHERE  table_schema = 'public'
              AND    table_name = 'character_story'
              AND    column_name='icon'
            )
            then
                ALTER TABLE book
                DROP COLUMN icon;

            end if;

           END
$$