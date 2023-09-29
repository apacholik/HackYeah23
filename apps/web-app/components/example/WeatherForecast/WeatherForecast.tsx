import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

import { apiClient } from "../../../helpers";
import { Card } from "../../atoms";

type Props = {
  children?: ReactNode;
  className?: string;
};

/** Documentation for WeatherForecast component */
export function WeatherForecast({ className }: Props) {
  const { data, isFetching, refetch, remove, isError } = useQuery<Record<string, string>[]>({
    queryKey: ["WeatherForecast"],
    queryFn: async () => {
      const response = await apiClient.get("WeatherForecast");

      return response.data;
    },
    retry: 0,
  });

  return (
    <Card.Root className={className}>
      <Card.CardHeader>
        <Card.CardTitle>Weather Forecast</Card.CardTitle>
        <Card.CardDescription>This is weather forecast for Backendland</Card.CardDescription>
      </Card.CardHeader>

      <Card.CardContent>
        {isFetching && "...loading"}

        {isError && (
          <div className="rounded-md border border-red-900 bg-red-300 text-red-900 p-2">
            Sorry, but right now service is not available
          </div>
        )}

        {!!data && (
          <>
            <div className="grid grid-cols-7 gap-2">
              <span className="col-span-2">Date</span>
              <span className="col-span-2 text-center">Temp</span>
              <span className="col-span-3">Summary</span>
            </div>
            {data.map((oneDayWeather) => (
              <div key={oneDayWeather.date} className="grid grid-cols-7 gap-2">
                <span className="col-span-2">{oneDayWeather.date}</span>
                <span className="col-span-2 text-center">{oneDayWeather.temperatureC} *C</span>
                <span className="col-span-3 truncate" title={oneDayWeather.summary}>
                  {oneDayWeather.summary}
                </span>
              </div>
            ))}
          </>
        )}
      </Card.CardContent>

      <Card.CardFooter>
        <button
          type="button"
          onClick={() => {
            remove();
            refetch();
          }}
          className="rounded-md border bg-blue-900 text-white px-3 py-1 hover:bg-blue-800"
        >
          Try again
        </button>
      </Card.CardFooter>
    </Card.Root>
  );
}
