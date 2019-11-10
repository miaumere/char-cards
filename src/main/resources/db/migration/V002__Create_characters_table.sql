CREATE TABLE character (
    external_id serial PRIMARY KEY,
    char_name VARCHAR(50) NOT NULL,
    char_surname VARCHAR(50) NOT NULL,
    birthday TIMESTAMP NOT NULL,
    death TIMESTAMP,
    story TEXT,
    eye_color1 VARCHAR(7) NOT NULL,
    eye_color2 VARCHAR(7) NOT NULL,
    theme_color1 VARCHAR(7) NOT NULL,
    theme_color2 VARCHAR(7) NOT NULL,
    theme_color3 VARCHAR(7) NOT NULL
)