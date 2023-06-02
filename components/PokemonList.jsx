import React from "react";
import Link from "next/link";
import Image from "next/image";

const colorMap = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  normal: "bg-grey-500",
};

function PokemonListItem({ pokemon, cardView }) {
  return (
    <li className={"group " + (!cardView ? "min-h-[300px]" : "")}>
      <Link
        href={`/pokemons/${pokemon.name}`}
        className={`w-full h-full relative block text-darkGrey rounded-3xl box-shadow shadow-custom transition duration-500 ease-out hover:shadow-darkGrey dark:hover:shadow-lightGreen ${
          !cardView && "card"
        }`}
      >
        {/*dot*/}
        {/* ${colorMap[pokemon.type1]} => ${colorMap[pokemon.type1]} */}
        {/* <span className={`w-2 h-2 rounded ${pokemon.type1}`}></span> */}
        {!cardView ? (
          <>
            <span className="card-front absolute w-full h-full  flex flex-col border border-darkGrey items-center justify-center text-center bg-white dark:bg-lightGrey rounded-3xl p-5 space-x-4">
              <span className="text-3xl font-bold">{pokemon.name}</span>
              <span className="text-xl">{pokemon.classification}</span>
            </span>
            <span className="card-back absolute w-full h-full border border-darkGrey bg-white dark:bg-lightGrey rounded-3xl p-8">
              <Image
                alt={pokemon.name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                layout="fill"
                objectFit="contain"
              ></Image>
              {!!pokemon.is_legendary && (
                <span className="text-red-600 group-hover:w-9/12 group-hover:h-3/4  uppercase absolute top-1/2 left-1/2 w-0 h-0 overflow-hidden -translate-x-1/2 -translate-y-1/2  duration-300 transition-shape delay-100 flex justify-center items-center font-bold text-2xl bg-lightGrey65 border-lightGreen border-4">
                  <span className=" -rotate-45">legendary</span>
                </span>
              )}
            </span>
          </>
        ) : (
          <span className="flex gap-5 p-5 items-center bg-white dark:bg-lightGrey rounded-3xl">
            <span className="w-1/2 relative md:w-40 md:h-40 w-20 h-20">
              <Image
                alt={pokemon.name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                layout="fill"
                objectFit="contain"
              ></Image>
            </span>
            <span className="flex flex-col gap-5">
              <span className="text-2xl md:text-3xl font-bold">
                {pokemon.name}
              </span>
              <span className="text-xl">{pokemon.classification}</span>
              {!!pokemon.is_legendary && (
                <span className="text-red-600">
                  <span>legendary</span>
                </span>
              )}
            </span>
          </span>
        )}
      </Link>
    </li>
  );
}

export default function PokemonList({ pokemons, cardView }) {
  return (
    <ul
      className={`grow card-list grid gap-5 grid-cols-4 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 md:gap-10 ${
        !!cardView ? "horizontal" : ""
      }`}
    >
      {pokemons.length ? (
        pokemons.map((el) => (
          <PokemonListItem key={el.id} pokemon={el} cardView={cardView} />
        ))
      ) : (
        <li>
          <h1 className="text-3xl text-gray-600">No pokemons in database</h1>
        </li>
      )}
    </ul>
  );
}
