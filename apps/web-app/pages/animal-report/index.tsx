import { GetStaticProps, NextPage } from "next";
import Image from "next/image";

import { Tabs } from "../../components/atoms";
import { FormRegisterForeignAnimal, FormRegisterMissingPet } from "../../components/organisms";
import { apiClient } from "../../helpers";
import EncounterTypeResponse from "../../types/EncounterTypeResponse";

type AnimalReportProps = {
  encounterTypes: null | Array<EncounterTypeResponse>;
};

export const getStaticProps: GetStaticProps<AnimalReportProps> = async () => {
  try {
    const encounterTypeResponse = await apiClient.get<Array<EncounterTypeResponse>>("EncounterType");

    console.log("encounterTypeResponse", encounterTypeResponse);

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

const AnimalReport: NextPage<AnimalReportProps> = ({ encounterTypes }) => {
  if (encounterTypes === null) {
    return (
      <div className="flex justify-center items-center h-full flex-col">
        <Image className="w-1/3" src="/assets/img/nok.png" alt="" width="300" height="300" />
        <div className="border border-red-800 bg-red-200 text-red-900 p-6 rounded-md font-bold text-center w-1/3">
          Mamy nieoczekiwany problem
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Zgłoś incydent</h2>

      <div>
        <Tabs.Root defaultValue="foreign">
          <Tabs.TabsList>
            <Tabs.TabsTrigger value="foreign">Zgłoś spotkanie zwierze</Tabs.TabsTrigger>
            <Tabs.TabsTrigger value="missingPet">Zgłoś zaginione zwierze</Tabs.TabsTrigger>
          </Tabs.TabsList>

          <Tabs.TabsContent value="foreign">
            <FormRegisterForeignAnimal encounterTypes={encounterTypes} />
          </Tabs.TabsContent>

          <Tabs.TabsContent value="missingPet">
            <FormRegisterMissingPet encounterTypes={encounterTypes} />
          </Tabs.TabsContent>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default AnimalReport;
