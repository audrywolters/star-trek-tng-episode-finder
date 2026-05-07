namespace StarTrekTNGApi.Models.DTOs;
using StarTrekTNGApi.Models.Enums;

public class FilterItemDto
{
	public required int Id { get; set; }
	public required string Name { get; set; }
	public required FilterType FilterType { get; set;}
}