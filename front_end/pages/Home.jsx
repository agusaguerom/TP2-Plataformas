import { RecentsReleases } from "../src/Components/RecentsRelease/RecentsRelease";
import { GlobalRanking } from "../src/components/GlobalRanking/GlobalRanking";
import { GenerosList } from "../src/components/GenerosList/GenerosList";
import { useRef } from "react";
import { FavoritePlaylist } from "../src/components/FavoritePlaylist/FavoritePlaylist";

export default function Home() {
  // Cambiar a exportación por defecto
  return (
    <>
      <RecentsReleases />
      <GlobalRanking />
      <GenerosList />
      {}
    </>
  );
}
