using Microsoft.AspNetCore.Mvc;
using Dapper;
using StarTrekTNGApi.Data;
using StarTrekTNGApi.Models;
using StarTrekTNGApi.Models.DTOs;

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

            var sql = "SELECT * FROM episodes";

            var result = await connection.QueryAsync<Episode>(sql);

            return Ok(result);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex); // shows error in terminal
            return StatusCode(500, ex.Message); // sends readable error to React
        }

    }
}