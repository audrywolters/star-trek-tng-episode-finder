namespace StarTrekTNGApi.Models;

public class Episode
{
	public int Id { get; set; }
	public int Season { get; set; }
	public int EpisodeNumber { get; set; }
	public string Title { get; set; } = null!;
	public string Description { get; set; } = null!;
	public string? ImageUrl { get; set; }
}