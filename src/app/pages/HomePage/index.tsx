import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { MusicCard } from './components/MusicCard';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>My Hololive music collection</title>
        <meta name="description" content="My Hololive music collection" />
      </Helmet>

      <MusicCard />
    </>
  );
}
