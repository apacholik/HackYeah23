import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { SampleButton } from "ui/components/example";
import { toSlug } from "utils/helpers";

import SamplePage from "../components/example/SamplePage";
import { apiClient } from "../helpers";

type Props = {
  sampleBackendEnv: string;
  messageFromBackend: string;
};

export default function Web({ sampleBackendEnv, messageFromBackend }: Props) {
  useEffect(() => {
    const fetchMswSample = async () => {
      return await (await fetch("/reviews")).json();
    };

    const reviews = fetchMswSample();
    console.log(reviews);
  }, []);

  return (
    <div>
      <h1>Web App EL 1O</h1>

      <SamplePage />

      <h2>Sample envs</h2>
      <pre>Backend: {sampleBackendEnv}</pre>
      <pre>Frontend: {process.env.NEXT_PUBLIC_SAMPLE_FRONTEND}</pre>
      <pre>Message from backend: {messageFromBackend}</pre>

      <div>
        <a href="/about">About Us</a>
      </div>

      <SampleButton />

      <p>{toSlug("This text should be displayed as slug (via toSlug util)!")}</p>

      <p>Hello word 😍</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const props: Props = {
    sampleBackendEnv: process.env.SAMPLE_BACKEND || "",
    messageFromBackend: "Coś bardzo poszło nie tak",
  };

  try {
    const response = await apiClient.post("test", null, {
      params: {
        test: "Wrocław gurom!"
      }
    });

    props.messageFromBackend = response.data;
  } catch {
    props.messageFromBackend = "Backend się obraził i nic nie powie";
  }

  return {
    props,
  };
};
