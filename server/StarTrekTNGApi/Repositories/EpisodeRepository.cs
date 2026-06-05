using Dapper;
using StarTrekTNGApi.Data;
using StarTrekTNGApi.Models.DTOs;

namespace StarTrekTNGApi.Repositories;

public class EpisodeRepository : IEpisodeRepository
{
    private readonly DbConnectionFactory _factory;

    public EpisodeRepository(DbConnectionFactory factory)
    {
        _factory = factory;
    }

    public async Task<IEnumerable<EpisodeDto>> SearchEpisodes(
        int[]? characterIds,
        int[]? themeIds
    )
    {
        using var connection = _factory.CreateConnection();

        var sql = @"
            SELECT
                id,
                season,
                episode_number AS ""EpisodeNumber"",
                title,
                description,
                image_url AS ""ImageUrl""
            FROM search_episodes(@character_ids, @theme_ids);
        ";

        var result = await connection.QueryAsync<EpisodeDto>(
            sql,
            new
            {
                character_ids = characterIds,
                theme_ids = themeIds
            });

        return result;
    }
}