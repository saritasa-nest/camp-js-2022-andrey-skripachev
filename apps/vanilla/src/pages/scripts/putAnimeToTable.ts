import { AnimeRequestData, AnimeData } from './interfaces.js';

export function placeAnimeListToTable(animeBlock: HTMLTableElement | null, caption: Element | null, animeReqData: AnimeRequestData):void {
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

function pushAnimeToTable(anime: Anime, table: Element):void {
  const { title_eng: titleEng, title_jpn: titleJpn, status, image, type, aired: { start } } = anime;
  const ON_EMPTY_MESSAGE = '-';

  const animeRow = createNode('tr', '', 'anime-table-row');
  const imageCell = createNode('td', '', 'anime-table-row-data');
  const titleEngCell = createNode('td', titleEng || ON_EMPTY_MESSAGE, 'anime-table-row-data');
  const titleJpnCell = createNode('td', titleJpn || ON_EMPTY_MESSAGE, 'anime-table-row-data');
  const airedStartCell = createNode('td', start?.split('-')[0] || ON_EMPTY_MESSAGE, 'anime-table-row-data');
  const typeCell = createNode('td', type || ON_EMPTY_MESSAGE, 'anime-table-row-data');
  const statusCell = createNode('td', status || ON_EMPTY_MESSAGE, 'anime-table-row-data');

  const imageElement = document.createElement('img');
  imageElement.className = 'responsive-img';
  imageElement.src = image;
  imageCell.append(imageElement);

  animeRow.append(imageCell, titleEngCell, titleJpnCell, airedStartCell, typeCell, statusCell);

  table.append(animeRow);
}

function removeRowsFromTable(table: HTMLTableElement): void {
  const availableParents = ['TBODY', 'TABLE'];
  const rows = table.querySelectorAll('tr');
  rows.forEach(elem => {
    if (availableParents.includes(elem.parentNode?.nodeName || '')) {
      elem.remove();
    }
  });
}

function createNode(elementName: string, textContent: string, classes: string): Element {
  const newElement = document.createElement(elementName);
  newElement.className = classes;
  newElement.textContent = textContent;
  return newElement;
}
