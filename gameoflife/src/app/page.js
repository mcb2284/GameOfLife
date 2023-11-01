"use client";
import Board from "@/app/board/Board";
import { useState } from "react";

export default function Home() {
  const [play, setPlay] = useState(false);
  const handleStart = () => {
    setPlay(true);
  };
  const handleStop = () => {
    setPlay(false);
  };
  return (
    <main className={"flex flex-col justify-start items-center bg-gray-100"}>
      <Board play={play} />
      <dev className={"my-5"}>
        <button
          className={
            "bg-blue-500 px-4 py-2 rounded-xl shadow-md shadow-gray-500 mx-5"
          }
          onClick={handleStart}
        >
          Start
        </button>
        <button
          className={
            "bg-red-500 px-4 py-2 rounded-xl shadow-md shadow-gray-500 mx-5"
          }
          onClick={handleStop}
        >
          Stop
        </button>
        <button
          className={
            "bg-gray-400 px-4 py-2 rounded-xl shadow-md shadow-gray-500 mx-5"
          }
          onClick={handleStop}
        >
          Clear
        </button>
      </dev>
    </main>
  );
}
