import { Anime } from '@js-camp/core/models/anime.js';
import { AnimeSeries } from '@js-camp/core/models/animeSeries.js';

import { AnimeTableSelector } from '../variables/interfaces';
import { AnimeTableElements } from '../variables/constants';

import { createNode } from './dom';

const animeTableSelector: AnimeTableSelector = {
  table: `.${AnimeTableElements.TABLE_BODY}`,
  row: AnimeTableElements.ROW,
  cell: AnimeTableElements.CELL,
  caption: `.${AnimeTableElements.CAPTION}`,
  image: AnimeTableElements.TABLE_IMAGE,
};

/**
 * Places a list of anime in a table.
 * @param anime Number, list, limit and offset of Anime.
 */
export function placeAnimeListToTable(
  anime: Anime,
): void {
  const { table, caption } = animeTableSelector;
  const { captionInfo, animeSeries } = anime;

  const animeBlock = document.querySelector<HTMLTableElement>(table);
  const captionBlock = document.querySelector<HTMLTableCaptionElement>(caption);

  if (animeBlock === null || captionBlock === null) {
    return;
  }

  captionBlock.textContent = captionInfo;

  removeRowsFromTable(animeBlock);
  for (const animeData of animeSeries) {
    pushAnime(animeData, animeBlock);
  }
}

/**
 * Adds one anime series to the table.
 * @param anime Anime that will be written in the table row.
 * @param tableBody Table body where the line with the anime will be written.
 */
function pushAnime(anime: AnimeSeries, tableBody: Element): void {
  tableBody.append(createAnimeTableRow(anime));
}

/**
 * Creates and fills a row with information about anime.
 * @param anime Information about the anime series.
 * @returns The table row containing information about the anime.
 */
function createAnimeTableRow(anime: AnimeSeries): HTMLTableRowElement {
  const EMPTY_MESSAGE = '-';

  const { image, titleEnglish, titleJapanese, status, type, start } = anime;

  const { row: rowElement, cell: cellElement, image: imageElement } = animeTableSelector;

  const row = createNode<HTMLTableRowElement>('tr', '', rowElement);

  const imageCell = createNode<HTMLTableCellElement>('td', '', cellElement);
  const title = `${titleEnglish || EMPTY_MESSAGE} (${titleJapanese || EMPTY_MESSAGE})`;
  const titleCell = createNode<HTMLTableCellElement>('td', title, cellElement);
  const airedStartCell = createNode<HTMLTableCellElement>('td', start?.toString().split('-')[0] || EMPTY_MESSAGE, cellElement);
  const typeCell = createNode<HTMLTableCellElement>('td', type || EMPTY_MESSAGE, cellElement);
  const statusCell = createNode<HTMLTableCellElement>('td', status || EMPTY_MESSAGE, cellElement);

  const illustration = createNode<HTMLImageElement>('img', '', imageElement);
  illustration.src = image;
  illustration.alt = titleEnglish;

  imageCell.append(illustration);

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
