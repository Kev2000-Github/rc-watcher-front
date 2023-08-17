import { STALE_TIME } from "./constants";

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) ) + min;
}

export const paginationConfig = {
    keepPreviousData: true,
    staleTime: STALE_TIME
}