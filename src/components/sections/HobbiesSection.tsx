import { searchGames } from '@/lib/rawg'
import { FAVORITE_GAMES } from '@/data/games'
import Hobbies from './Hobbies'

export default async function HobbiesSection() {
  const games = await searchGames(FAVORITE_GAMES)
  return <Hobbies games={games} />
}
