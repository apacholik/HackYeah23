import { useMutation } from "@tanstack/react-query";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Button, Card, Select } from "../../components/atoms";
import { SpotPointMap } from "../../components/maps";
import { apiClient } from "../../helpers";
import { useLocationActions, useLocationIsEnabled } from "../../stores/locationStore";
import EncounterTypeResponse from "../../types/EncounterTypeResponse";

type AnimalReportProps = {
  encounterTypes: null | Array<EncounterTypeResponse>;
};

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

const AnimalReport: NextPage<AnimalReportProps> = ({ encounterTypes }) => {
  const [formState, setFormState] = useState({
    longitude: 0,
    latitude: 0,
    encounterTypeId: "",
    properties: {},
  });

  const updateFormState = (key: string) => (value: string | number) => {
    setFormState((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const { mutate, isError, isSuccess, isLoading, data } = useMutation({
    mutationKey: ["PutEncounter"],
    mutationFn: async () => {
      const response = await apiClient.put("Encounter", formState);

      return response.data;
    },
  });

  const sendEncounter = () => {
    mutate();
  };

  const isLocationEnabled = useLocationIsEnabled();
  const locationActions = useLocationActions();

  const disabledSendBtn = !isLocationEnabled || isLoading || isSuccess;

  const { push } = useRouter();

  useEffect(() => {
    if (isSuccess) {
      const successPage = "/animal-report/thanks";

      push({
        hash: data,
        pathname: successPage,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  if (encounterTypes === null) {
    return (
      <div className="flex justify-center items-center h-full flex-col">
        <div className="border border-red-800 bg-red-200 text-red-900 p-6 rounded-md font-bold text-center w-1/3">
          Mamy nieoczekiwany problem
        </div>
        <Image className="w-1/3 rotate-180" src="/assets/img/ok.png" alt="alright!" width="300" height="300" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 items-center">
      <h2 className="scroll-m-20 w-full text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Zgłoś zauważone zwierze
      </h2>

      <Card.Root className="w-2/3">
        <Card.CardContent className="p-6 flex gap-2 flex-col">
          {!isLocationEnabled && (
            <div>
              Potrzebujemy Twoich współrzędnych.{" "}
              <span
                className="bg-green-100 rounded-md p-1 px-2 hover:bg-green-300 cursor-pointer"
                onClick={locationActions.enable}
              >
                Aktywuj
              </span>
            </div>
          )}

          <SpotPointMap
            onAnimalMarkerMove={(animalPoint) => {
              setFormState((current) => ({
                ...current,
                latitude: animalPoint.lat,
                longitude: animalPoint.lng,
              }));
            }}
          />

          <Select.Root onValueChange={updateFormState("encounterTypeId")}>
            <Select.SelectTrigger>
              <Select.SelectValue placeholder="Typ" />
            </Select.SelectTrigger>

            <Select.SelectContent>
              {encounterTypes.map((encounterType) => (
                <Select.SelectItem key={encounterType.id} value={encounterType.id}>
                  {encounterType.code}
                </Select.SelectItem>
              ))}
            </Select.SelectContent>
          </Select.Root>

          {isError && <div className="text-center text-red-900">Coś poszło nie tak 😿</div>}

          <Button disabled={disabledSendBtn} onClick={sendEncounter} className="flex gap-1 justify-center items-center">
            <span>Zgłoś</span> <PetIcon />
          </Button>
        </Card.CardContent>
      </Card.Root>
    </div>
  );
};

export default AnimalReport;

function PetIcon({ className = "" }) {
  return (
    <svg
      width="1.25rem"
      height="1.25rem"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.51276 9.382C7.62676 11.063 6.73876 12.497 5.52676 12.584C4.31676 12.671 3.24176 11.379 3.12676 9.697C3.01176 8.016 3.90076 6.582 5.11176 6.495C6.32276 6.408 7.39776 7.7 7.51176 9.382H7.51276ZM15.8528 2.412C14.6768 2.104 13.3948 3.179 12.9908 4.812C12.5848 6.445 13.2098 8.019 14.3858 8.327C15.5628 8.635 16.8458 7.56 17.2498 5.927C17.7768 3.8 16.1358 2.485 15.8538 2.412H15.8528ZM18.6128 7.918C17.3748 7.936 16.3928 9.144 16.4198 11.014C16.4468 12.884 17.4698 13.736 18.7098 13.717C19.9458 13.698 20.9298 12.816 20.9018 10.945C20.8658 8.511 18.9088 7.913 18.6118 7.918H18.6128ZM9.64476 2C8.46776 2 7.51276 3.354 7.51276 5.023C7.51276 6.693 8.46776 8.046 9.64476 8.046C10.8228 8.046 11.7778 6.693 11.7778 5.023C11.7778 3.353 10.8228 2 9.64476 2ZM9.37276 11.389C8.69276 12.391 7.92076 13.369 6.42276 14.651C4.92576 15.933 4.29076 16.818 4.29076 18.123C4.29076 19.427 5.01676 21.594 7.08076 21.594C9.14576 21.594 10.1438 21.128 11.7778 21.128C13.4108 21.128 14.5008 21.78 16.5648 21.78C18.6288 21.78 19.4908 19.777 19.4908 18.472C19.4908 17.167 19.1328 16.429 17.4788 14.94C16.4188 13.985 15.5208 13.207 14.1138 11.203C13.4188 10.213 12.6168 10.085 11.7778 10.085C10.9378 10.085 10.0538 10.387 9.37276 11.389Z"
        fill="#fff"
      />
    </svg>
  );
}
