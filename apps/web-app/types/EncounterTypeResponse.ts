type EncounterTypeResponse = {
  id: string;
  code: string;
  isWild: boolean;
  properties: [{
    id: string;
    name: string;
    valueType: string;
  }];
};

export default EncounterTypeResponse;
