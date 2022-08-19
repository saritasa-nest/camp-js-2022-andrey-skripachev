import { selectAnimeList, selectAreAnimeListLoading } from "@js-camp/react/store/animeList/selectors";
import { useAppSelector } from "@js-camp/react/store/store";
import { FC } from "react";

const AnimeListComponent: FC = () => {

  const animeList = useAppSelector(selectAnimeList);
  const isAnimeListLoading = useAppSelector(selectAreAnimeListLoading);


  return animeList.map(anime => (
    <div>{anime.titleEnglish}</div>
  ));
}
