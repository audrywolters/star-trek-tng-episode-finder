using Microsoft.AspNetCore.Mvc;
using StarTrekTNGApi.Repositories;

namespace StarTrekTNGApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FiltersController : ControllerBase
{
    private readonly IFilterRepository _repository;

    public FiltersController(IFilterRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetFilters()
    {
        try
        {
            var result = await _repository.GetFilters();

            return Ok(result);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);

            return StatusCode(500, new
            {
                error = "Failed to fetch filters",
                details = ex.Message
            });
        }
    }
}