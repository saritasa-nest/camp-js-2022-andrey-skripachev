import { Api } from "../../../scripts/api/api";

async function initDetailsCard() {
  const search = window.location.search;

  const anime = await Api.animeApi.getDetailedAnime(search);

  console.log(anime);
}
initDetailsCard();
