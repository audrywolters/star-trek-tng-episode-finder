namespace StarTrekTNGApi.Models.DTOs;

// this is the data used to search for episodes
// it is one Name (tab) and all it's Rows (searchButtons)
public class FilterCategoryDto
{
    // Character
    public required string Name { get; set; }

    // id: 1, name: Picard, id: 2, name: Riker
    public required List<FilterOptionDto> Rows { get; set; }
}