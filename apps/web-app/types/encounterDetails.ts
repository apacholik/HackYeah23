export type EncounterDetails = {
  encounterType: string;
  timeUtc: string;
  isWild: boolean;
  latitude: number;
  longitude: number;
  propabilityOfOccurance: number;
  images: string[];
  properties?: [{
    name: string;
    value: string;
    valueType: string;
  }];
}