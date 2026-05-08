using Microsoft.AspNetCore.Mvc;
using Dapper;
using StarTrekTNGApi.Data;
using StarTrekTNGApi.Models;
using StarTrekTNGApi.Models.DTOs;
using StarTrekTNGApi.Models.Enums;

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
                SELECT *
                FROM search_episodes(@CharacterIds, @GenreIds)
            ";

            var result = await connection.QueryAsync<Episode>(
                sql,
                new
                {
                    CharacterIds = characterIds.Length > 0 ? characterIds : null,
                    GenreIds = genreIds.Length > 0 ? genreIds : null
                }
            );

            return Ok(result);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(500, ex.Message);
        }
    }
}