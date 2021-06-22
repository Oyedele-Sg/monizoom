import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Landing from './landing'

export default function Home() {
  return (
    <div >
      <Head>
        <title>MoniZoom</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Landing />
    </div>
  )
}
