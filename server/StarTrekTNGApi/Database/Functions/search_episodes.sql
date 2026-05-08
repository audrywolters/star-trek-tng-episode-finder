CREATE OR REPLACE FUNCTION search_episodes(
    character_ids INT[],
    genre_ids INT[]
)
RETURNS TABLE (
    id INT,
    season INT,
    episode_number INT,
    title TEXT,
    description TEXT,
    image_url TEXT
)
LANGUAGE sql
AS $$
    SELECT e.*
    FROM episodes e

    WHERE (
        character_ids IS NULL
        OR e.id IN (
            SELECT ec.episode_id
            FROM episode_characters ec
            WHERE ec.character_id = ANY(character_ids)
            GROUP BY ec.episode_id
            HAVING COUNT(DISTINCT ec.character_id) = array_length(character_ids, 1)
        )
    )

    AND (
        genre_ids IS NULL
        OR e.id IN (
            SELECT eg.episode_id
            FROM episode_genres eg
            WHERE eg.genre_id = ANY(genre_ids)
            GROUP BY eg.episode_id
            HAVING COUNT(DISTINCT eg.genre_id) = array_length(genre_ids, 1)
        )
    );
$$;