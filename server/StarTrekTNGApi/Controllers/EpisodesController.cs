using Microsoft.AspNetCore.Mvc;
using Dapper;
using StarTrekTNGApi.Data;
using StarTrekTNGApi.Models;

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
    public async Task<IActionResult> Search([FromBody] List<FilterItem> filters)
    {
        using var connection = _factory.CreateConnection();

        var sql = "SELECT * FROM episodes";

        var result = await connection.QueryAsync<Episode>(sql);

        return Ok(result);
    }
}