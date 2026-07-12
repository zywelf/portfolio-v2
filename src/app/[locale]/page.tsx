import Navbar from '@/components/layout/Navbar'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Experience from '@/components/sections/Experience'
import Hero from '@/components/sections/Hero'
import Hobbies from '@/components/sections/Hobbies'
import Projects from '@/components/sections/Projects'

const api = process.env.RAWG_API_KEY

async function listGames() {
  const games = [
    'Destiny 2',
    'Expedition 33',
    'Shadow of Mordor: Middle of Earth',
    'Monster Hunter World',
    'Sekiro: Shadows Die Twice',
    'God of War (2018)',
  ]
  const results = await Promise.all(
    games.map(async (name) => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${api}&search=${name}`, {
          next: { revalidate: 86400 },
        })

        if (!response.ok) {
          console.error(`RAWG API error for "${name}": ${response.status}`)
          return null
        }
        const data = await response.json()
        const game = data.results?.[0]

        if (!game?.name || !game?.background_image) {
          return null
        }

        return {
          name: data.results[0]?.name,
          background_image: data.results[0]?.background_image,
        }
      } catch (error) {
        console.error(`RAWG API error for "${name}":`, error)
      }
    })
  )
  return results.filter((game): game is { name: string; background_image: string } => game !== null)
}

export default async function LocalPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Hobbies games={await listGames()} />
      <Contact />
    </main>
  )
}
