using StarTrekTNGApi.Models.DTOs;

namespace StarTrekTNGApi.Repositories;

public interface IFilterRepository
{
    Task<IEnumerable<FilterCategoryDto>> GetFilters();
}