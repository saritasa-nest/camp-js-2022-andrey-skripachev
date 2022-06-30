import { AnimeRequestData, Anime } from './interfaces.js';

/**
 * Clears the table and puts the list of anime series there.
 * @param animeBlock Table for filling in the list of anime series.
 * @param caption Block to display the current position in the anime list.
 * @param animeReqData Request information.
 */
export function placeAnimeListToTable(animeBlock: HTMLTableElement | null, caption: Element | null, animeReqData: AnimeRequestData): void {
  if (!animeBlock || !caption) {
    return;
  }

  const { count, results, offset, limit } = animeReqData;
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
  const { title_eng: titleEng, title_jpn: titleJpn, status, image, type, aired: { start } } = anime;
  const ON_EMPTY_MESSAGE = '-';

  const animeRow = createNode('tr', '', 'anime-table-row');
  const imageCell = createNode('td', '', 'anime-table-row-data');
  const titleEngCell = createNode('td', titleEng || ON_EMPTY_MESSAGE, 'anime-table-row-data');
  const titleJpnCell = createNode('td', titleJpn || ON_EMPTY_MESSAGE, 'anime-table-row-data');
  const airedStartCell = createNode('td', start.split('-')[0] || ON_EMPTY_MESSAGE, 'anime-table-row-data');
  const typeCell = createNode('td', type || ON_EMPTY_MESSAGE, 'anime-table-row-data');
  const statusCell = createNode('td', status || ON_EMPTY_MESSAGE, 'anime-table-row-data');

  const imageElement = document.createElement('img');
  imageElement.className = 'responsive-img';
  imageElement.src = image;
  imageCell.append(imageElement);

  animeRow.append(imageCell, titleEngCell, titleJpnCell, airedStartCell, typeCell, statusCell);

  table.append(animeRow);
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
