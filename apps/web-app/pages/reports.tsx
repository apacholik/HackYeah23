import { GetStaticProps } from "next";

import { Tabs } from "../components/atoms";
import { ResultsShowMap } from "../components/maps";
import { apiClient } from "../helpers";
import EncounterTypeResponse from "../types/EncounterTypeResponse";

type AnimalReportProps = {
  encounterTypes: null | Array<EncounterTypeResponse>;
};

export default function Reports({ encounterTypes }: AnimalReportProps) {
  console.log("!!! encounterTypes", encounterTypes);

  return <div className="flex flex-col gap-6">
    <div>
    <Tabs.Root defaultValue="wild">
      <Tabs.TabsList>
        <Tabs.TabsTrigger value="wild">Dzikie zwierzęta</Tabs.TabsTrigger>
        <Tabs.TabsTrigger value="pets">Zwierzęta domowe</Tabs.TabsTrigger>

      </Tabs.TabsList>

      <Tabs.TabsContent value="wild">
        <ResultsShowMap isWild={true} encounterTypes={encounterTypes?.filter(({ isWild }) => isWild) || []} />
      </Tabs.TabsContent>

      <Tabs.TabsContent value="pets">
        <ResultsShowMap isWild={false} encounterTypes={encounterTypes?.filter(({ isWild }) => !isWild) || []} />
      </Tabs.TabsContent>
    </Tabs.Root>
    </div>
  </div>
}

export const getStaticProps: GetStaticProps<AnimalReportProps> = async () => {
  try {
    const encounterTypeResponse = await apiClient.get<Array<EncounterTypeResponse>>("EncounterType");

    return {
      revalidate: 1,
      props: {
        encounterTypes: encounterTypeResponse.data,
      },
    };
  } catch {
    return {
      revalidate: 1,
      props: {
        encounterTypes: null,
      },
    };
  }
};