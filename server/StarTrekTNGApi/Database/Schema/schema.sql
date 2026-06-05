CREATE TABLE episodes (
  id SERIAL PRIMARY KEY,
  season INT NOT NULL,
  episode_number INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT
);

CREATE TABLE characters (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL UNIQUE
);

CREATE TABLE themes (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL UNIQUE
);

CREATE TABLE episode_characters (
	episode_id INT NOT NULL REFERENCES episodes(id) ON DELETE CASCADE,
	character_id INT NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
	PRIMARY KEY (episode_id, character_id)
);

CREATE TABLE episode_themes (
	episode_id INT NOT NULL REFERENCES episodes(id) ON DELETE CASCADE,
	theme_id INT NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
	PRIMARY KEY (episode_id, theme_id)
)

select * from episodes

SELECT *
FROM search_episodes(NULL, NULL);
