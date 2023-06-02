import Head from "next/head";
import React, { useEffect, useState, useMemo } from "react";
// import pokemons from "@/assets/sampledataset.json"
import PokemonList from "@/components/PokemonList";
import Title from "@/components/Title";
import Pagination from "@/components/Pagination";
import FilterPanel from "@/components/FilterPanel";
import Heading from "@/components/Heading";
import { FaStream, FaGripVertical, FaGripHorizontal } from "react-icons/fa";

let PageSize = 8;

export default function Pokemons({ pokemonsList }) {
  const [pokemons, setPokemons] = useState([...pokemonsList]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const [cardView, setCardView] = useState(false);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return pokemons.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pokemons]);

  return (
    <>
      <Head>
        <title>Poremons</title>
      </Head>
      <div className="bg-gradient-111 dark:bg-gradient-112 text-darkGrey px-5 dark:text-lightGrey font-mono py-10 ">
        <div className="container lg mx-auto">
          {/* <Title>Pokemons</Title> */}
          <Heading />
          <div className="py-5 mb-5 justify-between flex">
            <button
              className="p-3 rounded border-0 bg-white dark:bg-darkGrey dark:border-lightGreen dark:border-2 box-shadow shadow-custom transition duration-500 ease-out hover:shadow-darkGrey"
              onClick={() => setIsFilter(!isFilter)}
            >
              <FaStream />
            </button>

            <button
              className="p-3 rounded border-0 bg-white dark:bg-darkGrey dark:border-lightGreen dark:border-2 box-shadow shadow-custom transition duration-500 ease-out hover:shadow-darkGrey"
              onClick={() => setCardView(!cardView)}
            >
              {cardView ? <FaGripVertical /> : <FaGripHorizontal />}
            </button>
          </div>
          <div className="flex w-full flex-col lg:flex-row">
            <FilterPanel
              pokemons={pokemonsList}
              setPokemons={setPokemons}
              isHide={isFilter}
            />
            <PokemonList pokemons={currentTableData} cardView={cardView} />
          </div>
          <Pagination
            currentPage={currentPage}
            totalCount={pokemons.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(`https://pokapp.onrender.com/pokemons`);
  const data = await response.json();

  return {
    props: {
      pokemonsList: data,
    },
  };
}

function filterFunction(param, values) {}
