CREATE TABLE episodes (
  id SERIAL PRIMARY KEY,
  season INT NOT NULL,
  episode_number INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT
);