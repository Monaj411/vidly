import httpService from "./httpService";


export function getGenres() {
  return httpService.get('https://localhost:3900/api/genres');
  }