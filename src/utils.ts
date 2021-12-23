import noPhoto from "./Img/noPhoto.png";

export function makeImagePath(id: string, format?: string) {
  if (!id) return noPhoto;
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
