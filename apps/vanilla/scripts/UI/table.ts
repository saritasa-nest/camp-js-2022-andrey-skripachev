import { Anime } from '@js-camp/core/models/anime.js';

import { AnimeTableSelector } from '../variables/interfaces';
import { AnimeTableElements } from '../variables/constants';
import { TableUpdateData } from '../variables/interfaces/table';

import { createNode } from './dom';

const animeTableSelector: AnimeTableSelector = {
  table: AnimeTableElements.TABLE_BODY,
  row: AnimeTableElements.ROW,
  cell: AnimeTableElements.CELL,
  caption: AnimeTableElements.CAPTION,
  image: AnimeTableElements.TABLE_IMAGE,
};

/**
 * Places a list of anime in a table.
 * @param animeList Caption info.
 */
export function placeAnimeListToTable(
  { positionInfo, results }: TableUpdateData<Anime>,
): void {
  const { table, caption } = animeTableSelector;

  const animeBlock = document.querySelector<HTMLTableElement>(`.${table}`);
  const captionBlock = document.querySelector<HTMLTableCaptionElement>(`.${caption}`);

  if (animeBlock === null || captionBlock === null) {
    return;
  }

  captionBlock.textContent = positionInfo;

  removeRowsFromTable(animeBlock);
  for (const animeData of results) {
    pushAnime(animeData, animeBlock);
  }
}

/**
 * Adds one anime series to the table.
 * @param anime Anime that will be written in the table row.
 * @param tableBody Table body where the line with the anime will be written.
 */
function pushAnime(anime: Anime, tableBody: Element): void {
  tableBody.append(createAnimeTableRow(anime));
}

/**
 * Creates and fills a row with information about anime.
 * @param anime Information about the anime series.
 * @returns The table row containing information about the anime.
 */
function createAnimeTableRow(anime: Anime): HTMLTableRowElement {
  const EMPTY_MESSAGE = '-';

  const { image, titleEnglish, titleJapanese, status, type, aired: { start } } = anime;
  const dateStart = String(start.getFullYear());

  const { row: rowElement, cell: cellElement, image: imageElement } = animeTableSelector;

  const row = createNode('tr', '', rowElement);

  const imageCell = createNode('td', '', cellElement);
  const title = `${titleEnglish || EMPTY_MESSAGE} (${titleJapanese || EMPTY_MESSAGE})`;
  const titleCell = createNode('td', title, cellElement);
  const airedStartCell = createNode('td', dateStart || EMPTY_MESSAGE, cellElement);
  const typeCell = createNode('td', type ?? EMPTY_MESSAGE, cellElement);
  const statusCell = createNode('td', status ?? EMPTY_MESSAGE, cellElement);

  const picture = createNode('img', '', imageElement);
  picture.src = image;
  picture.alt = titleEnglish;

  imageCell.append(picture);

  row.append(imageCell, titleCell, airedStartCell, statusCell, typeCell);

  return row;
}

/**
 * Deletes all rows from the table except thead and tfoot.
 * @param table Table to delete all rows from it.
 */
function removeRowsFromTable(table: HTMLTableElement): void {
  const availableParents = ['TBODY', 'TABLE'];
  const rows = table.querySelectorAll('tr');
  rows.forEach(element => {
    const parent = element.parentNode;
    if (parent !== null && availableParents.includes(parent.nodeName)) {
      element.remove();
    }
  });
}
