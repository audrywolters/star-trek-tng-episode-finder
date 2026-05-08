using Microsoft.AspNetCore.Mvc;
using Dapper;
using StarTrekTNGApi.Data;
using StarTrekTNGApi.Models.DTOs;
using StarTrekTNGApi.Models.Enums;

namespace StarTrekTNGApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EpisodesController : ControllerBase
{
    private readonly DbConnectionFactory _factory;

    public EpisodesController(DbConnectionFactory factory)
    {
        _factory = factory;
    }

    [HttpPost("search")]
    public async Task<IActionResult> Search([FromBody] List<FilterItemDto> filters)
    {
        try
        {
            using var connection = _factory.CreateConnection();

            var characterIds = filters
                .Where(f => f.FilterType == FilterType.Character)
                .Select(f => f.Id)
                .ToArray();

            var genreIds = filters
                .Where(f => f.FilterType == FilterType.Genre)
                .Select(f => f.Id)
                .ToArray();

            var sql = @"
                SELECT
                    id,
                    season,
                    episode_number AS ""EpisodeNumber"",
                    title,
                    description,
                    image_url AS ""ImageUrl""
                FROM search_episodes(@character_ids, @genre_ids);
            ";

            var result = await connection.QueryAsync<EpisodeDto>(sql, new
            {
                character_ids = characterIds.Length == 0 ? null : characterIds,
                genre_ids = genreIds.Length == 0 ? null : genreIds
            });

            return Ok(result);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return StatusCode(500, new
            {
                error = "Something went wrong while fetching episodes",
                details = ex.Message
            });
        }
    }
}