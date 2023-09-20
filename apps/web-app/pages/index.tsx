import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { SampleButton } from "ui/components/example";
import { toSlug } from "utils/helpers";

import SamplePage from "../components/example/SamplePage";

type Props = {
  sampleBackendEnv: string;
};

export default function Web({ sampleBackendEnv }: Props) {
  useEffect(() => {
    const fetchMswSample = async () => {
      return await (await fetch("/reviews")).json();
    };

    const reviews = fetchMswSample();
    console.log(reviews);
  }, []);

  return (
    <div>
      <h1>Web App</h1>

      <SamplePage />

      <h2>Sample envs</h2>
      <pre>Backend: {sampleBackendEnv}</pre>
      <pre>Frontend: {process.env.NEXT_PUBLIC_SAMPLE_FRONTEND}</pre>

      <div>
        <a href="/about">About Us</a>
      </div>

      <SampleButton />

      <p>
        {toSlug("This text should be displayed as slug (via toSlug util)!")}
      </p>

      <p>
        Hello word 😍
      </p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const props: Props = {
    sampleBackendEnv: process.env.SAMPLE_BACKEND || "",
  };

  return {
    props,
  };
};
