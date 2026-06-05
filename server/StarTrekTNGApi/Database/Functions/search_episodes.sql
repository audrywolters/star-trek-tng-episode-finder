DROP FUNCTION search_episodes(INT[], INT[]);


CREATE OR REPLACE FUNCTION search_episodes(
    character_ids INT[],
    theme_ids INT[]
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
    SELECT
        e.id,
        e.season,
        e.episode_number,
        e.title,
        e.description,
        e.image_url
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
        theme_ids IS NULL
        OR e.id IN (
            SELECT et.episode_id
            FROM episode_themes et
            WHERE et.theme_id = ANY(theme_ids)
            GROUP BY et.episode_id
            HAVING COUNT(DISTINCT et.theme_id) = array_length(theme_ids, 1)
        )
    );
$$;