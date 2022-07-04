import { Anime } from '@js-camp/core/models/anime.js';

import { AnimeSelector } from './constants.js';

import { AnimeRequestData } from './interfaces.js';

import { AnimeTypes } from './enums.js';

import { AnimeType } from './types.js';

/**
 * Function clears the table and puts the list of anime series there.
 * @param animeBlock Table for filling in the list of anime series.
 * @param caption Block to display the current position in the anime list.
 * @param animeRequestData Request information.
 */
export function placeAnimeListToTable(
  animeBlock: HTMLTableElement,
  caption: Element,
  animeRequestData: AnimeRequestData,
): void {
  const { count, results, offset, limit } = animeRequestData;
  removeRowsFromTable(animeBlock);
  caption.textContent = `${offset + 1}-${Math.min(offset + limit, count)} of ${count}`;

  for (const animeData of results) {
    pushAnimeToTable(animeData, animeBlock);
  }
}

/**
 * Function adds one anime series to the table.
 * @param anime Anime that will be written in the table row.
 * @param table Table where the line with the anime will be written.
 */
function pushAnimeToTable(anime: Anime, table: Element): void {
  const row = createAnimeTableRow(anime);

  table.append(row);
}

/**
 * Function creates and fills a row with anime data.
 * @param anime Anime.
 * @returns Row.
 */
function createAnimeTableRow(anime: Anime): Element {
  const ON_EMPTY_MESSAGE = '-';

  const { image, titleEng, titleJpn, status, type, start } = anime;

  const row = createNode('tr', '', AnimeSelector.ROW_CLASS);

  const imageCell = createNode('td', '', AnimeSelector.CELL_CLASS);
  const title = `${titleEng || ON_EMPTY_MESSAGE} (${titleJpn || ON_EMPTY_MESSAGE})`;
  const titleCell = createNode('td', title, AnimeSelector.CELL_CLASS);
  const airedStartCell = createNode('td', start?.toString().split('-')[0] || ON_EMPTY_MESSAGE, AnimeSelector.CELL_CLASS);
  const typeCell = createNode('td', AnimeTypes[type as AnimeType] || ON_EMPTY_MESSAGE, AnimeSelector.CELL_CLASS);
  const statusCell = createNode('td', status || ON_EMPTY_MESSAGE, AnimeSelector.CELL_CLASS);

  const imageElement = document.createElement('img');
  imageElement.classList.add('table-image');
  imageElement.src = image;
  imageCell.append(imageElement);

  row.append(imageCell, titleCell, airedStartCell, statusCell, typeCell);

  return row;
}

/**
 * Function deletes all rows from the table except thead and tfoot.
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
 * Function creates a new HTML element with classes and text content.
 * @param elementName HTML element name.
 * @param textContent The text content of the HTML element.
 * @param classes Classes that the element will have.
 * @returns New HTML element.
 */
function createNode(elementName: string, textContent: string, classes: string): Element {
  const newElement = document.createElement(elementName);
  newElement.className = classes;
  newElement.textContent = textContent;
  return newElement;
}
