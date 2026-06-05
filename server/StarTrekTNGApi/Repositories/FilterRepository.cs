using Dapper;
using StarTrekTNGApi.Data;
using StarTrekTNGApi.Models.DTOs;

namespace StarTrekTNGApi.Repositories;

public class FilterRepository : IFilterRepository
{
    private readonly DbConnectionFactory _factory;

    public FilterRepository(DbConnectionFactory factory)
    {
        _factory = factory;
    }

    public async Task<IEnumerable<FilterCategoryDto>> GetFilters()
    {
        using var connection = _factory.CreateConnection();

        var characters = await connection.QueryAsync<FilterOptionDto>(@"
            SELECT
                id,
                name
            FROM characters
            ORDER BY id;
        ");

        var themes = await connection.QueryAsync<FilterOptionDto>(@"
            SELECT
                id,
                name
            FROM themes
            ORDER BY id;
        ");

        var result = new List<FilterCategoryDto>
        {
            new()
            {
                Name = "Character",
                Rows = characters.ToList()
            },

            new()
            {
                Name = "Theme",
                Rows = themes.ToList()
            }
        };

        return result;
    }
}