type EncounterTypeResponse = {
  id: string;
  code: string;
  properties: Array<{
    name: string;
    valueType: string;
    id: string;
  }>;
};

export default EncounterTypeResponse;
