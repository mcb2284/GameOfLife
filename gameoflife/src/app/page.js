"use client";
import Board from "@/app/board/Board";
import { useState } from "react";

export default function Home() {
  const [play, setPlay] = useState(false);
  const handleClick = () => {
    setPlay((prevState) => !prevState);
  };
  return (
    <main>
      <Board play={play} />
      <button className={"bg-blue-500 px-4 py-2"} onClick={handleClick}>
        Play
      </button>
    </main>
  );
}
