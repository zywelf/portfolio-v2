import Navbar from '@/components/layout/Navbar'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Experience from '@/components/sections/Experience'
import Hero from '@/components/sections/Hero'
import HobbiesSection from '@/components/sections/HobbiesSection'
import HobbiesSkeleton from '@/components/sections/HobbiesSkeleton'
import Projects from '@/components/sections/Projects'
import { Suspense } from 'react'

export default async function LocalPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Suspense fallback={<HobbiesSkeleton />}>
        <HobbiesSection />
      </Suspense>
      <Contact />
    </main>
  )
}
