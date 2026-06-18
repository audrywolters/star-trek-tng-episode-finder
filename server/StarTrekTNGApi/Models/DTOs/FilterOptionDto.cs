namespace StarTrekTNGApi.Models.DTOs;

// a filter option available for selection
public class FilterOptionDto
{
    public int Id { get; set; }

    // display name of the filter option (e.g. "Picard")
    public string Name { get; set; } = null!;
}