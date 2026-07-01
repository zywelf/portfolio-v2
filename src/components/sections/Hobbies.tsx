'use client'
import { useTranslations } from 'next-intl'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Section from '../layout/Section'
import SectionTitle from '../ui/SectionTitle'
import Image from 'next/image'
import SectionSubtitle from '../ui/SectionSubtitle'

type Game = {
  name: string
  background_image: string
}

interface HobbiesProps {
  games: Game[]
}

export default function Hobbies({ games }: HobbiesProps) {
  const t = useTranslations('hobbies')

  return (
    <Section id="hobbies">
      <SectionTitle>{t('title')}</SectionTitle>
      <SectionSubtitle text={t('games')} />
      <Carousel
        opts={{
          loop: true,
          align: 'start',
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent>
          {games.map((item, index) => (
            <CarouselItem key={index} className="basis-1/2">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={item.background_image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <p className="text-foreground text-sm mt-2 text-center">{item.name}</p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Section>
  )
}
