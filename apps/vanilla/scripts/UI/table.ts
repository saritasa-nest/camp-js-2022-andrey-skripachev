import { Anime } from '@js-camp/core/models/anime.js';
import { AnimeType } from '@js-camp/core/utils/types/animeType';
import { AnimeStatus } from '@js-camp/core/utils/types/animeStatus';

import { AnimeTableElementsSelector } from '../variables/constants/table';
import { TableUpdateData } from '../variables/interfaces/table';

import { createNode } from './dom';

/**
 * Places a list of anime in a table.
 * @param TableUpdateData Data for table content update.
 */
export function placeAnimeListToTable(
  { results }: TableUpdateData<Anime>,
): void {
  const { TABLE_BODY } = AnimeTableElementsSelector;

  const animeBlock = document.querySelector<HTMLTableElement>(`.${TABLE_BODY}`);

  if (animeBlock === null) {
    throw new Error('Table components is not found');
  }

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

  const { TABLE_IMAGE, ROW, CELL } = AnimeTableElementsSelector;

  const row = createNode('tr', '', [ROW]);

  const imageCell = createNode('td', '', [CELL]);
  const title = `${titleEnglish || EMPTY_MESSAGE} (${titleJapanese || EMPTY_MESSAGE})`;
  const titleCell = createNode('td', title, [CELL]);
  const airedStartCell = createNode('td', dateStart || EMPTY_MESSAGE, [CELL]);
  const typeCell = createNode('td', AnimeType.toReadable(type) ?? EMPTY_MESSAGE, [CELL]);
  const statusCell = createNode('td', AnimeStatus.toReadable(status) ?? EMPTY_MESSAGE, [CELL]);

  const picture = createNode('img', '', [TABLE_IMAGE]);
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
