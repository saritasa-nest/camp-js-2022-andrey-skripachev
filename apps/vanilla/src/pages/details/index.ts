import { AnimeDetails } from '@js-camp/core/models/animeDetails';

import { isUserAuthorized } from '../../../scripts/user/validateToken';
import { Api } from '../../../scripts/api/api';
import { getItemFromSearchParams } from '../../../scripts/domain/queryParamsService';
import { createNode } from '../../../scripts/UI/dom';
import { AnimeStatus, AnimeType } from '@js-camp/core/utils/types/anime';

namespace AnimeDetailsTemplate {
  const imageClassName = 'anime-details__image';
  const infoFieldClassName = 'info';
  const defaultClassName = 'anime-details__info';

  export function createTrailer(trailerId: string): string {
    return `${trailerId}`;
  }

  export function createAnimePicture(src: string, alt: string): HTMLImageElement {
    const picture = document.createElement('img');
    picture.src = src;
    picture.alt = alt;
    picture.classList.add(imageClassName, defaultClassName);
    return picture;
  }

  export function createAnimeInfoField(info: string): HTMLDivElement {
    const infoBlock = createNode('div', info, `${infoFieldClassName} ${defaultClassName}`);
    return infoBlock;
  }

  export function createAiredField(start: Date, end: Date, isAiring: boolean): HTMLDivElement {
    const yearStart = start.getFullYear();
    const yearEnd = end.getFullYear();
    const airedInfo = `${yearStart} - ${yearEnd} (${isAiring ? 'Airing' : 'Not airing'})`;
    return createAnimeInfoField(airedInfo);
  }

  export function createAnimeTitle(titleEnglish: string, titleJapanese: string): HTMLHeadingElement {
    const title = `${titleEnglish || '-'} (${titleJapanese || '-'})`;
    const titleBlock = createNode('h2', title, defaultClassName);
    return titleBlock;
  }
}

async function initDetailsCard() {
  const isAuthorized = await isUserAuthorized();
  if (!isAuthorized) {
    window.location.replace('../');
    return;
  }

  const { search } = window.location;

  const animeId = getItemFromSearchParams(search, 'id');

  const anime = await Api.animeApi.getDetailedAnime(animeId);
  placeAnimeToPage(anime);
}

function placeAnimeToPage(anime: AnimeDetails): void {
  const titleComponent = document.querySelector('.anime-title');
  const pictureComponent = document.querySelector('.picture');
  const airedInfoComponent = document.querySelector('.aired-info');
  const animeTypeComponent = document.querySelector('.anime-type');
  const genresComponent = document.querySelector('.genres');
  const synapsisComponent = document.querySelector('.synapsis');
  const statusComponent = document.querySelector('.status');
  const studiosComponent = document.querySelector('.studios');

  if (titleComponent === null ||
    pictureComponent === null ||
    airedInfoComponent === null ||
    animeTypeComponent === null ||
    genresComponent === null ||
    synapsisComponent === null ||
    statusComponent === null ||
    studiosComponent === null
  ) {
    throw new Error('Same components is undefined');
  }

  const {
    aired: { start, end }, image, status, titleEnglish, titleJapanese, type, synopsis, airing, studios, genres,
  } = anime;

  titleComponent.append(AnimeDetailsTemplate.createAnimeTitle(titleEnglish, titleJapanese));
  pictureComponent.append(AnimeDetailsTemplate.createAnimePicture(image, titleEnglish));
  airedInfoComponent.append(AnimeDetailsTemplate.createAiredField(start, end, airing));
  animeTypeComponent.append(AnimeDetailsTemplate.createAnimeInfoField(`Type: ${AnimeType.toReadable(type) ?? ''}`));
  genresComponent.append(AnimeDetailsTemplate.createAnimeInfoField(`Genres: ${genres.map(({ name }) => name).join(', ')}`));
  synapsisComponent.append(AnimeDetailsTemplate.createAnimeInfoField(`Synopsis: ${synopsis}`));
  statusComponent.append(AnimeDetailsTemplate.createAnimeInfoField(`Status: ${AnimeStatus.toReadable(status)}`));
  studiosComponent.append(AnimeDetailsTemplate.createAnimeInfoField(`Studios: ${studios.map(({ name }) => name).join(', ')}`));
}

initDetailsCard();
