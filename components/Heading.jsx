import React from "react";
import { useTheme } from "next-themes";
import { FaSun, FaRegMoon } from "react-icons/fa";

export default function Heading() {
  const { theme, setTheme } = useTheme("light");

  return (
    <div className="flex justify-between align-middle mb-6">
      <h1 className="text-2xl font-black md:text-4xl text-center">PokeApp</h1>
      <button
        className="block border-0 rounded md:p-2"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <FaSun /> : <FaRegMoon />}
      </button>
    </div>
  );
}
