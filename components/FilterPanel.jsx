import React, { useState, useEffect } from "react";
import MultiRangeSlider from "./MultiRangeSlider";
import MultiSelect from "./MultiSelect";
import { FaSearch } from "react-icons/fa";

export default function FilterPanel({ pokemons, setPokemons, isHide }) {
  const typeBunch = [...new Set(pokemons.map((item) => item.type1))];
  const attack = {
    min: pokemons.reduce((prev, curr) =>
      prev.stats.attack < curr.stats.attack ? prev : curr
    ).stats.attack,
    max: pokemons.reduce((prev, curr) =>
      prev.stats.attack > curr.stats.attack ? prev : curr
    ).stats.attack,
  };

  const [filterBy, setFilterBy] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [isLegendary, setIsLegendary] = useState(false);
  const [attackMin, setAttackMin] = useState(0);
  const [attackMax, setAttackMax] = useState(0);

  useEffect(() => {
    let newPokemonArray = [...pokemons];
    if (filterBy && filterBy !== "all") {
      newPokemonArray = newPokemonArray.filter((i) =>
        i.type1.includes(filterBy)
      );
    }

    if (searchBy) {
      newPokemonArray = newPokemonArray.filter((i) =>
        i.name.toLocaleLowerCase().includes(searchBy)
      );
    }

    if (isLegendary) {
      newPokemonArray = newPokemonArray.filter((i) => i.is_legendary);
    }

    newPokemonArray = newPokemonArray.filter(
      (i) => i.stats.attack >= attackMin && i.stats.attack <= attackMax
    );

    setPokemons(newPokemonArray);
  }, [filterBy, searchBy, isLegendary, attackMin, attackMax]);

  return (
    <div
      className={
        "transition-all w-full md:sticky md:top-2.5 lg:w-1/4 mb-10 lg:mb-0 lg:mr-10 self-start flex flex-wrap gap-10 md:gap-6 align-middle bg-white p-5 rounded-md  dark:bg-darkGrey dark:border-lightGreen dark:border-2" +
        (isHide ? "" : " hide")
      }
    >
      <div className="relative w-full">
        <input
          type="text"
          onChange={(e) => setSearchBy(e.target.value.toLocaleLowerCase())}
          placeholder="Search by name"
          className="py-2 px-5 rounded-md w-full border-2 border-darkGrey dark:border-lightGreen text-darkGrey"
        />
        <span className="absolute top-3 right-3 text-darkGrey/50 dark:text-white/50">
          <FaSearch />
        </span>
      </div>
      <label htmlFor="is-legendary" className=" self-center">
        <input
          onChange={(e) => setIsLegendary(e.target.checked)}
          type="checkbox"
          id="legendary"
        />{" "}
        legendary
      </label>

      {/* <MultiSelect
        defaulValue={"Select type"}
        values={["all", ...typeBunch]}
        setValues={setFilterBy}
      /> */}
      <div className="w-full mb-5">
        <label>Attack</label>
        <MultiRangeSlider
          min={attack.min}
          max={attack.max}
          onChange={({ min, max }) => {
            setAttackMin(min);
            setAttackMax(max);
          }}
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <label>Type</label>
        <select
          className="h-11 py-2 px-5 rounded-md w-full border-2 border-darkGrey dark:border-lightGreen"
          onChange={(e) => setFilterBy(e.target.value)}
          name=""
          id=""
        >
          <option value="all">All</option>
          {typeBunch.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
