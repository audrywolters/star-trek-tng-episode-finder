using StarTrekTNGApi.Models.Enums;
namespace StarTrekTNGApi.Models;

public class FilterItemDto
{
	public required int Id { get; set; }
	public required string Name { get; set; }
	public required FilterType Type { get; set;}
}