import { listGames } from '@/lib/rawg'
import Hobbies from './Hobbies'

export default async function HobbiesSection() {
  const games = await listGames()
  return <Hobbies games={games} />
}
