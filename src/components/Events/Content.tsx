'use client'
import React, { useState , Suspense} from 'react'
import { useQuery } from '@tanstack/react-query'
import EventRow from '@/components/Events/Row'
import Timezone from '@/components/Events/Timezone'
import TournamentHeader from '@/components/Events/Header'
import styles from '@/components/Events/Content.module.scss'
import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from '@/components/AccordionMenu'
import { getEvents, getEvent } from '@/utils/hooks'
import { TEMPLATE_SPORTS } from '@/utils/helpers/TournamentsTemplate'

type TimezoneType = 'all' | 'live'

function Content({ id = 1 }: { id: number }) {
  //const [timezone, setTimezone] = useState<TimezoneType>('all')
  //const [ date, setDate ] = useState(0)
  const { data, isLoading, error } = useQuery(['events', id], () =>
    getEvent(id, 0)
  )

  //if (isLoading) return 'Loading...'
  const popularTournaments = data?.filter(t => TEMPLATE_SPORTS.includes(t.TEMPLATE_ID))

  return (
    <Suspense fallback={<>Loading...</>}>
      <Timezone />
      {data?.map((tournament) => (
        <Accordion
          key={tournament.TOURNAMENT_ID}
          className={styles.tournamentEvents}
        >
          <AccordionItem>
            <AccordionHeader className={styles.accordionHeader}>
              <TournamentHeader
                tournamentImage={tournament.TOURNAMENT_IMAGE}
                tournamentName={tournament.NAME}
              />
            </AccordionHeader>
            <AccordionContent>
              {tournament.EVENTS.map((match) => (
                <EventRow
                  key={match.EVENT_ID}
                  href={`/event/${match.EVENT_ID}`}
                  event={match}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </Suspense>
  )
}

export default Content
