import { Anime } from '@js-camp/core/models/anime.js';
import { AnimeStatus, AnimeType } from '@js-camp/core/utils/types/anime';

import { AnimeTableSelector } from '../variables/interfaces';
import { AnimeTableElementsSelector } from '../variables/constants/table';
import { TableUpdateData } from '../variables/interfaces/table';

import { createNode } from './dom';

const animeTableSelector: AnimeTableSelector = {
  table: AnimeTableElementsSelector.TABLE_BODY,
  row: AnimeTableElementsSelector.ROW,
  cell: AnimeTableElementsSelector.CELL,
  caption: AnimeTableElementsSelector.CAPTION,
  image: AnimeTableElementsSelector.TABLE_IMAGE,
};

/**
 * Places a list of anime in a table.
 * @param TableUpdateData Data for table content update.
 */
export function placeAnimeListToTable(
  { firstElement, lastElement, totalElements, results }: TableUpdateData<Anime>,
): void {
  const { table, caption } = animeTableSelector;

  const animeBlock = document.querySelector<HTMLTableElement>(`.${table}`);
  const captionBlock = document.querySelector<HTMLTableCaptionElement>(`.${caption}`);

  if (animeBlock === null || captionBlock === null) {
    throw new Error('One of the table components is not found');
  }

  captionBlock.textContent = `${firstElement}-${lastElement} of ${totalElements}`;

  removeRowsFromTable(animeBlock);
  for (const animeData of results) {
    placeAnime(animeData, animeBlock);
  }
}

/**
 * Adds one anime series to the table.
 * @param anime Anime that will be written in the table row.
 * @param tableBody Table body where the line with the anime will be written.
 */
function placeAnime(anime: Anime, tableBody: HTMLTableElement): void {
  tableBody.append(createAnimeTableRow(anime));
}

/**
 * Creates and fill a row with information about anime.
 * @param anime Information about the anime series.
 * @returns The table row containing information about the anime.
 */
function createAnimeTableRow(anime: Anime): HTMLTableRowElement {
  const EMPTY_MESSAGE = '-';

  const { image, titleEnglish, titleJapanese, status, type, aired: { start } } = anime;
  const dateStart = String(start.getFullYear());

  const { row: rowSelector, cell: cellSelector, image: imageSelector } = animeTableSelector;

  const row = createNode('tr', '', rowSelector);

  const imageCell = createNode('td', '', cellSelector);
  const title = `${titleEnglish || EMPTY_MESSAGE} (${titleJapanese || EMPTY_MESSAGE})`;
  const titleCell = createNode('td', title, cellSelector);
  const airedStartCell = createNode('td', dateStart || EMPTY_MESSAGE, cellSelector);
  const typeCell = createNode('td', AnimeType.toReadable(type) ?? EMPTY_MESSAGE, cellSelector);
  const statusCell = createNode('td', AnimeStatus.toReadable(status) ?? EMPTY_MESSAGE, cellSelector);

  const picture = createNode('img', '', imageSelector);
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
