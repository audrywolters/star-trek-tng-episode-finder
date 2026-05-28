namespace StarTrekTNGApi.Models.DTOs;

public class FilterCategoryDto
{
    public required string Name { get; set; }

    public required List<FilterOptionDto> Rows { get; set; }
}