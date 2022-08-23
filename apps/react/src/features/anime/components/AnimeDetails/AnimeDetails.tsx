import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';

const AnimeDetailsComponent: FC = () => {

  const { id: animeId } = useParams();

  return <div>Your anime is {animeId}</div>;
};

export const AnimeDetails = memo(AnimeDetailsComponent);
