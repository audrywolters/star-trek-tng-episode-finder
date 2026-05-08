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

CREATE TABLE genres (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL UNIQUE
);

CREATE TABLE episode_characters (
	episode_id INT NOT NULL REFERENCES episodes(id) ON DELETE CASCADE,
	character_id INT NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
	PRIMARY KEY (episode_id, character_id)
);

CREATE TABLE episode_genres (
	episode_id INT NOT NULL REFERENCES episodes(id) ON DELETE CASCADE,
	genre_id INT NOT NULL REFERENCES genres(id) ON DELETE CASCADE,
	PRIMARY KEY (episode_id, genre_id)
)