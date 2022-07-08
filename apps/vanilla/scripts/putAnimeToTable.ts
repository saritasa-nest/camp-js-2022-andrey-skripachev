import { Anime } from '@js-camp/core/models/anime.js';
import { AnimeType } from '@js-camp/core/enums/enums.js';
import { AnimeSeries } from '@js-camp/core/models/animeSeries.js';

import { AnimeSelector } from './variables/constants.js';

/**
 * Clears the table and puts the list of anime series there.
 * @param animeBlockSelector Table for filling in the list of anime series.
 * @param captionSelector Block to display the current position in the anime list.
 * @param animeRequestData Request information.
 */
export function placeAnimeListToTable(
  animeBlockSelector: string,
  captionSelector: string,
  anime: Anime,
): void {
  const animeBlock = document.querySelector<HTMLTableElement>(animeBlockSelector);
  const caption = document.querySelector<HTMLTableCaptionElement>(captionSelector);

  if (animeBlock === null || caption === null) {
    return;
  }

  const { count, animeSeries, offset, limit } = anime;

  caption.textContent = `${offset + 1}-${Math.min(offset + limit + 1, count)} of ${count}`;

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
  const row = createAnimeTableRow(anime);

  tableBody.append(row);
}

/**
 * Creates and fills a row with anime data.
 * @param anime Anime.
 * @returns Row.
 */
function createAnimeTableRow(anime: AnimeSeries): HTMLTableRowElement {
  const EMPTY_MESSAGE = '-';

  const { image, titleEnglish, titleJapanese, status, type, start } = anime;

  const row = createNode<HTMLTableRowElement>('tr', '', AnimeSelector.ROW);

  const imageCell = createNode<HTMLTableCellElement>('td', '', AnimeSelector.CELL);
  const title = `${titleEnglish || EMPTY_MESSAGE} (${titleJapanese || EMPTY_MESSAGE})`;
  const titleCell = createNode<HTMLTableCellElement>('td', title, AnimeSelector.CELL);
  const airedStartCell = createNode<HTMLTableCellElement>('td', start?.toString().split('-')[0] || EMPTY_MESSAGE, AnimeSelector.CELL);
  const typeCell = createNode<HTMLTableCellElement>('td', AnimeType[type as AnimeType] || EMPTY_MESSAGE, AnimeSelector.CELL);
  const statusCell = createNode<HTMLTableCellElement>('td', status || EMPTY_MESSAGE, AnimeSelector.CELL);

  const imageElement = createNode<HTMLImageElement>('img', '', AnimeSelector.TABLE_IMAGE);
  imageElement.src = image;

  imageCell.append(imageElement);

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

/**
 * Creates a new HTML element with classes and text content.
 * @param tagName HTML element name.
 * @param textContent The text content of the HTML element.
 * @param classes Classes that the element will have.
 * @returns New HTML element.
 */
function createNode<Type extends HTMLElement>(tagName: string, textContent: string, classes: string): Type {
  const newElement = document.createElement(tagName);
  newElement.className = classes;
  newElement.textContent = textContent;
  return newElement as Type;
}
