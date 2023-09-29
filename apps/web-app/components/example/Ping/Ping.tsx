import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";

import { apiClient } from "../../../helpers";
import { Card } from "../../atoms";

type Props = {
  className?: string;
};

/** Documentation for Ping component */
export function Ping({ className }: Props) {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const { mutate, data, isLoading, isError } = useMutation({
    mutationKey: ["ping"],
    mutationFn: async () => {
      const response = await apiClient.post("test", null, {
        params: {
          test: inputRef.current?.value ?? "",
        },
      });

      return response.data;
    },
  });

  return (
    <Card.Root className={className}>
      <Card.CardHeader>
        <Card.CardTitle>Ping</Card.CardTitle>
        <Card.CardDescription>Describe something and I response You!</Card.CardDescription>
      </Card.CardHeader>

      <Card.CardContent className="flex flex-col gap-3">
        <div>
          <div className="font-medium text-sm">Message:</div>
          <input
            placeholder="Write some text..."
            defaultValue="Wygramy!!!"
            className="border border-gray-400 rounded-md px-2 focus:border-blue-900 hover:border-blue-700"
            ref={inputRef}
          />
        </div>

        <div>
          <div className="font-medium text-sm">Response:</div>

          <div className="border border-gray-200 rounded-md px-2 py-1 tracking-wide text-gray-600">
            {!isLoading && (data ?? <i>No message</i>)}
            {isLoading && "Wait a moment ..."}
          </div>

          {isError && <div className="text-red-950 text-sm tracking-wide mt-1">Error 😒</div>}
        </div>
      </Card.CardContent>

      <Card.CardFooter>
        <button
          type="button"
          onClick={() => {
            mutate();
          }}
          className="rounded-md border bg-blue-900 text-white px-3 py-1 hover:bg-blue-800"
        >
          Send
        </button>
      </Card.CardFooter>
    </Card.Root>
  );
}
