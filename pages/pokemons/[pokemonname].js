import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import Title from "@/components/Title";
import Head from "next/head";
import Heading from "@/components/Heading";

export default function PokemonPage({ details }) {
  const router = useRouter();
  const { pokemonname } = router.query;

  return (
    <>
      <Head>
        <title>Poremons: {details.data.name}</title>
      </Head>
      <div className="bg-gradient-111 dark:bg-gradient-112 text-darkGrey dark:text-lightGrey font-mono min-h-screen py-10 flex flex-col">
        <div className="container px-10 mx-auto mb-9">
          <Heading />
        </div>
        <div className="container px-10 lg mx-auto md:self-center">
          <div className="grid gap-x-20 gap-y-10 md:grid-cols-2 mx-auto max-w-5xl">
            <div className="col-span-full">
              <button
                className="text-xl flex gap-2 text-darkGrey dark:text-lightGreen border-darkGrey dark:border-lightGreen rounded-xl border-2 px-3 py-1 box-shadow shadow-custom transition duration-500 ease-out hover:shadow-darkGrey dark:hover:shadow-lightGreen"
                type="button"
                onClick={() => router.back()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6  self-center"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
                Back
              </button>
            </div>
            <div className="relative aspect-square">
              <Image
                alt={details.data.name}
                src={details.imageUrl}
                layout="fill"
                objectFit="contain"
              ></Image>
            </div>
            <div className="self-center">
              <h1 className="mb-10 text-5xl sm:text-6xl break-words">
                {details.data.name}
              </h1>
              <dl className="grid gap-3 grid-cols-info">
                <dt className="self-center">generation: </dt>
                <dd className="text-lg">{details.data.generation}</dd>
                <dt className="self-center">type: </dt>
                <dd className="text-lg">
                  {details.data.type1}
                  {details.data.type2 && ", " + details.data.type2}
                </dd>
                <dt className="self-center">height: </dt>
                <dd className="text-lg">{details.data.stats.height_m}m</dd>
                <dt className="self-center">weight: </dt>
                <dd className="text-lg">{details.data.stats.weight_kg}kg</dd>
                <dt className="self-center">attack: </dt>
                <dd className="text-lg">{details.data.stats.attack}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const pokemonName = context.params.pokemonname;
  const response = await fetch(
    `https://pokapp.onrender.com/pokemons/name/${pokemonName.toLowerCase()}`
  );

  let data = await response.json();
  const externalUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
  const externalDataResponse = await fetch(externalUrl);
  const externalData = await externalDataResponse.json();
  const imageUrl = externalData.sprites.other.dream_world.front_default;

  data = { ...data, imageUrl };
  return {
    props: {
      details: data,
    },
  };
}
