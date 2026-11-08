import type { Game } from '@/types'

const api = process.env.RAWG_API_KEY

// Looks up each title on RAWG and returns the ones with a name and cover image
export async function searchGames(titles: string[]): Promise<Game[]> {
  if (!api) {
    console.warn('RAWG_API_KEY is not set, skipping games fetch')
    return []
  }
  const results = await Promise.all(
    titles.map(async (name) => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${api}&search=${encodeURIComponent(name)}`,
          {
            next: { revalidate: 86400 },
            // Don't let a slow or offline RAWG keep the Hobbies section stuck on the skeleton
            signal: AbortSignal.timeout(4000),
          }
        )

        if (!response.ok) {
          console.warn(`RAWG API error for "${name}": ${response.status}`)
          return null
        }
        const data = await response.json()
        const game = data.results?.[0]

        if (!game?.name || !game?.background_image) {
          return null
        }

        return {
          name: game.name,
          background_image: game.background_image,
        }
      } catch (error) {
        // warn, not error: RAWG being down is expected and handled by the fallback
        console.warn(`RAWG API error for "${name}": ${error instanceof Error ? error.message : error}`)
        return null
      }
    })
  )
  return results.filter((game): game is Game => game !== null)
}
