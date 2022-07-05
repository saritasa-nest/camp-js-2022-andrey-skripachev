import { Anime } from '@js-camp/core/models/anime.js';

import { AnimeSelector } from './constants.js';

import { AnimeRequestData } from './interfaces.js';

import { AnimeType } from './enums.js';

/**
 * Clears the table and puts the list of anime series there.
 * @param animeBlockSelector Table for filling in the list of anime series.
 * @param captionSelector Block to display the current position in the anime list.
 * @param animeRequestData Request information.
 */
export function placeAnimeListToTable(
  animeBlockSelector: string,
  captionSelector: string,
  animeRequestData: AnimeRequestData,
): void {
  const animeBlock = document.querySelector<HTMLTableElement>(animeBlockSelector);
  const caption = document.querySelector<HTMLTableCaptionElement>(captionSelector);

  if (animeBlock === null || caption === null) {
    return;
  }

  const { count, results, offset, limit } = animeRequestData;
  removeRowsFromTable(animeBlock);
  caption.textContent = `${offset + 1}-${Math.min(offset + limit, count)} of ${count}`;

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
  const row = createAnimeTableRow(anime);

  tableBody.append(row);
}

/**
 * Creates and fills a row with anime data.
 * @param anime Anime.
 * @returns Row.
 */
function createAnimeTableRow(anime: Anime): HTMLTableRowElement {
  const EMPTY_MESSAGE = '-';

  const { image, titleEng, titleJpn, status, type, start } = anime;

  const row = createNode<HTMLTableRowElement>('tr', '', AnimeSelector.ROW_CLASS);

  const imageCell = createNode<HTMLTableCellElement>('td', '', AnimeSelector.CELL_CLASS);
  const title = `${titleEng || EMPTY_MESSAGE} (${titleJpn || EMPTY_MESSAGE})`;
  const titleCell = createNode<HTMLTableCellElement>('td', title, AnimeSelector.CELL_CLASS);
  const airedStartCell = createNode<HTMLTableCellElement>('td', start?.toString().split('-')[0] || EMPTY_MESSAGE, AnimeSelector.CELL_CLASS);
  const typeCell = createNode<HTMLTableCellElement>('td', AnimeType[type as AnimeType] || EMPTY_MESSAGE, AnimeSelector.CELL_CLASS);
  const statusCell = createNode<HTMLTableCellElement>('td', status || EMPTY_MESSAGE, AnimeSelector.CELL_CLASS);

  const imageElement = createNode<HTMLImageElement>('img', '', AnimeSelector.TABLE_IMAGE_CLASS);
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
  rows.forEach(elem => {
    if (availableParents.includes(elem.parentNode?.nodeName ?? '')) {
      elem.remove();
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
