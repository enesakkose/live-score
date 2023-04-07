'use client'
import React, { useState , Suspense} from 'react'
import { useQuery } from '@tanstack/react-query'
import EventRow from '../Row'
import Timezone from '@/components/Events/Timezone'
import TournamentHeader from '@/components/Events/Header'
import styles from './Content.module.scss'
import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from '@/components/AccordionMenu'
import ClientOnly from '../ClientOnly'
import { getEvents, getEvent } from '@/utils/hooks'
import { TEMPLATE_SPORTS } from '@/utils/helpers/TournamentsTemplate'
import Loading from './loading'

type TimezoneType = 'all' | 'live'

function Content({ id = 1 }: { id: number }) {
  //const [timezone, setTimezone] = useState<TimezoneType>('all')
  //const [ date, setDate ] = useState(0)
  const { data, isLoading, error } = useQuery(['events', id], () => getEvent(id, 0))

  //if (isLoading) return 'Loading...'
  const popularTournaments = data?.filter(t => TEMPLATE_SPORTS.includes(t.TEMPLATE_ID))

  return (
    <ClientOnly A={Loading}>
      <Timezone />
      {popularTournaments?.map((tournament, index) => (
        <Accordion
          key={index}
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
              {tournament.EVENTS.map((match, index) => (
                <EventRow
                  key={index}
                  href={`/event/${match.EVENT_ID}`}
                  event={match}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </ClientOnly>
  )
}

export default Content
