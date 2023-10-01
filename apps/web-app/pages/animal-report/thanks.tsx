import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from 'next/router';

import { apiClient } from "../../helpers";

export default function AnimalReportThanks() {
  const { query } = useRouter();
  const animalType = query['animalType'] || '';

  const { data: factData } = useQuery<string>({
    queryKey: ["Fact", animalType],
    enabled: !!animalType,
    queryFn: async () => {
      const response = await apiClient.get(`Fact?animalType=${animalType}`);

      return response.data;
    },
    retry: 0,
    staleTime: Infinity
  });

  return (
    <div className="flex flex-col justify-center items-center h-full gap-6">
      <div className="flex flex-col justify-center items-center w-1/3">
        <Image src="/assets/img/ok.png" alt="alright!" width="300" height="300" />
        <div className="border border-green-800 bg-green-200 text-green-900 p-6 rounded-md font-bold text-center w-full">
          Zgłoszenie przyjęte!
        </div>
      </div>

      {!!factData && <div className="w-80">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors first:mt-0">Czy wiesz że?</h3>
        <p>{factData}</p>
      </div>}
    </div>
  );
}
