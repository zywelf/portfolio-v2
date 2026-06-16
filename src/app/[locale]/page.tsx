import Navbar from "@/components/layout/Navbar"
import About from "@/components/sections/About"
import Experience from "@/components/sections/Experience"
import Hero from "@/components/sections/Hero"

export default function LocalPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <Hero />
            <About />
            <Experience />
        </main>
    )
}