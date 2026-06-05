using Microsoft.AspNetCore.Mvc;
using StarTrekTNGApi.Models.DTOs;
using StarTrekTNGApi.Models.Enums;
using StarTrekTNGApi.Repositories;

namespace StarTrekTNGApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EpisodesController : ControllerBase
{
    private readonly IEpisodeRepository _repository;

    public EpisodesController(IEpisodeRepository repository)
    {
        _repository = repository;
    }

    [HttpPost("search")]
    public async Task<IActionResult> Search(
        [FromBody] List<FilterItemDto> filters)
    {
        try
        {
            var characterIds = filters
                .Where(f => f.FilterType == FilterType.Character)
                .Select(f => f.Id)
                .ToArray();

            var themeIds = filters
                .Where(f => f.FilterType == FilterType.Theme)
                .Select(f => f.Id)
                .ToArray();

            var episodes = await _repository.SearchEpisodes(
                characterIds.Length == 0 ? null : characterIds,
                themeIds.Length == 0 ? null : themeIds
            );

            return Ok(episodes);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);

            return StatusCode(500, new
            {
                error = "Failed to fetch episodes",
                details = ex.Message
            });
        }
    }
}