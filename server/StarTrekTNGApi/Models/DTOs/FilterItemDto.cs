namespace StarTrekTNGApi.Models.DTOs;
using StarTrekTNGApi.Models.Enums;

// this is a single filter selected by the user
public class FilterItemDto
{
	public required int Id { get; set; }
	
	// Display name of the filter option (e.g. "Picard")
	public required string Name { get; set; }

	// Type of filter (e.g. Character, Theme)
	public required FilterType FilterType { get; set;}
}