import { Anime } from '@js-camp/core/models/anime.js';

import { ANIME_TABLE_CELL_CLASS_NAME, ANIME_TABLE_ROW_CLASS_NAME } from './constants.js';

import { AnimeRequestData } from './interfaces.js';

/**
 * Clears the table and puts the list of anime series there.
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
 * Adds one anime series to the table.
 * @param anime Anime that will be written in the table row.
 * @param table Table where the line with the anime will be written.
 */
function pushAnimeToTable(anime: Anime, table: Element): void {
  const row = createAnimeTableRow(anime);

  table.append(row);
}

/**
 * Creates and fills a row with anime data.
 * @param anime Anime.
 * @returns Row.
 */
function createAnimeTableRow(anime: Anime): Element {
  const ON_EMPTY_MESSAGE = '-';

  const { image, titleEng, titleJpn, status, type, aired: { start } } = anime;

  const row = createNode('tr', '', ANIME_TABLE_ROW_CLASS_NAME);

  const imageCell = createNode('td', '', ANIME_TABLE_CELL_CLASS_NAME);
  const title = `${titleEng || ON_EMPTY_MESSAGE} (${titleJpn || ON_EMPTY_MESSAGE})`;
  const titleCell = createNode('td', title, ANIME_TABLE_CELL_CLASS_NAME);
  const airedStartCell = createNode('td', start?.split('-')[0] || ON_EMPTY_MESSAGE, ANIME_TABLE_CELL_CLASS_NAME);
  const typeCell = createNode('td', type || ON_EMPTY_MESSAGE, ANIME_TABLE_CELL_CLASS_NAME);
  const statusCell = createNode('td', status || ON_EMPTY_MESSAGE, ANIME_TABLE_CELL_CLASS_NAME);

  const imageElement = document.createElement('img');
  imageElement.className = 'responsive-img';
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
    if (availableParents.includes(elem.parentNode?.nodeName || '')) {
      elem.remove();
    }
  });
}

/**
 * Creates a new HTML element with classes and text content.
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
