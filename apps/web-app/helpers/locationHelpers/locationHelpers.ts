const lng2tile = (lon: number, zoom: number) => ((lon + 180) / 360) * Math.pow(2, zoom);

const lat2tile = (lat: number, zoom: number) =>
  ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) *
  Math.pow(2, zoom);

export const locationHelpers = { lng2tile, lat2tile };
