import type { Category, Event } from '@/types'
import type { Data } from '@/types/event.types'
import type { H2H } from '@/types/H2HTypes'
import type { FootballEventSummary, PlayerStats } from '@/types/Summary.types'
import type { EventStats } from '@/types/EventStats'
import type { EventLineups } from '@/types/EventLineups.jsx'
import { env } from '../../env.mjs'
import { useQuery } from '@tanstack/react-query'

const BASE_URL = 'https://flashscore.p.rapidapi.com'
const OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'a1080941e0msh61eed144007ab0cp10d97ajsn4ed9d98415c8',
    'X-RapidAPI-Host': 'flashscore.p.rapidapi.com',
  },
}
//flashlive-sports.p.rapidapi.com
//https://flashlive-sports.p.rapidapi.com
//https://flashscore.p.rapidapi.com
/*const getEvents = async (id: number): Promise<Data[]> => {
  const response = await fetch(
    `${BASE_URL}/v1/events/live-list?locale=en_INT&timezone=-4&sport_id=${id}`,
    OPTIONS
  )
  const data: Category = await response.json()
  return data.DATA
}*/


const a = async() => {
  const resp = await fetch("https://api.sofascore.com/api/v1/sport/basketball/scheduled-events/2023-05-17", {
    "headers": {
      "accept": "*/*",
      "accept-language": "tr,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
      "cache-control": "max-age=0",
      "if-none-match": "W/\"563dba55bd\"",
      "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Microsoft Edge\";v=\"109\", \"Chromium\";v=\"109\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site"
    },
    "referrer": "https://www.sofascore.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "omit"
  })

  return await resp.json()
}

const getEvent = async (id: string) => {
  const resp = await fetch(
    `${BASE_URL}/v1/events/data?locale=en_INT&event_id=${id}`,
    { ...OPTIONS, cache: 'no-store' }
  )
  const { DATA }: { DATA: Data } = await resp.json()
  return DATA
}

const getEvents = async (id: number, time?: number) => {
  const resp = await fetch(
    `${BASE_URL}/v1/events/list?sport_id=${id}&timezone=-4&indent_days=0&locale=en_INT`,
    { ...OPTIONS, cache: 'no-store' }
  )
  const data: Category = await resp.json()
  return data.DATA
}

const getLiveEvents = async (id: number) => {
  const resp = await fetch(
    `${BASE_URL}/v1/events/live-list?locale=en_INT&timezone=-4&sport_id=${id}`,
    { ...OPTIONS, cache: 'no-store' }
  )

  const data: Category = await resp.json()
  return data.DATA
}

const getH2HEvents = async (id: string) => {
  const resp = await fetch(
    `${BASE_URL}/v1/events/h2h?event_id=${id}&locale=en_INT`,
    { ...OPTIONS }
  )

  const data: H2H = await resp.json()
  return data.DATA
}

const getEventSummary = async (id: string) => {
  const resp = await fetch(
    `${BASE_URL}/v1/events/summary?locale=en_INT&event_id=${id}`,
    { ...OPTIONS }
  )

  const data: FootballEventSummary = await resp.json()
  return data
}

const getEventLineups = async(id: string) => {
  const resp = await fetch(`${BASE_URL}/v1/events/lineups?event_id=${id}&locale=en_INT`, { ...OPTIONS })

  const data: EventLineups = await resp.json()
  return data.DATA
}

const getBasketPlayerStats = async (id: string) => {
  const resp = await fetch(
    `${BASE_URL}/v1/events/player-statistics-alt?locale=en_INT&event_id=${id}`,
    { ...OPTIONS }
  )

  const data: PlayerStats = await resp.json()
  return data.DATA
}

const getEventStats = async (id: string) => {
  const resp = await fetch(
    `${BASE_URL}/v1/events/statistics?event_id=${id}&locale=en_INT`,
    { ...OPTIONS }
  )

  const data: EventStats = await resp.json()
  return data.DATA
}

export const useGetEvents = (id: number = 1, timezone: 'live' | 'all') => {
  return useQuery(['events', id, timezone], () =>
    timezone === 'live' ? getLiveEvents(id) : getEvents(id)
  )
}

export const useGetEvent = (id: string) => {
  return useQuery(['event', id], () => getEvent(id))
}

export const useGetH2HEvents = (id: string) => {
  return useQuery(['h2hEvents', id], () => getH2HEvents(id))
}

export const useGetEventSummary = (id: string) => {
  return useQuery(['eventSummary', id], () => getEventSummary(id))
}

export const useGetBasketPlayerStats = (id: string) => {
  return useQuery(['playerStats', id], () => getBasketPlayerStats(id))
}

export const useGetEventStats = (id: string) => {
  return useQuery(['eventStats', id], () => getEventStats(id))
}

export const useGetEventLineups = (id: string) => {
  return useQuery(['eventLineups', id], () => getEventLineups(id))
}

export const useA = () => {
  return useQuery(['a'], () => a())
}

