import { isUserAuthorized } from "../user/validateToken";

export async function changeHeader(
  templateAuthorizedId: string,
  templateNotAuthorizedId: string,
  headerInsertionBlockSelector: string
): Promise<void> {
  const header = document.querySelector('header');

  if (header === null) {
    throw new Error('Cannot find header');
  }

  const templateAuthorized = document.querySelector<HTMLTemplateElement>(`#${templateAuthorizedId}`);
  const templateNotAuthorized = document.querySelector<HTMLTemplateElement>(`#${templateNotAuthorizedId}`);
  const headerInsertionBlock = header.querySelector<HTMLTemplateElement>(`.${headerInsertionBlockSelector}`);

  if (templateAuthorized === null || templateNotAuthorized === null || headerInsertionBlock === null) {
    throw new Error('Cannot find header component');
  }

  const isAuthorized = await isUserAuthorized();

  headerInsertionBlock.innerHTML = (
    isAuthorized ? templateAuthorized : templateNotAuthorized
  ).innerHTML;
}
