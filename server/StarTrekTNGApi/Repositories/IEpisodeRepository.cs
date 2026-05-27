using StarTrekTNGApi.Models.DTOs;

namespace StarTrekTNGApi.Repositories;

public interface IEpisodeRepository
{
    Task<IEnumerable<EpisodeDto>> SearchEpisodes(
        int[]? characterIds,
        int[]? genreIds
    );
}