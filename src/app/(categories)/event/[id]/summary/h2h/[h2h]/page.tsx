import React from 'react'
import H2HContainer from '@/containers/H2HContainer'
import NavLink from '@/components/UI/NavLink'

type H2hParamsType = {
  params: {
    id: string
    h2h: string
  }
}

function Page({ params }: H2hParamsType) {
  return <H2HContainer h2h={Number(params.h2h)} eventId={params.id} />
}

export default Page
